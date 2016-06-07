/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {Injectable} from 'angular2/core';
import {User} from './user.ts';

/**
 * It allows to share information through all the components
 */
@Injectable()
export class MyService{
    
    private _me: User;
    
    constructor (){
        console.log(`% MyService`); 
     }
    
    getMe(): User{
        return this._me;
    }

    addMe (user: User): void {
        this._me = user;
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

    amATutor(): boolean{
        return this._me.isATutor();
    }

    amAStudent(): boolean {
        return this._me.isAStudent();
    }
    
}

