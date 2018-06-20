/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms'; 
import { Observable, Subject } from 'rxjs/Rx';

import { SignService } from '../sign.service';
import { AuthService } from '../../../core/auth.service';


import { IUser, User } from '../../../models/user';


import { signInTemplate } from './signIn.html';


@Component({
    moduleId: module.id,
    selector: 'ovt-sign-in',
    styleUrls: ["signIn.css"],
    template: signInTemplate,
    providers: [],
    host: {
        class: 'ovt-sign-selector'
    }

})
export class SignInComponent implements OnInit {
   
    
    private checkFields: boolean;
    private signInForm: FormGroup; 



    constructor(private router: Router, private formBuilder: FormBuilder, private sign: SignService, private auth: AuthService) {
        console.log(`% Sign constructor `);
     }

    ngOnInit() {

        console.log('SigIn.OnInit');
        console.log('ME');
        console.log('LoguedUser: ', this.auth.loggedUser);
        console.log(`userName:${this.auth.rememberedUserName}, password:${this.auth.getPassword(this.auth.rememberedUserName)}`);
        
        this.init();
       
            
        this.signInForm = this.formBuilder.group({
        userName: [ this.auth.rememberedUserName, Validators.required],
        password: [this.auth.getPassword(this.auth.rememberedUserName), Validators.required],
        rememberPassword: [this.auth.rememberPassword]
        });
            

   }

   private init(){
        if (this.auth.theUserIsLogged()) {
            this.sign.logout(this.auth.loggedUser);
        }
        this.auth.logout(); 
    }

    onToggleRememberPassword(): void{
        this.auth.rememberPassword =  this.signInForm.value.rememberPassword;
        console.log(this.signInForm.value.rememberPassword);
        console.log(`SignInComponent.remeberPassword: ${this.auth.rememberPassword}`);
    }

    
    /** 
     * If some field form is incorrect a message will show.
     */   
    onGoingToProcess(){
        this.checkFields = true;
        console.log(`checkFields: ${this.checkFields}`);
    }

    onChangeToSignUp(){
        console.log("onChangeToSignUp()");
        this.router.navigate(['/signUp']);
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
               if (this.auth.registerUser(user)){ 
                this.auth.login(this.signInForm.value);
                this.router.navigate(['/rooms']);
                this.sign.login(this.auth.loggedUser);
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
    
   

  
    
}