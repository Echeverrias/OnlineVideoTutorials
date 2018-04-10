/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Injectable } from '@angular/core';
import { IUserInfo, IUser, User } from '../models/user';
import { IRoom, Room } from '../models/room';
import { UserFile, ParticipantInfo } from '../models/types';
import {  } from '../models/types';


/**
 * It allows to share information through all the components.
 */ 
@Injectable()
export class UserService{
    
    private _me: User;
    private _currentRoom: Room;
    private _lastRoom: Room;
    private logged: boolean;
    
    constructor (){
        console.log(`% MyService`); 
        this._me = new User();
        this._currentRoom = new Room();
        this._lastRoom = new Room();
    }
    
    getMe(): IUserInfo{
        return this._me && this._me.json();
    }

    getMyCurrentRoom(): IRoom{
        return this._currentRoom && this._currentRoom.json();
    }

    getMyLastRoom(): IRoom{
        return this._lastRoom && this._lastRoom.json();
    }

    getMyInfo(): ParticipantInfo {

        let myProperties: ParticipantInfo = Object.assign(this.getMe(), {room: this.getMyCurrentRoom()});

        return myProperties;
    }
        
    registerMe (user: IUser): void {
        console.log('+++++ USER.REGISTERME ++++++++++++');  //%
        console.log(user);
        this._me.set(user);
        this.logged = true;
        console.log(`* MyService.me: ${this._me} `);
    }
    
    get userName(): string {
        return this._me.userName;
    }
    
    get userType(): string {
        return this._me.userType;
    }

    get name(): string { 
        return this._me.name;
    }

    get surname(): string { 
        return this._me.surname;
    }

    get email(): string { 
        return this._me.email;
    }

    set userImage(userImage: UserFile){
        this._me.userImage = userImage;
    }

    get userImage():UserFile{
        return this._me.userImage;
    }

    get userImageMimeType(): any{
        return this._me.userImage && this._me.userImage.mimeType;
    }

    get userImageContent(): any{
        return this._me.userImage && this._me.userImage.content;
    }

    registerCurrentRoom(room: IRoom) {
        this._currentRoom.setDataRoom(room);
    }

    isThereACurrentRoom():boolean{
        return this._currentRoom && this._currentRoom.id > 0;
    }

    get currentRoomName(): string {
        return this._currentRoom.name;
    }

    get currentRoomId(): number {
        return this._currentRoom.id;
    }

    deleteMyCurrentRoom():void {
        this.registerLastRoom(this._currentRoom.json()); 
        this._currentRoom.setToUndefined();
    }

    private registerLastRoom(room: IRoom) {
        this._lastRoom.setDataRoom(room);
    }

    isThereALastRoom():boolean{
        return this._lastRoom && this._lastRoom.id > 0;
    }

    get lastRoomName(): string {
        return this._lastRoom.name;
    }

    get lastRoomId(): number {
        return this._lastRoom.id;
    }
    
    amIATutor(): boolean{
        return this._me.isATutor();
    }

    amIAStudent(): boolean {
        return this._me.isAStudent();
    }

    amILogged(): boolean{
        return this.logged;
    }

    amIInARoom():boolean{
        return this._currentRoom === null;
    }

    deleteMe(): void{
        console.log('+++++ USER.DELETE    ME ++++++++++++');  //%
        this._me.setToUndefined();
        this._currentRoom.setToUndefined();
        this._lastRoom.setToUndefined();
        this.logged = false;
    }
    
}

