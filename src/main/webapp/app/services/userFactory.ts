/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import {User} from './user'

/**
 * It allows to instantiate an object of the class User whith a message that
 * the server send to the client when he identifies himself.
 */ 
export class UserFactory {
     
    constructor(){
        console.log(`% UserFactory`);
    }
     static createAnUser (jsonMessage: Object): User{
        
        return new User(jsonMessage.userName,jsonMessage.userType,jsonMessage.name)
       
    }
 }