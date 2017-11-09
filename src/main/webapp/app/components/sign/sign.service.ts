import { Injectable  } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { ConnectionService } from './../../services/connection.service';
import { HandlerService } from './../../services/handler.service';
import { UserService } from './../../services/user.service';

import { User } from './../../models/user';
import { UserFile } from './../../models/types';
import { FormUser } from './sign.types';
import { FieldValidationRequest } from './sign.types';
import { UserFactory } from './../../models/userFactory';
import { IdMessage } from './../../models/types';

type UserMessage = { userName: string, userType: string, name: string}
type LoginMessage = UserMessage & IdMessage;
type LogoutMessage = { userName: string } & IdMessage;

const WS_MSG_ID_LOGIN: string = 'login';
const WS_MSG_ID_LOGOUT: string = 'logout';

@Injectable()
export class SignService {
   
    private validateUserEndPoint: string = "validateUser";
    private validateEndPoint: string = "validateField";
    private registerEndPoint: string = "register";
    private editPerfilEndPoint: string = "editPerfil";
    

    constructor(private http: Http, private connection: ConnectionService, private handler: HandlerService, private me: UserService){
        console.log("*SignService constructor")
        
    }

    init(){
        console.log("*SignService.init");
        this.signOut();
        
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
                console.log("VALIDATE USER");
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

    validateField (fieldToValidate: FieldValidationRequest): Observable<Response>{
        console.log(`Validate:  ${fieldToValidate}`);
        let body = JSON.stringify(fieldToValidate);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.connection.urlServer}${this.validateEndPoint}`, body, options)
      
    };

    registerNewUser(user: User){
        console.log(user); 
        console.log(JSON.stringify(user));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(user);
        return this.http.post(`${this.connection.urlServer}${this.registerEndPoint}`, body, options)
        .map((res: Response) => {
           console.log("REGISTER USER"); 
           console.log(res);
           console.log(res.toString()); 
           let success: boolean;
            if (res.status == 200){
                this.createUser(res.json());
                success = true;
            }
            else{
                success = false;
            }
            return success; 
        })
        .catch((error: any) => Observable.throw(error))

    }

    createUser(user: User): void {
        console.log("");
        console.log(`* SignService.createUser ${new Date().toLocaleTimeString()}`);
        console.log(user);

        this.me.registerMe(user);

        console.log(this.me.getMe());

        let jsonMessage: LoginMessage = {
            id: WS_MSG_ID_LOGIN,
            userName: this.me.userName,
            name: this.me.name,
            userType: this.me.userType
        };

        this.connection.sendMessage(jsonMessage);

        console.log(`/ SignService.createUser ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    modifyPerfilUser(user: any) {
        console.log(user);
        Object.assign(user, {userName: this.me.userName});
        console.log(JSON.stringify(user));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(user);
        return this.http.post(`${this.connection.urlServer}${this.editPerfilEndPoint}`, body, options)
            .map((res: Response) => {
                console.log("REDIT PERFIL");
                console.log(res);
                console.log(res.toString());
                let success: boolean;
                if (res.status == 200) {
                    this.modifyUser(res.json());
                    success = true;
                }
                else {
                    success = false;
                }
                return success;
            })
            .catch((error: any) => Observable.throw(error))

    }    

    modifyUser(user: User): void {
        console.log("");
        console.log(`* SignService.modifyUser ${new Date().toLocaleTimeString()}`);
        console.log(user);

        this.me.registerMe(user);

        console.log(this.me.getMe());
        /**
        let jsonMessage: LoginMessage = {
            id: "modify",
            userName: this.me.userName,
            name: this.me.name,
            userType: this.me.userType
        };

        this.connection.sendMessage(jsonMessage);
        */
        console.log(`/ SignService.modifyUser ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    private signOut(): void{
        console.log("");
        console.log(`* <- SignService.logOut ${new Date().toLocaleTimeString()}`);
        
        if (this.me.amILogged()) {
            console.log(`* I'm going to logout me`);
            let jsonMessage: LogoutMessage = {
                id: WS_MSG_ID_LOGOUT,
                userName: this.me.userName,
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