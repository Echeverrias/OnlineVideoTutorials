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

import { SignService } from '../sign.service';
import { ValidationService } from '../validation.service';
import { UserService } from '../../../core/user.service';
import { FileService } from '../../../core/file.service';
import { AuthService } from '../../../core/auth.service';

import { IUser, User } from '../../../models/user';
import { UserFile } from '../../../models/types';
import { UserForm } from '../sign.types';
import { FieldValidationRequest } from '../sign.types';

import { editPerfilTemplate } from './sign.html';



@Component({
    moduleId: module.id,
    selector: 'ovt-edit-perfil',
    styleUrls: ["edit-perfil.css"],
    template: editPerfilTemplate,
    providers: [],
    host: {
        class: 'ovt-sign-selector'
    }

})



export class EditPerfilComponent implements OnInit {
   
    private user: UserForm;
    private checkFields: boolean;
    private signInForm: FormGroup;
    private signUpForm: FormGroup;
    private editPerfilForm: FormGroup;
    private sizeLimit: number;
    private uploadImageUserOptions: NgUploaderOptions;
    private userImage$: Subject <UserFile>;



    constructor(private router: Router, private sanitizer: DomSanitizer, private validation: ValidationService, private formBuilder: FormBuilder, private sign: SignService, private me: UserService, private file: FileService, private auth: AuthService) {
        console.log(`% Edit Perfil constructor `);
        this.userImage$ = new Subject<UserFile>();
        this.sizeLimit = this.file.sizeLimit;
        
        console.log(`/ Edit Perfil constructor ${new Date().toLocaleTimeString()}`);
    }

    ngOnInit() {

        console.log('ME');
        console.log(this.me);
        console.log(this.me.getMe());
        
        this.editPerfilForm = this.formBuilder.group({
                password: [this.auth.getPassword(this.me.userName), [Validators.minLength(this.validation.minPasswordLength)]],
                confirmationPassword: [this.auth.getPassword(this.me.userName), [Validators.minLength(this.validation.minPasswordLength), this.validation.confirmPassword.bind(this.validation)]],
                name: [this.me.name, [Validators.required, Validators.minLength(this.validation.minLength)]],
                surname: [this.me.surname, [Validators.required, Validators.minLength(this.validation.minLength)]],
                email: [this.me.email, [Validators.required, this.validation.validateEmailPattern], this.validation.validateEmail.bind(this.validation)],
                userType: [this.me.userType, Validators.required]
            }, {validator: this.validation.checkPassword});

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

  
    /** 
     * If some field form is incorrect a message will show.
     */   
    onGoingToProcess(){
        this.checkFields = true;
        console.log(`checkFields: ${this.checkFields}`);
    }

    
    doModifyPerfil() {

        console.log(this.editPerfilForm);
        console.log(this.editPerfilForm.controls);
        console.log(this.editPerfilForm.value);

        this.sign.modifyPerfilUser(this.editPerfilForm.value).subscribe(
            (user: IUser): void => {
                if (this.auth.registerUser(user)) {
                    this.auth.updateUserLogin(this.editPerfilForm.value);
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

   
    onExitEditPerfil(){

        this.router.navigate(['/rooms']); 
    }

  
    
}