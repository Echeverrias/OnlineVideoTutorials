/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import {User} from './user.ts'
  
export class UserFactory {
     
    constructor(){
        console.log(`% UserFactory`);
    }
     static createAnUser (jsonMessage: Object): User{
        
        return new User(jsonMessage.userName,jsonMessage.userType,jsonMessage.name)
       
    }
 }


