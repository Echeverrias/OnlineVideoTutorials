/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { Observable, Subject } from 'rxjs/Rx';
import { first } from 'rxjs/operator/first';

import { SignService } from './sign.service';
import { UserService } from '../../core/user.service';
import { FileService } from '../../core/file.service';

import { IUser, User } from '../../models/user';
import { UserFile } from '../../models/types';
import { UserForm } from './sign.types';
import { FieldValidationRequest } from './sign.types';

import { signTemplate } from './sign.html';

export enum SignStates { SignIn, SignUp, EditPerfil };

@Component({
    moduleId: module.id,
    selector: 'ovt-sign',
    styleUrls: ["sign.css"],
    template: signTemplate,
    providers: [SignService],
    host: {
        class: 'ovt-sign-selector'
    }

})



export class SignComponent implements OnInit {
   
    private state: SignStates;
    private user: UserForm;
    private checkFields: boolean;
    private signInForm: FormGroup;
    private signUpForm: FormGroup;
    private editPerfilForm: FormGroup;
    private sizeLimit: number;
    private uploadImageUserOptions: NgUploaderOptions;
    private userImage$: Subject <UserFile>;
    private rememberPassword: boolean;
    readonly minPasswordLength: number = 8;
    readonly minLength: number = 3;



    constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private sign: SignService, private me: UserService, private file: FileService) {
        console.log(`% Sign constructor `);
        this.userImage$ = new Subject<UserFile>();
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

            this.init();
            this.initStorage();
            
                this.signInForm = this.formBuilder.group({
                userName: [ localStorage.getItem('ovtLastUserName'), Validators.required],
                password: [localStorage.getItem(localStorage.getItem('ovtLastUserName')), Validators.required],
                rememberPassword: [false]
            });
            
            this.signUpForm = this.formBuilder.group({
                userName: ["", [Validators.required, Validators.minLength(this.minLength)], this.validateUserName.bind(this)],
                password: ["", [Validators.required, Validators.minLength(this.minPasswordLength)]],
                confirmationPassword: ["", [Validators.required, Validators.minLength(this.minPasswordLength), this.confirmPassword.bind(this)]],
                name: ["", [Validators.required, Validators.minLength(this.minLength)]],
                surname: ["", [Validators.required, Validators.minLength(this.minLength)]],
                email: ["", [Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: ["", Validators.required],
            }, { validator: this.checkPassword });

            this.signUpForm.controls['password'].valueChanges.subscribe(
                (value) => { setTimeout(() => this.signUpForm.controls['confirmationPassword'].updateValueAndValidity(), 200)}
            );
        }
        else if (this.state === SignStates.EditPerfil){

            this.editPerfilForm = this.formBuilder.group({
                password: [sessionStorage.getItem(this.me.userName), [Validators.minLength(this.minPasswordLength)]],
                confirmationPassword: [sessionStorage.getItem(this.me.userName), [Validators.minLength(this.minPasswordLength), this.confirmPassword.bind(this)]],
                name: [this.me.name, [Validators.required, Validators.minLength(this.minLength)]],
                surname: [this.me.surname, [Validators.required, Validators.minLength(this.minLength)]],
                email: [this.me.email, [Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: [this.me.userType, Validators.required]
            }, {validator: this.checkPassword});

            this.editPerfilForm.controls['password'].valueChanges.subscribe(
                (value) => { setTimeout( () => this.editPerfilForm.controls['confirmationPassword'].updateValueAndValidity() ,200) }
            );

            this.uploadImageUserOptions = {
                url: this.file.getUploadUserImageUrl(this.me.userName)
            }

            this.userImage$.subscribe(
                (userImage: UserFile) => { this.setMeUserImage(userImage), console.log(userImage) },
                    (error) => console.log(error),
                    () => console.log('complete')    
                )
        }    

   }

   private init(){
    if (this.me.amILogged()) {
        this.sign.logout(this.me.getMe());
        this.me.deleteMe();
    }

     // Reset login status
        
        //localStorage.removeItem('ovtUser');
   }

   private initStorage(){
       sessionStorage.setItem(localStorage.getItem('ovtLastUserName'), undefined),
       this.rememberPassword = localStorage.getItem('rememberPassword') === 'true';
   }
    
    // SignUpForm and EditPerfilForm's validators

    private confirmPassword(control: FormControl): Object {
        return control.root && control.value === control.root.value['password'] ? null : {
            confirmPassword: true
        }
    }

    private checkPassword(control: AbstractControl): Object {
        const password = control.get('password');
        const confirmationPassword = control.get('confirmationPassword');
        if (!password || !confirmationPassword) return null;
        return password.value === confirmationPassword.value? null: {
            checkPassword: true
        }
    }

    private validateUserName(control: FormControl): Observable<{ [key: string]: any }> {
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    }

    private validateEmail(control: FormControl): Observable<{ [key: string]: any }> {
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    }

    /**
    * It checks, when a new user is going to register, that the user name and the email don't exists in the data base. 
    */     
    private checkField(value: string, field: string): Observable<{ [key: string]: any }> {
        console.log(`check${field}: ${value}`);
        return new Observable((obs: any) => {
            console.log(" new Observable");
            let infoField: FieldValidationRequest = {
                field: field,
                value: value,
                userName: this.me.userName
            };
            this.sign.validateField(infoField)
                .subscribe(
                response => {
                    obs.next(null);
                    obs.complete();
                },
                error => {
                    let key: string;
                    let message: string = error.json().message;
                    if (message === `userName taken`) {
                        key = 'userNameTaken';
                    }
                    else if (message === `email taken`) {
                        key = 'emailTaken';
                    }
                    obs.next({ [key]: true });
                    obs.complete();
                }
                )

        });

    } 

    // EditPerfilForm validator
    private validateNewPasswordLength(control: FormControl): Object{
        return (control.root && ((control.value.length == 0) || (control.value.length >= 8) ))? null : {
            validateNewPasswordLength: { actualLength: control.value.length, requiredLength: 8}
        }
    }

    private validateEmailPattern(control: FormControl): Object{
        let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
        return  emailRegExp.test(control.value)? null: {
            emailPattern: true
        }
    }

    onChangeToSignUp(){
        console.log("onChangeToSignUp()");
        console.log(this.signUpForm); //%
        this.state = SignStates.SignUp;
        this.checkFields = false;
    }
    
    /** 
     * If some field form is incorrect a message will show.
     */   
    onGoingToProcess(){
        if (this.signUpForm){console.log(this.signUpForm)}
        if (this.editPerfilForm){console.log(this.editPerfilForm)}    
        this.checkFields = true;
        console.log(`checkFields: ${this.checkFields}`);
    }

    doSignUp() {
        
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);

        this.sign.registerNewUser(this.signUpForm.value).subscribe(
            (user: IUser): void => {
                if (this.registerUser(user)) {
                   this.authorizeUser(this.signUpForm.value);
                    this.router.navigate(['/rooms']);
                    this.sign.login(this.me.getMe());
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
            (user: IUser): void => {
                if (this.registerUser(user)) {
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
          (user: IUser): void => {
        
                console.log("VALID USER");
                console.log(user);
                console.log(this.signInForm);
                console.log(this.signInForm.controls);
               if (this.registerUser(user)){ 
                this.authorizeUser(this.signInForm.value);
                this.router.navigate(['/rooms']);
                this.sign.login(this.me.getMe());
               }
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

    private registerUser(user: IUser): boolean{
        if (user){ 
            this.me.registerMe(user); 
            return true;
        }
        else{
            return false;
        }    
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
        sessionStorage.setItem(user.userName, user.password);
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
        this.me.userImage = userImage;   
    }

    getUserImageUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.me.userImageMimeType}; base64,${this.me.userImageContent}`);
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