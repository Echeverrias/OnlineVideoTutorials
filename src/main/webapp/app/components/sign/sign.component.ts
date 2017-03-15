/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { Observable, Subject } from 'rxjs/Rx';
import { first } from 'rxjs/operator/first';

import { SignService } from '../../services/sign.service';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';

import { User } from '../../models/user';
import { UserFile } from '../../models/types';
import { FormUser } from '../../models/types';
import { FieldValidationRequest } from '../../models/types';

import { signTemplate } from './sign.html';

export enum SignStates { SignIn, SignUp, EditPerfil };

@Component({
    moduleId: module.id,
    selector: 'ovt-sign',
    styleUrls: ["sign.css"],
    template: signTemplate,
    providers: [SignService]

})



export class SignComponent implements OnInit {
   
    private state: SignStates;
    private user: FormUser;
    private checkFields: boolean;
    private signInForm: FormGroup;
    private signUpForm: FormGroup;
    private editPerfilForm: FormGroup;
    private sizeLimit: number;
    private uploadImageUserOptions: NgUploaderOptions;
    private userImage$: Subject <UserFile>;
    private rememberPassword: boolean;


    constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private sign: SignService, private me: UserService, private file: FileService) {
        console.log(`% Sign constructor `);
        this.userImage$ = new Subject<UserFile>();
        //this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.sizeLimit = this.file.sizeLimit;
        console.log('ROUTE:');
        console.log(route); 
        
        this.route.params
            .forEach((param: Params) => {
                console.log('forEach');
                console.log(param);
                if (param['state']) {
                    this.state = +param['state'];
                }
            })
        //Only the url for edit the perfil has a parameter    
        if (!this.state) {
            this.state = SignStates.SignIn;
        }    
        console.log("STATE: ", this.state);
        console.log(`/ Sign constructor ${new Date().toLocaleTimeString()}`);
    }

    ngOnInit() {

        console.log('ME');
        console.log(this.me);
        console.log(this.me.getMe());
        
        
        if (this.state === SignStates.SignIn){

            this.sign.init();
            
            this.rememberPassword = localStorage.getItem('rememberPassword') === 'true';
            this.signInForm = this.formBuilder.group({
                userName: [ localStorage.getItem('ovtLastUserName'), Validators.required],
                password: [localStorage.getItem(localStorage.getItem('ovtLastUserName')), Validators.required],
                rememberPassword: [false]
            });

            this.signUpForm = this.formBuilder.group({
                userName: ["", [Validators.required, Validators.minLength(3)], this.validateUserName.bind(this)],
                password: ["", [Validators.required, Validators.minLength(8)]],
                confirmPassword: ["", [Validators.required, this.confirmPassword.bind(this)]],
                name: ["", [Validators.required, Validators.minLength(3)]],
                surname: ["", [Validators.required, Validators.minLength(3)]],
                email: ["", [Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: ["", Validators.required]
            });

            
        }
        else if (this.state === SignStates.EditPerfil){

            this.editPerfilForm = this.formBuilder.group({
                password: ["", [Validators.required, this.validateNewPassword.bind(this)]],
                confirmPassword: ["", [Validators.required, this.confirmNewPassword.bind(this)]],
                name: [this.me.myName, [Validators.required, Validators.minLength(3)]],
                surname: [this.me.mySurname, [Validators.required, Validators.minLength(3)]],
                email: [this.me.myEmail, [Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: [this.me.myUserType, Validators.required]
            });

            this.uploadImageUserOptions = {
                url: this.file.getUploadUserImageUrl(this.me.myUserName)
            }

            this.userImage$.subscribe(
                (userImage) => { this.setMeUserImage(userImage), console.log(userImage) },
                    (error) => console.log(error),
                    () => console.log('complete')    
                )
        }    
        

        console.log(this.uploadImageUserOptions); //%
        console.log(this.me);  //%

    }

    validateEmailPattern(control: FormControl): Object{
        let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
        emailRegExp.test(control.value)? console.log("valid email"): console.log("invalid email");
        return  emailRegExp.test(control.value)? null: {
            validEmail: true
        }
    }

    validateUserName(control: FormControl): Observable<{ [key: string]: any }>{
        console.log("validateUserName");
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    }

    validateEmail(control: FormControl): Observable<{ [key: string]: any }>{
        console.log("validateEmail");
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    }

    confirmPassword(control: FormControl): Object{

        return this.signUpForm && control.value === this.signUpForm.value['password']? null : {
            confirmPassword: true
        }
    }

    validateNewPassword(control: FormControl): Object{


        return (this.editPerfilForm && ((control.value === "") || (control.value.length >= 8) ))? null : {
            validateNewPassword: true
        }
    }

    confirmNewPassword(control: FormControl): Object{

        return this.editPerfilForm && control.value === this.editPerfilForm.value['password']? null : {
            confirmNewPassword: true
        }
    }

    // It checks, when a new user is going to register, that the user name and the email don't exists in the data base. 
    checkField(value: string, field: string) :Observable<{ [key: string]: any }>{
           console.log(`check${field}: ${value}`);
       return  new Observable((obs: any) => {
               console.log(" new Observable");
               let infoField: FieldValidationRequest = {
                   field: field,
                   value: value,
                   userName: this.me.myUserName
               };
               this.sign.validateField(infoField)
                    .subscribe(
                        data => {
                            obs.next(null); 
                            obs.complete(); 
                        },
                        error => { 
                            let key: string;
                            let message: string = error.json().message;
                            if (message === `userName taken`){
                                key = 'validUserName';
                            }
                            else if (message === `email taken`){
                                key = 'validEmail';
                            }
                            obs.next({ [key]: true }); 
                            obs.complete();
                        }
                   )

        });
        
    } 

    onChangeToSignUp(){
        console.log("onChangeToSignUp()");
        this.state = SignStates.SignUp;
        this.checkFields = false;
    }
    
    // If some field form is incorrect a message will show 
    onGoingToClick(){
        console.log("onGoingToClick");
        console.log(this.user);
        this.checkFields = true;
        console.log(`checkFields: ${this.checkFields}`);
    }

    doSignUp() {
        
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);

        this.sign.registerNewUser(this.signUpForm.value).subscribe(
            (success: boolean): void => {
                if (success) {
                    this.authorizeUser(this.signUpForm.value);
                    this.router.navigate(['/rooms']);
                }
            }, error => {
                console.log("ERROR");
                alert(error.json().message);
                console.error(error.json().message);
            },
            () => { }
        );

    }

    doModifyPerfil() {

        console.log(this.editPerfilForm);
        console.log(this.editPerfilForm.controls);

        this.sign.modifyPerfilUser(this.editPerfilForm.value).subscribe(
            (success: boolean): void => {
                if (success) {
                    this.router.navigate(['/rooms']);
                }
            }, error => {
                console.log("ERROR");
                alert(error.json().message);
                console.error(error.json().message);
            },
            () => { }
        );

    }

    doSignIn() {
        console.log("");
        console.log(`* Sign.doSignIn ${new Date().toLocaleTimeString()}`);
        
        
        this.sign.validateUser(this.signInForm.value).subscribe(
          (validUser: User): void => {
        
                console.log("VALID USER");
                console.log(validUser);
                console.log(this.signInForm);
                console.log(this.signInForm.controls);

               this.authorizeUser(this.signInForm.value);
               this.router.navigate(['/rooms']);

            },
            error => {
                alert("El nombre de usuario o la contraseña son incorrectos");
                console.log("ERROR");
                console.log(`error: ${error}`);
                console.log(error);
                console.error("Invalid user name or password");
             },
            () => {}
        );
       
        console.log(`/ sign.doSignIn ${new Date().toLocaleTimeString()}`);
        console.log("");
                
    }

    onReturnToSignIn(){
        this.state = SignStates.SignIn; 
        this.checkFields = false;
     }

    private authorizeUser(user: any){
        localStorage.setItem('ovtUser', JSON.stringify(this.me.getMe()));
        localStorage.setItem('ovtLastUserName', user.userName);
        if (this.rememberPassword){
            localStorage.setItem(user.userName, user.password);
            localStorage.setItem('rememberPassword', "true");
        }
        else{
             localStorage.setItem(user.userName, "");
             localStorage.setItem('rememberPassword', undefined);
        }
    }

    beforeUpload(uploadingFile): void {
        console.log(uploadingFile);
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('El archivo no puede pesar más de 2 MB');
        }
    }

    handleUpload(data: UploadedFile): void {
        console.log("HANDLE UPLOAD");
        console.log("handleUpload - data:", data);
        console.log("handleUpload - data.status:", data.status);
        console.log("handleUpload - data.status === 200?:", data.status === 200);
        if (data && data.status){
            if (data.status === 200) {
                console.log("Next");
                this.userImage$.next(JSON.parse(data.response));
            }
            else {
                console.log("Error");
                this.userImage$.error("ERROR"); 
            }   
        }     
    }

    private setMeUserImage(userImage: UserFile): void {
        this.me.myUserImage = userImage;   
    }

    getUserImageUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.me.myUserImageMimeType}; base64,${this.me.myUserImageContent}`);
    }

    isSignInState(): boolean{
        return this.state === SignStates.SignIn;
    }

    isSignUpState(): boolean{
        return this.state === SignStates.SignUp;
    }

    isEditPerfilState(): boolean {
        return this.state === SignStates.EditPerfil;
    }

    onExitEditPerfil(){

        this.router.navigate(['/rooms']); 
    }

  
    
}