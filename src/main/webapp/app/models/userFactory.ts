/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { User } from './user'
type UserForm = { userName: string, userType: string, name: string , surname: string, email: string}
/**
 * It allows to instantiate an object of the class User whith a message that
 * the server send to the client when he identifies himself.
 */ 
export class UserFactory {
     
    constructor(){
        console.log(`% UserFactory`);
    }
     static createAnUser (msg: any): User{
         console.log("UserFactory.createAnUser");
         console.log(msg);
         let propertiesNumber = Object.keys(msg).length 
         let user: User;
         if (propertiesNumber >= 5){
             user = new User(msg.userName, msg.userType, msg.name, msg.surname, msg.email);
         }
         else if (propertiesNumber >= 3 ){
             user = new User(msg.userName, msg.userType, msg.name);
         }

         return user;
       
    }
 }