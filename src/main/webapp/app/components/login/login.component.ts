/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user';

import { loginTemplate } from './login.html';


@Component({
    moduleId: module.id,
    selector: 'ovt-login',
    styleUrls: ["login.css"],
    template: loginTemplate,
    providers:[LoginService]
    
})


export class LoginComponent implements OnInit {
    
    private user: {userName: string, password: string};

    constructor(private router: Router, private login: LoginService, private me: UserService) {
        console.log(`% Login constructor `);
        this.user = { userName: "", password: "" };
        console.log(`/ Login constructor ${new Date().toLocaleTimeString()}`); 
    }
    
    ngOnInit(){
        this.login.init();
        this.user.userName = this.login.getLastUserName();
    }
    
    doLogin() {
        console.log("");
        console.log(`* Login.doLogin ${new Date().toLocaleTimeString()}`);
        
        this.login.validateUser(this.user.userName, this.user.password).subscribe(
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
                alert("Invalid user name or password");
                console.error("Invalid user");
            },
            () => {}
        );
       
        console.log(`/ Login.doLogin ${new Date().toLocaleTimeString()}`);
        console.log("");
                
    }
    
}