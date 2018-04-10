/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { UserFile } from './types';

const TUTOR: string = "tutor";
const STUDENT: string = "student";


export interface IUserInfo  {
    userName: string;
    name: string;
    surname: string;
    userType: string;
    email: string
}

export interface IUser  extends IUserInfo{
     userImage: UserFile
}

export class User implements IUser{
    
    private _userName: string = "";
    private _name: string = "";
    private _surname: string = "";
    private _email: string = "";
    private _userType: string = ""; // 'tutor' or 'student'
    private _userImage: UserFile;
    
    constructor();
    constructor(userName: string, userType: string, name: string);
    constructor(userName: string, userType: string, name: string, surname: string, email: string)
    constructor(userName?: string, userType?: string, name?: string, surname?: string, email?:string ) {
        console.log("");
        console.log(`% User ${new Date().toLocaleTimeString()}`);
        if (arguments.length == 3) {
            console.log(`username: ${userName}, userType: ${userType}, name: ${name}`);
            this._userName = userName;
            this._userType = userType;
            this._name = name;
            this._surname = ""; 
            this._email = "";
        }
        else if (arguments.length == 5) {
            console.log(`username: ${userName}, userType: ${userType}, name: ${name}`);
            this._userName = userName;
            this._userType = userType;
            this._name = name;
            this._surname = surname;
            this._email = email;
        }
        console.log(`/ User ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    static get tutorType():string{
        return TUTOR;
    }
    
    static get studentType():string{
        return STUDENT;
    }
    
    get userName(): string{
        return this._userName;
    }
    
    get name(): string{
        return this._name;
    }

    get surname(): string{
        return this._surname; 
    }

    get userType(): string {
        return this._userType;
    }

    get email(): string {
        return this._email;
    }

    set userName(userName: string){
        this._userName = userName;
    }

    set userType(userType: string) {
        this._userType = userType;
    }

    set name(name: string) {
        this._name = name;
    }

    set surname(surname: string){
        this._surname = surname;
    }

    set email(email: string){
        this._email = email;
    }

    get userImage(){
        return this._userImage;
    }

    set userImage(userImage: UserFile ){
        this._userImage = userImage; 
    }

    json(): IUserInfo{
        return {
            userName: this._userName,
            name: this._name,
            surname: this._surname,
            userType: this._userType,
            email: this._email
        }
    }

    set(user: IUser){
        console.log('User.set');
        console.log(user); 
        this._userName = user.userName;
        this._userType = user.userType;
        this._name = user.name;
        this._surname = user.surname;
        this._email = user.email;
        this._userImage = user.userImage; 
    }    

    setToUndefined (): void{
        this._userName = "";
        this._userType = "";
        this._name = "";
        this._surname = "";
        this._email = "";
        this._userImage = null;
    }
    
    isATutor(): boolean {
        return this._userType === TUTOR;
    }

    isAStudent(): boolean {
        return this._userType === STUDENT;
    }

    exist(): boolean{
        console.log("exist"); 
        if (this._userName){
            return true;
        }
        else{
            return false;
        }
    }

  
} 

