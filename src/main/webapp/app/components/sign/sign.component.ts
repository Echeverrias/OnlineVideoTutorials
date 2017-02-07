/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

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
    providers:[SignService]
    
})


export class SignComponent implements OnInit {
    
    private email_regexp2: any = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i; 
    private email_regexp: any = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
    private user: FormUser;
    private signIn: boolean;
    private checkField: boolean;

    constructor(private router: Router, private sign: SignService, private me: UserService) {
        console.log(`% Sign constructor `);
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.signIn = true;
         console.log(`/ Sign constructor ${new Date().toLocaleTimeString()}`); 
    }
    
    ngOnInit(){

      
        this.sign.init();
        this.user.userName = this.sign.getLastUserName();
    }

    onChangeToSignUp(){
        console.log("onChangeToSignUp()")
        this.user = { userName: "", password: "", name: "", surname: "", email: "" , userType: ""};
        this.signIn = false; 
        this.checkField = false;
    }
    
    onGoingToClick(){
        console.log("onGoingToClick");
        console.log(this.user);
        this.checkField = true;
        console.log(`checkField: ${this.checkField}`);
    }

    doSignUp() {
        this.sign.registerNewUser(this.user).subscribe(
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
        
        this.sign.validateUser(this.user.userName, this.user.password).subscribe(
          (validUser: User): void => {

                if (validUser.isATutor) {
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
        this.checkField = false;
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
    }



    
}