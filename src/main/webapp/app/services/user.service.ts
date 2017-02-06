/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { FormUser } from '../models/types';


/**
 * It allows to share information through all the components
 */
@Injectable()
export class UserService{
    
    private _me: User;
    private _myRoomName: string = "";
    private logged: boolean;
    
    constructor (){
        console.log(`% MyService`); 
        this._me = new User();
     }
    
    getMe(): User{
        return this._me;
    }

    registerMe (user: FormUser): void {
        this._me.userName = user.userName;
        this._me.userType = user.userType;
        this._me.name = user.name;
        this._me.surname = user.surname;
        this._me.email = user.email;
        this.logged = true;
        console.log(`* MyService.me: ${this._me} `);
    }
    
    get myUserName(): string {
        return this._me.userName;
    }
    
    get myUserType(): string {
        return this._me.userType;
    }

    get myName(): string { 
        return this._me.name;
    }

    get mySurname(): string { 
        return this._me.surname;
    }

    get myEmail(): string { 
        return this._me.email;
    }

    get myRoomName(): string {
        return this._myRoomName;
    }
    
    set myRoomName(roomName: string) {
        this._myRoomName = roomName;
    }
    
    deleteMyRoomName():void {
        this._myRoomName = "";
    }

    amATutor(): boolean{
        return this._me.isATutor();
    }

    amAStudent(): boolean {
        return this._me.isAStudent();
    }
    amLogged(): boolean{
        return this.logged;
    }

    deleteMe(): void{
        this._me.setToUndefined();
        this._myRoomName = "";
        this.logged = false;
    }
    
}

