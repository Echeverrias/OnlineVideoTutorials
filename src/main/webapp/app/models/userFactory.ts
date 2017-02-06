/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { User } from './user'
type UserMessage = { userName: string, userType: string, name: string }
/**
 * It allows to instantiate an object of the class User whith a message that
 * the server send to the client when he identifies himself.
 */ 
export class UserFactory {
     
    constructor(){
        console.log(`% UserFactory`);
    }
     static createAnUser (msg: UserMessage): User{
         console.log("UserFactory.createAnUser");
         console.log(msg);
         return new User(msg.userName, msg.userType, msg.name);
       
    }
 }