/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { IUser, IUserInfo } from './../models/user';

const LAST_USER_NAME_KEY: string = 'ovtLastUserName';
const REMEMBER_PASSWORD_KEY: string = 'ovtRememberPassword';

const encrypt = function(value: string, token: number): string{
    let newValue = value.split('').map(c => c.charCodeAt(0) + token);
    return newValue.join('.');
}

const decrypt = function(value: string, token: number): string{
    let newValue = value.split('.').map(c => String.fromCharCode(Number(c) - token));
    return newValue.join('');
}

@Injectable()
export class AuthService{

    private auth_token: string = '';
    private encryption_token: number;
    private _rememberPassword: boolean = localStorage.getItem(REMEMBER_PASSWORD_KEY) === 'true';
    
    private _encrypt = (encryptFunction, token) => {
        let cache: any = {};
        return (value: string) => {
            if(cache[value]){
                return cache[value];
            }
            else{
                let out = encryptFunction(value, token);
                cache[value] = out;
                return out;
            }
        }
    };

    private _decrypt = (encryptFunction, token) => {
        let cache: any = {};
        return (value: string) => {
            if(cache[value]){
                return cache[value];
            }
            else{
                let out = encryptFunction(value, token);
                cache[value] = out;
                return out;
            }
        }
    };
    
    private ec: Function;
    private de: Function;

    constructor(private me: UserService){
        console.log('Auth.Service');
        console.log('Auth.Service.rememberedUserName', this.rememberedUserName);
        this.setEncrypTionToken(this.rememberedUserName);
    }

   
    authenticate(userName: string, password: string): Observable<boolean>{
        console.log(`AuthService.authenticate(${userName}, ${password})`);
        this.auth_token = userName;
        return new Observable<boolean>();
    }

    get authenticated(): boolean{
        return this.validString(this.auth_token);
    }

    get rememberPassword(): boolean{
        return this._rememberPassword;
    }

    set rememberPassword(rememberPassword: boolean){
        this._rememberPassword = rememberPassword;
    }

    registerUser(user: IUser): boolean{
        if (user){ 
            console.log('AuthService.registerUser()', user);
            this.me.registerMe(user); 
            return true;
        }
        else{
            return false;
        }    
    }

    login(user: any){
        console.log('AuthService.login()', user);
        this.authenticate(user.userName, user.password);
        this.setEncrypTionToken(user.userName);
        this.setDefaultStorage(user);
        if (this._rememberPassword){
            this.saveCredentials(user.userName, user.password);
        }
        else{
             this.cleanCredentials(user.userName);
        }        
        
    }

    private setDefaultStorage(user: any): void{
        localStorage.setItem(REMEMBER_PASSWORD_KEY, this._rememberPassword? "true" : "false");
        localStorage.setItem(LAST_USER_NAME_KEY, user.userName);
        sessionStorage.setItem(this.ec(user.userName), this.ec(user.password));
    }

    updateUserLogin(user: any){
        if (this._rememberPassword){
            this.saveCredentials(this.ec(user.userName), this.ec(user.password));
        }
        else{
            sessionStorage.setItem(this.ec(user.userName), this.ec(user.password));
        }
    }

    private setEncrypTionToken(seed: string): void{
        let count: number = seed.split('')
        .reduce((a, c) => a + c.charCodeAt(0), 0);
        this.encryption_token = Math.floor(count / 2);
        this.ec = this._encrypt(encrypt, this.encryption_token);
        this.de = this._encrypt(decrypt, this.encryption_token);
        console.log('this.ec', this.ec);
    }

    private encrypt(value: string): string{
        let newValue = value.split('').map(c => c.charCodeAt(0) + this.encryption_token);
        return newValue.join('.');
    }

    private decrypt(value: string): string{
        if (this.validString(value)){
            console.log(`AuthService.decrypt(${value})`);
            let newValue = value.split('.').map(c => String.fromCharCode(Number(c) - this.encryption_token));
            return newValue.join('');
        }
        else{
            return '';
        }    
    }

    theUserIsLogged(): boolean{
        console.log('AuthService.theUserIsLogged: ', this.auth_token  && this.auth_token.length > 0),
        console.log('AuthService..auth_token: ', this.auth_token);
        return (this.validString(this.auth_token));
    }

    get loggedUser(): IUserInfo{
        return this.me.getMe();
    }

    get rememberedUserName(): string{
        return  localStorage.getItem(LAST_USER_NAME_KEY) || '';
    }

    get rememberedPassword(): string{
        let lastUserName = localStorage.getItem(LAST_USER_NAME_KEY);
        return  this.getPassword(lastUserName);
    }

    getPassword(userName: string): string{
        let pass = localStorage.getItem(this.ec(userName));
        if (!pass){
            pass = sessionStorage.getItem(this.ec(userName))
        };
        console.log(`Auth.service.getPassword(${userName}): ${pass? this.decrypt(pass) : ""}`, 'encrypted userName: ' + this.ec(userName));
        return  pass? this.decrypt(pass) : "";
    }
    
    saveCredentials(userName: string, password: string){
        console.log(`AuthService.saveCredentials(${userName}, ${password})`);
        localStorage.setItem(this.ec(userName), this.ec(password));
    }

    cleanCredentials(userName: string){
        localStorage.setItem(this.ec(userName), "");
    }

    logout(){

        if (this.me && this.me.userName){
            this.me.deleteMe();
            this.initStorage()
        
             // Reset login status
             //localStorage.removeItem('ovtUser'); // No porque puede ser que le haya dado a recordar contraseña
        }     
    }

    private initStorage(){
         //  sessionStorage.setItem(localStorage.getItem(LAST_USER_NAME_KEY), undefined),
           this.rememberPassword = localStorage.getItem(REMEMBER_PASSWORD_KEY) === 'true';
           this.auth_token = '';
    }

    private validString(value: string){
        return value? value.length > 0 : false;
    }


}