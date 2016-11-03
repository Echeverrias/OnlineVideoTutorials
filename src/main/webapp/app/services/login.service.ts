import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConnectionService } from './connection.service';
import { HandlerService } from './handler.service';
import { UserService } from './user.service';

import { User } from '../models/user';
import { UserFactory } from '../models/userFactory';
import { Message } from '../models/types';
import { IdMessage } from '../models/types';

type ValiditingUserMessage = { validUser: boolean, userName: string, userType: string, name: string } & IdMessage;
type LoginMessage = { userName: string, password: string } & IdMessage;


@Injectable()
export class LoginService {

    private eeLogin: EventEmitter<Message>;
    private userValidationObserver: Subject<boolean>;

    constructor(private connection: ConnectionService, private handler: HandlerService, private me: UserService){
          console.log("*LoginService constructor");

        this.userValidationObserver = new Subject<boolean>();
       
        this.eeLogin = new EventEmitter<Message>();
        this.eeLogin.subscribe((data: ValiditingUserMessage): void => { this.onLogin(data) });
        this.handler.attach('login', this.eeLogin);
        
        this.logOut();
    }

    init(){
        console.log("*LoginService.init");
        // Reset login status
        //this.destroyMe();
    }

    doLogin(userName: string, password: string): Subject<boolean> {
        console.log("");
        console.log(`* LogiService.doLogin ${new Date().toLocaleTimeString()}`);
        
        let jsonMessage: LoginMessage = {
            id: "login",
            userName: userName,
            password: password,
        };
               
       this.connection.sendMessage(jsonMessage);
       
       console.log(`/ LogiService.doLogin ${new Date().toLocaleTimeString()}`);
       console.log("");
       return this.userValidationObserver;         
    }

    onLogin (msg: ValiditingUserMessage): void{
        console.log("");
        console.log(`* <- LogiService.onLogin ${new Date().toLocaleTimeString()}`);
        console.log(`/ LogiService.onLogin ${new Date().toLocaleTimeString()}`);
        console.log("");

        console.log(`is a valid user?: ${msg.validUser}`);
        if (msg.validUser) {
            let user: User = UserFactory.createAnUser(msg);
            localStorage.setItem('ovtUser', JSON.stringify(user));
            localStorage.setItem('ovtLastUserName', msg.userName);
            this.me.registerMe(user);
        }    
        this.userValidationObserver.next(msg.validUser);
    }


    getLastUserName(): string {
        return localStorage.getItem('ovtLastUserName');
    }

    private logOut(): void{
        console.log("");
        console.log(`* <- LoginService.logOut ${new Date().toLocaleTimeString()}`);
        
        if (this.me.amLogged()) {
            console.log(`* I'm going to logout me`);
            let jsonMessage = {
                id: "logout",
                userName: this.me.myUserName,
            };

           this.connection.sendMessage(jsonMessage);
           this.me.deleteMe();
        }
        console.log(`/ LoginService.logOut ${new Date().toLocaleTimeString()}`);
        console.log("")
    }

    private destroyMe(): void{
        console.log("*LoginService.destroyMe");
        
        //localStorage.removeItem('ovtUser');
    }

    destroy(): void{
        console.log("*LoginService.destroy");
        this.eeLogin.unsubscribe();
        this.handler.detach('login');  
    }
    
}