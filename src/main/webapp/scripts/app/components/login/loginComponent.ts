/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {Component, OnDestroy} from 'angular2/core';
import {NgIf, NgForm, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {Connection} from '../../services/connection.ts';
import {MyService} from '../../services/myService.ts';
import {UserFactory} from '../../services/userFactory.ts';


@Component({
    selector:'login',
    directives:[FORM_DIRECTIVES],
    styleUrls: ["scripts/app/components/login/login.css","assets/styles/main.css","https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css"],
    templateUrl:"scripts/app/components/login/login.html"
   
    
})


export class LoginComponent implements OnDestroy{
    
    private user: Object;
    private onLoginSubscription: Object;
    
    
    constructor (private router: Router, private connection: Connection, private appService: MyService){
        console.log(`% Login constructor `);
      
        this.onLoginSubscription = connection.subscriptions.subscribeToLogin(this, this.onLogin);
        console.log(this.onLoginSubscription);
        this.user =  {
            userName: "",
            password: ""
        };
        
        console.log(`/ Login constructor ${new Date().toLocaleTimeString()}`); 
    }
    
    doLogin() {
        console.log("");
        console.log(`* Login.doLogin ${new Date().toLocaleTimeString()}`);
        
        let jsonMessage = {
            id: "login",
            userName: this.user.userName,
            password: this.user.password,
        };
               
       this.connection.sendMessage(jsonMessage);
       
       console.log(`/ Login.doLogin ${new Date().toLocaleTimeString()}`);
       console.log("");
                
    }
  
    onLogin (jsonMessage: Object): void{
        console.log("");
        console.log(`* <- Login.onLogin ${new Date().toLocaleTimeString()}`);
        
        if (jsonMessage.validUser){
            console.log(`is a valid user?: ${jsonMessage.validUser}`);
            console.log("Type user: " + jsonMessage.userType);
                
            this.appService.addMe(UserFactory.createAnUser(jsonMessage));
            
            if (this.appService.amATutor()){
                console.log("You are a tutor");
                
                this.router.navigate(['Room',{roomName:jsonMessage.roomName}]);
                
                console.log("# go to room");
            }
            else{
                console.log("You are an student");
                
                this.router.navigate(['WaitingRoom']);
                
                console.log("# go to waitingRoom");
            }
                  
        }
        else {
            alert("Invalid user name or password");
            
            console.error(jsonMessage.id);
            console.error(jsonMessage.validUser);
            console.error(jsonMessage.typeUSer);
            console.error("Invalid user");
        }
       
       console.log(`/ Login.onLogin ${new Date().toLocaleTimeString()}`);
       console.log("");
    }
    
    ngOnDestroy(){
        console.log(`* Login.onDestroy `);
        
        this.onLoginSubscription.unsubscribe();
    }
      
 }