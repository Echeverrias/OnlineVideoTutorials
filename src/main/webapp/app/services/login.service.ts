import { Injectable  } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { ConnectionService } from './connection.service';
import { HandlerService } from './handler.service';
import { UserService } from './user.service';

import { User } from '../models/user';
import { UserFactory } from '../models/userFactory';
import { IdMessage } from '../models/types';

type UserMessage = { userName: string, userType: string, name: string };
type LoginMessage = UserMessage & IdMessage;
type LogoutMessage = { userName: string } & IdMessage;


@Injectable()
export class LoginService {

    constructor(private http: Http, private connection: ConnectionService, private handler: HandlerService, private me: UserService){
        console.log("*LoginService constructor")
        
        this.logOut();
    }

    init(){
        console.log("*LoginService.init");
        // Reset login status
        //this.destroyMe();
    }

    validateUser(userName: string, password: string): Observable<User> { 

         let headers = new Headers();
         headers.append("Content-Type", "application/json");
         let options = new RequestOptions({headers: headers});
         let body = JSON.stringify({userName, password});
         return this.http.post(`${this.connection.urlServer}validateUser`, body, options)
            .map((res: Response) => {
                console.log(res);
                if (res.status == 200){
                    this.createUser(res.json());
                }
                return res.json();
            })
            .catch((error: any) => Observable.throw(error))
    }

    createUser(msg: UserMessage): void {
        console.log("");
        console.log(`* LogiService.createUse ${new Date().toLocaleTimeString()}`);
        console.log(msg);

        let user: User = UserFactory.createAnUser(msg);
        localStorage.setItem('ovtUser', JSON.stringify(user));
        localStorage.setItem('ovtLastUserName', msg.userName);
        this.me.registerMe(user);

        let jsonMessage: LoginMessage = {
            id: "login",
            userName: this.me.myUserName,
            name: this.me.myName,
            userType: this.me.myUserType
        };

        this.connection.sendMessage(jsonMessage);

        console.log(`/ LogiService.createUser ${new Date().toLocaleTimeString()}`);
        console.log("");
    }    
       
    getLastUserName(): string {
        return localStorage.getItem('ovtLastUserName');
    }

    private logOut(): void{
        console.log("");
        console.log(`* <- LoginService.logOut ${new Date().toLocaleTimeString()}`);
        
        if (this.me.amLogged()) {
            console.log(`* I'm going to logout me`);
            let jsonMessage: LogoutMessage = {
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
    }
    
}