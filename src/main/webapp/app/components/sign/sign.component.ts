/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs/Rx';
import { first } from 'rxjs/operator/first';


import { SignService } from '../../services/sign.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user';
import { FormUser } from '../../models/types';

import { signTemplate } from './sign.html';



@Component({
    moduleId: module.id,
    selector: 'ovt-sign',
    styleUrls: ["sign.css"],
    template: signTemplate,
    providers: [SignService]

})



export class SignComponent implements OnInit {

   // private email_regexp2: string = '[a-z0-9!#$%&*+\/=?^_{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*';
   // private email_regexp: string = '[a-z0-9!#$%&*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
    private user: FormUser;
    private signIn: boolean;
    private checkFields: boolean;
    private signInForm: FormGroup;
    private signUpForm: FormGroup;



    constructor(private router: Router, private formBuilder: FormBuilder, private sign: SignService, private me: UserService) {
        console.log(`% Sign constructor `);
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.signIn = true;
        console.log(`/ Sign constructor ${new Date().toLocaleTimeString()}`);
    }

    ngOnInit() {

        this.signInForm = this.formBuilder.group({
            userName: ["", [Validators.required, Validators.minLength(3)]],
            password: ["", [Validators.required, Validators.minLength(3)]]
        });

        this.signUpForm = this.formBuilder.group({
            userName: ["", [Validators.required, Validators.minLength(3)], this.validateUserName.bind(this)],
            password: ["", [Validators.required, Validators.minLength(3)]],
            confirmPassword: ["", [Validators.required, Validators.minLength(3), this.confirmPassword.bind(this)]],
            name: ["", [Validators.required, Validators.minLength(3)]],
            surname: ["", [Validators.required, Validators.minLength(3)]],
            email: ["", [Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
            userType: ["", Validators.required]
        });

        

        this.sign.init();
        this.user.userName = this.sign.getLastUserName();

    }

    validateEmailPattern(control: FormControl): Object{
        //let emailRegExp = /^[a-zA-Z0-9!#$%&*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-]{2,4}$/
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

   
   checkField(value: string, field: string) :Observable<{ [key: string]: any }>{
           console.log(`check${field}: ${value}`);
       return  new Observable((obs: any) => {
               console.log(" new Observable");
               this.sign.validateField(value, field)
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

    confirmPassword(control: FormControl): Object{

        return this.signUpForm && control.value === this.signUpForm.value['password']? null : {
            confirmPassword: true
        }
    }

   onChangeToSignUp(){
        console.log("onChangeToSignUp()");
            this.user = { userName: "", password: "", name: "", surname: "", email: "" , userType: ""};
        this.signIn = false; 
        this.checkFields = false;
    }
    
    onGoingToClick(){
        console.log("onGoingToClick");
        console.log(this.user);
        this.checkFields = true;
        console.log(`checkFields: ${this.checkFields}`);
        console.log(this.signInForm);
        console.log(this.signInForm.controls);
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);

    }

    doSignUp() {
        
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);

        this.sign.registerNewUser(this.signUpForm.value).subscribe(
            (success: boolean): void => {
                if (success) {
                    if (this.me.amATutor()) {
                        console.log("You are a tutor");

                        this.router.navigate(['/room', this.me.myUserName]);

                        console.log("# go to room");
                    }
                    else {
                        console.log("You are an student");

                        this.router.navigate(['/rooms']);

                        console.log("# go to waitingRoom");
                    }

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
                if (validUser.isATutor()) {
                    console.log("You are a tutor");

                    this.router.navigate(['/room', validUser.userName]);

                    console.log("# go to room");
                }
                else {
                    console.log("You are an student");

                    this.router.navigate(['/rooms']);

                    console.log("# go to waitingRoom");
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

    onReturnToSignIn(){
        this.signIn = true; 
        this.checkFields = false;
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
    }



    
}