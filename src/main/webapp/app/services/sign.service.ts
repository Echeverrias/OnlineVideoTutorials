import { Injectable  } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { ConnectionService } from './connection.service';
import { HandlerService } from './handler.service';
import { UserService } from './user.service';

import { User } from '../models/user';
import { FormUser } from '../models/types';
import { UserFactory } from '../models/userFactory';
import { IdMessage } from '../models/types';

type UserMessage = { userName: string, userType: string, name: string}
type LoginMessage = UserMessage & IdMessage;
type LogoutMessage = { userName: string } & IdMessage;


@Injectable()
export class SignService {

    private validateUserEndPoint: string = "validateUser";
    private registerEndPoint: string = "register";


    constructor(private http: Http, private connection: ConnectionService, private handler: HandlerService, private me: UserService){
        console.log("*SignService constructor")
        
        this.logOut();
    }

    init(){
        console.log("*SignService.init");
        // Reset login status
        //this.destroyMe();
    }

    validateUser(userName: string, password: string): Observable<User> { 

         let headers = new Headers();
         headers.append("Content-Type", "application/json");
         let options = new RequestOptions({headers: headers});
         let body = JSON.stringify({userName, password});
         console.log(this.http); //%%
         return this.http.post(`${this.connection.urlServer}${this.validateUserEndPoint}`, body, options)
            .map((res: Response) => {
                if (res.status == 200){
                    console.log(`res.json(): ${res.json()}`);
                    this.createUser(res.json());
                }
                else{
                     console.log(`res.status: ${res.status}`);
                }
                return res.json();
            })
            .catch((error: any) => Observable.throw(error))
    }

    registerNewUser(user: FormUser){
        console.log(user); 
        console.log(JSON.stringify(user));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(user);
        return this.http.post(`${this.connection.urlServer}${this.registerEndPoint}`, body, options)
        .map((res: Response) => {
           let exit: boolean;
            if (res.status == 200){
                this.createUser(user);
                exit = true;
            }
            else{
                exit = false;
            }
            return exit; 
        })
        .catch((error: any) => Observable.throw(error))

    }

    createUser(user: FormUser): void {
        console.log("");
        console.log(`* SignService.createUser ${new Date().toLocaleTimeString()}`);
        console.log(user);

        localStorage.setItem('ovtUser', JSON.stringify(user));
        localStorage.setItem('ovtLastUserName', user.userName);

        this.me.registerMe(user);

        console.log(this.me.getMe());

        let jsonMessage: LoginMessage = {
            id: "login",
            userName: this.me.myUserName,
            name: this.me.myName,
            userType: this.me.myUserType
        };

        this.connection.sendMessage(jsonMessage);

        console.log(`/ SignService.createUser ${new Date().toLocaleTimeString()}`);
        console.log("");
    }    
       
    getLastUserName(): string {
        return localStorage.getItem('ovtLastUserName');
    }

    private logOut(): void{
        console.log("");
        console.log(`* <- SignService.logOut ${new Date().toLocaleTimeString()}`);
        
        if (this.me.amLogged()) {
            console.log(`* I'm going to logout me`);
            let jsonMessage: LogoutMessage = {
                id: "logout",
                userName: this.me.myUserName,
            };

           this.connection.sendMessage(jsonMessage);
           this.me.deleteMe();
        }
        console.log(`/ SignService.logOut ${new Date().toLocaleTimeString()}`);
        console.log("")
    }

    private destroyMe(): void{
        console.log("*SignService.destroyMe");
        
        //localStorage.removeItem('ovtUser');
    }

    destroy(): void{
        console.log("*SignService.destroy");
    }
    
}