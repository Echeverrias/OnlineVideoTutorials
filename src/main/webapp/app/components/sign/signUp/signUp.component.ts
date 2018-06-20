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
import { AuthService } from '../../../core/auth.service';
import { ValidationService } from '../validation.service';

import { IUser, User } from '../../../models/user';
import { UserFile } from '../../../models/types';
import { UserForm } from '.././sign.types';
import { FieldValidationRequest } from '../sign.types';

import { signUpTemplate } from './signUp.html';



@Component({
    moduleId: module.id,
    selector: 'ovt-sign-up',
    styleUrls: ["signUp.css"],
    template: signUpTemplate,
    providers: [],
    host: {
        class: 'ovt-sign-selector'
    }

})



export class SignUpComponent implements OnInit {
   
    
    private user: UserForm;
    private checkFields: boolean;
    private signUpForm: FormGroup;
 

    constructor(private router: Router, private validation: ValidationService, private formBuilder: FormBuilder, private sign: SignService, private auth: AuthService) {
        console.log(`% SignUp constructor `);
        
        console.log(`/ SignUp constructor ${new Date().toLocaleTimeString()}`);
    }

    ngOnInit() {

        console.log('ME');
        console.log(this.auth.loggedUser);
        
        this.signUpForm = this.formBuilder.group({
            userName: ["", [Validators.required, Validators.minLength(this.validation.minLength)], this.validation.validateUserName.bind(this.validation)],
            password: ["", [Validators.required, Validators.minLength(this.validation.minPasswordLength)]],
            confirmationPassword: ["", [Validators.required, Validators.minLength(this.validation.minPasswordLength), this.validation.confirmPassword.bind(this.validation)]],
            name: ["", [Validators.required, Validators.minLength(this.validation.minLength)]],
            surname: ["", [Validators.required, Validators.minLength(this.validation.minLength)]],
            email: ["", [Validators.required, this.validation.validateEmailPattern], this.validation.validateEmail.bind(this.validation)],
            userType: ["", Validators.required],
        }, { validator: this.validation.checkPassword });

        this.signUpForm.controls['password'].valueChanges.subscribe(
            (value) => { setTimeout(() => this.signUpForm.controls['confirmationPassword'].updateValueAndValidity(), 200)}
        );
           

   }

  
    /** 
     * If some field form is incorrect a message will show.
     */   
    onGoingToProcess(){
        this.checkFields = true;
        console.log(`checkFields: ${this.checkFields}`);
    }

    onReturnToSignIn(){
        this.router.navigate(['/signIn']);
     }


    doSignUp() {
        
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);

        this.sign.registerNewUser(this.signUpForm.value).subscribe(
            (user: IUser): void => {
                if (this.auth.registerUser(user)) {
                   this.auth.login(this.signUpForm.value);
                    this.router.navigate(['/rooms']);
                    this.sign.login(this.auth.loggedUser);
                }
            }, error => {
                console.log("ERROR");
                alert(error.json().message);
                console.error(error.json().message);
            },
            () => { }
        );

    }



   
    
}