import { Injectable  } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
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
    private validateEndPoint: string = "validate";
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

    validateUser(user: any): Observable<User> { 

         let headers = new Headers();
         headers.append("Content-Type", "application/json");
         let options = new RequestOptions({headers: headers});
         let body = JSON.stringify(user);
         console.log(this.http); //%%
         return this.http.post(`${this.connection.urlServer}${this.validateUserEndPoint}`, body, options)
            .map((res: Response) => {
                console.log(res);
                console.log(res.toString());
                if (res.status = 200){
                    console.log(`res.json(): ${res.json()}`);
                    this.createUser(res.json());
                }
                else{
                     console.log(`res.status: ${res.status}`);
                }
                
                return UserFactory.createAnUser(res.json());
            })
            .catch((error: any) => Observable.throw(error))
    }

    validateField (value: string, field: string){
    console.log(`Validate ${field}: ${value}`);
    let body = value || "";
    let headers = new Headers();
    headers.append("Content-Type", "text/plain");
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.connection.urlServer}${this.validateEndPoint}/${field}`, body, options)
        /*
        .map((res: Response) => {
            console.log(res);
            let success: boolean;
            if (res.json().ok) {
                console.log(`valid ${field}: true`);
                success = true;
            }
            else {
                console.log(`valid ${field}: false`);
                success = false
            }
            return success;
        })
        .catch((error: any) => Observable.throw(error))
        */
};


    

    registerNewUser(user: FormUser){
        console.log(user); 
        console.log(JSON.stringify(user));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(user);
        return this.http.post(`${this.connection.urlServer}${this.registerEndPoint}`, body, options)
        .map((res: Response) => {
           console.log(res);
           console.log(res.toString()); 
           let success: boolean;
            if (res.status == 200){
                this.createUser(user);
                success = true;
            }
            else{
                success = false;
            }
            return success; 
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