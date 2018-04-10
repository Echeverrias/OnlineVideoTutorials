/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { User, IUser, IUserInfo } from './user'
import { UserForm } from './../components/sign/sign.types';
/**
 * It allows to instantiate an object of the class User whith a message that
 * the server send to the client when he identifies himself.
 */ 
export class UserFactory {
     
    constructor(){
        console.log(`% UserFactory`);
    }
     static createAnUser2 (msg: any): User{
         console.log("UserFactory.createAnUser");
         console.log(msg);
         let propertiesNumber = Object.keys(msg).length 
         let user: User;
         if (propertiesNumber >= 5){
             user = new User(msg.userName, msg.userType, msg.name, msg.surname, msg.email);
             user.userImage = msg.userImage;
         }
         else if (propertiesNumber >= 3 ){
             user = new User(msg.userName, msg.userType, msg.name);
         }



         return user;
       
    }

    //static createAnUser (user: User | IUser | IUserInfo | UserForm): User{
    static createAnUser (user: any): User{
        console.log("UserFactory.createAnUser");
        console.log(user);
        let propertiesNumber = Object.keys(user).length 
        let _user: User;
        if (propertiesNumber >= 5){
            _user = new User(user.userName, user.userType, user.name, user.surname, user.email);
            if (propertiesNumber > 5){
                _user.userImage = user.userImage;
            }    
        }
        else if (propertiesNumber >= 3 ){
            _user = new User(user.userName, user.userType, user.name);
        }

        return _user;
      
   }
 }