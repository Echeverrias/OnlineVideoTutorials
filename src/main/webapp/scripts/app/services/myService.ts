import {Injectable} from 'angular2/core';

import {User} from './user.ts';

@Injectable()
export class MyService{
    
    private _me: User; 
    
    constructor (){
        console.log(`% MyService`);
     }
    
    get me(): User{
        return this._me;
    }
    
    set me (user: User){
        this._me = user;
        console.log(`* MyService.me: ${this._me} `);
       
    }
}

