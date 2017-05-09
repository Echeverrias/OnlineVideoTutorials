/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { FormUser } from '../models/types';
import { UserInfo } from '../models/types';
import { UserFile } from '../models/types';


/**
 * It allows to share information through all the components.
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

    getMyInfo(): UserInfo {

        let myProperties: UserInfo = {
            userName: this._me.userName,
            userType: this._me.userType,
            name: this._me.name,
            surname: this._me.surname,
            email: this._me.email,
            roomName: this._myRoomName
        }

        return myProperties;
    }
        
    registerMe (user: any): void {
        console.log('+++++ USER.REGISTERME ++++++++++++');  //%
        console.log(user);
        this._me.userName = user.userName;
        this._me.userType = user.userType;
        this._me.name = user.name;
        this._me.surname = user.surname;
        this._me.email = user.email;
        this._me.userImage = user.userImage;
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

    get myUserImageMimeType(): any{
        return this._me.userImage && this._me.userImage.mimeType;
    }

    get myUserImageContent(): any{
        return this._me.userImage && this._me.userImage.content;
    }

    get myRoomName(): string {
        return this._myRoomName;
    }


    set myUserImage(userImage: UserFile){
        this._me.userImage = userImage;
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
        console.log('+++++ USER.DELETE    ME ++++++++++++');  //%
        this._me.setToUndefined();
        this._myRoomName = "";
        this.logged = false;
    }
    
}

