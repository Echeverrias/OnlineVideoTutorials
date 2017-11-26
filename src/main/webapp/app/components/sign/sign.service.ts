import { Injectable  } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { ConnectionService } from './../../services/connection.service';
import { HandlerService } from './../../services/handler.service';
import { UserService } from './../../services/user.service';

import { IUser, IUserInfo, User } from './../../models/user';
import { UserFile } from './../../models/types';
import { FormUser } from './sign.types';
import { FieldValidationRequest } from './sign.types';
import { UserFactory } from './../../models/userFactory';
import { IdMessage } from './../../models/types';

//type UserMessage = { userName: string, userType: string, name: string}
//type LoginMessage = UserMessage & IdMessage;
//type LogoutMessage = { userName: string } & IdMessage;

// Messages to the server
const WS_MSG_ID_LOGIN: string = 'login';
const WS_MSG_ID_LOGOUT: string = 'logout';

const VALIDATE_USER_ENDPOINT: string = "validateUser";
const VALIDATE_ENDPOINT: string = "validateField";
const REGISTER_ENDPOINT: string = "register";
const EDIT_PERFIL_ENDPOINT: string = "editPerfil";

@Injectable()
export class SignService {
   
    
    constructor(private http: Http, private connection: ConnectionService, private handler: HandlerService, private me: UserService){
        console.log("*SignService constructor")
        
    }

    validateUser(user: any): Observable<IUser> { 

         let headers = new Headers();
         headers.append("Content-Type", "application/json");
         let options = new RequestOptions({headers: headers});
         let body = JSON.stringify(user);
         console.log(this.http); //%%
         return this.http.post(`${this.connection.urlServer}${VALIDATE_USER_ENDPOINT}`, body, options)
            .map((res: Response) => {
                console.log("VALIDATE USER");
                console.log(res);
                console.log(res.toString());
                if (res.status = 200){
                    console.log(`res.json(): ${res.json()}`);
                    //this.createUser(res.json());
                    return res.json();
                }
                else{
                     console.log(`res.status: ${res.status}`);
                     return null;
                }
        
            })
            .catch((error: any) => Observable.throw(error))
    }

    validateField (fieldToValidate: FieldValidationRequest): Observable<Response>{
        console.log(`Validate:  ${fieldToValidate}`);
        let body = JSON.stringify(fieldToValidate);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.connection.urlServer}${VALIDATE_ENDPOINT}`, body, options)
      
    };

    registerNewUser(user: User): Observable<IUser>{
        console.log(user); 
        console.log(JSON.stringify(user));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(user);
        return this.http.post(`${this.connection.urlServer}${REGISTER_ENDPOINT}`, body, options)
        .map((res: Response) => {
           console.log("REGISTER USER"); 
           console.log(res);
           console.log(res.toString()); 
           let success: boolean;
            if (res.status == 200){
               // this.createUser(res.json());
               return res.json();
            }
            else{
                console.log("The user is not registered")
                success = false;
                return null;
            }
            
        })
        .catch((error: any) => Observable.throw(error))

    }


    login(user: IUserInfo): void {
        console.log("");
        console.log(`* SignService.createUser ${new Date().toLocaleTimeString()}`);
        console.log(user);

        /* //*
        let um :LoginMessage = {
            id: WS_MSG_ID_LOGIN,
            name: user.name,
            userName: user.userName,
            userType: user.userType
        } 

        // this.connection.sendMessage(um);
        */

        this.connection.sendWSMessage(WS_MSG_ID_LOGIN, user);
        
       
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
        return this.http.post(`${this.connection.urlServer}${EDIT_PERFIL_ENDPOINT}`, body, options)
            .map((res: Response) => {
                console.log("REDIT PERFIL");
                console.log(res);
                console.log(res.toString());
                let success: boolean;
                if (res.status == 200) {
                    return res.json();
            
                }
                else {
                    return null;
                }
                
            })
            .catch((error: any) => Observable.throw(error))

    }    

   

    logout(user: IUserInfo): void{
        console.log("");
        console.log(`* <- SignService.logOut ${new Date().toLocaleTimeString()}`);
       
        this.connection.sendWSMessage(WS_MSG_ID_LOGOUT, user);
        this.me.deleteMe();
        
        console.log(`/ SignService.logOut ${new Date().toLocaleTimeString()}`);
        console.log("")
    }

    
}