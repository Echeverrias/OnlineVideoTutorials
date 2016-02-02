/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, NgIf, FormBuilder, Validators, ControlGroup, Control, EventEmitter} from 'angular2/angular2';
import {Connection} from '../connection/connection.ts';
import {User} from '../user/user.ts';
import {Participants} from '../participants/participants.ts';

@Component({
    selector:'login',
    outputs: ['loginChecked', 'allAvaibleRoomsNames'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    styleUrls: ["scripts/components/login/login.css","assets/styles/main.css","https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css"],
    templateUrl:"scripts/components/login/login.html"
   
    
})

export class Login {
    
    private user: Object;
    private loginForm: ControlGroup;
    private userName: Control;
    private password: Control;
    
    private login: Object;
    
    private loginChecked: EventEmitter;
    private allAvaibleRoomsNames: EventEmitter;
    
    
    
    constructor (fb: FormBuilder, private connection: Connection, private participants: Participants){
        console.log(`% Login constructor`);        
                
        this.loginChecked = new EventEmitter();
        this.allAvaibleRoomsNames = new EventEmitter();
        
        
                
        this.login = connection.events.subscribeToLogin(this, this.onLogin);
        
        
        this.user =  {
            userName: "",
            password: ""
        };
        this.loginForm = fb.group({
            userName: ["", Validators.required],
            password: ["", Validators.required]
        });
        this.userName = this.loginForm.controls["userName"];
        this.password = this.loginForm.controls["password"];
        console.log(Object.getOwnPropertyNames(this.loginForm));
        
        console.log(`/ Login constructor`); 
    }
    
    
    doLogin(value: Object) {
        console.log(`& Login.doLogin`);
        console.log(`form.value: ${Object.getOwnPropertyNames(value)}`);
        console.log(`userName: ${value.userName}`);
        console.log(`password: ${value.password}`);
        
       
        let jsonMessage = {
            id: "login",
            userName: value.userName,
            password: value.password,
        };
               
       this.connection.sendMessage(jsonMessage);
       console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
       console.log(`/ Login.doLogin`);
                
  }
  
    onLogin (jsonMessage: Object): void{
        console.log("<- Login.onLogin");
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
            
        console.log(`login - validUser: ${jsonMessage.validUser}`);
        console.log(`login - rooms: ${jsonMessage.rooms}`);
        console.log(`login - userType: ${jsonMessage.userType}`);
        
        let message = {
            roomName: "", 
            component: ""
        };
                 
        if (jsonMessage.validUser){
            console.log(`is a valid user?: ${jsonMessage.validUser}`);
            console.log("Type user: " + jsonMessage.userType);
                
            this.participants.me = new User(jsonMessage);
            
            if (this.participants.me.isATutor()){
                console.log("You are a tutor");
                message.roomName = this.participants.me.userName;
                message.component = "room";
                console.log("# go to room");
            }
            else{
                    
                console.log("You are an student");
                this.allAvaibleRoomsNames.next(jsonMessage.roomsNames);
                message.component = "waitingRoom";
                console.log("# go to waitingRoom");
                    
            }
                  
        }
        else {
            alert("Invalid user name or password");
            console.error(jsonMessage.id);
            console.error(jsonMessage.validUser);
            console.error(jsonMessage.typeUSer);
            console.error("Invalid user");
            message.component = "error";
            }
        console.log("/ Login.onLogin");   
        
       this.emitLoginChecked(message);
       console.log("/ Login.onLogin");
    }
    
    emitLoginChecked(message: Object){
        console.log(`->emitLoginChecked - message: ${JSON.stringify(message)}`);
        this.loginChecked.next(message);
        console.log(`/emitLoginChecked`);
    }
    
   
    
   
   
    
    
}
