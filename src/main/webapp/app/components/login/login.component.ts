/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { MyService } from '../../services/myService';

import { loginTemplate } from './login.html';


@Component({
    moduleId: module.id,
    selector: 'ovt-login',
    styleUrls: ["login.css"],
    template: loginTemplate,
    providers:[LoginService]
    
})


export class LoginComponent implements OnInit {
    
    private user: Object;

    constructor(private router: Router, private login: LoginService, private me: MyService) {
        console.log(`% Login constructor `);
        this.user = { userName: "", password: "ZZZ" };
        console.log(`/ Login constructor ${new Date().toLocaleTimeString()}`); 
    }
    
    ngOnInit(){
        this.login.init();
        this.user.userName = this.login.getLastUserName();
    }
    
    doLogin() {
        console.log("");
        console.log(`* Login.doLogin ${new Date().toLocaleTimeString()}`);
        
        this.login.doLogin(this.user.userName, this.user.password).subscribe(validUser => {
            if (validUser) {
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
            else {
                alert("Invalid user name or password");

                console.error("Invalid user");
            }
        });
       
        console.log(`/ Login.doLogin ${new Date().toLocaleTimeString()}`);
        console.log("");
                
    }
    
}