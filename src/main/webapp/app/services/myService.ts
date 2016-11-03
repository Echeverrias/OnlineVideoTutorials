/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Injectable } from '@angular/core';
import { User } from '../models/user';


/**
 * It allows to share information through all the components
 */
@Injectable()
export class MyService{
    
    private _me: User;
    private _myRoomName: string = null;
    private logged: boolean;
    
    constructor (){
        console.log(`% MyService`); 
        this._me = new User();
     }
    
    getMe(): User{
        return this._me;
    }

    registerMe (user: User): void {
        this._me.set(user);
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

    get myRoomName(): string {
        return this._myRoomName;
    }
    
    set myRoomName(roomName: string) {
        this._myRoomName = roomName;
    }
    
    deleteMyRoomName():void {
        this._myRoomName = null;
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
        this.logged = false;
    }
    
}

