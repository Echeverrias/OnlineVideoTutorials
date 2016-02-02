/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, EventEmitter} from 'angular2/angular2';
import {Connection} from '../connection/connection.ts';
import {Participants} from '../participants/participants.ts';

 @Component({
    selector:'waitingRoom',
    styleUrls: ["assets/styles/main.css", "scripts/components/waitingRoom/waitingRoom.css"],
    inputs: ['allAvaibleRoomsNames'],
    outputs: ['roomChosen', 'goToState'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: "scripts/components/waitingRoom/waitingRoom.html"
 })

 export class WaitingRoom{
     
    
    
    private roomChosen : EventEmitter; 
    private goToState : EventEmitter; 
    
    private newAvaibleRoom: Object;
    private avaibleRoomLess: Object;
     
    constructor(private participants: Participants, private connection: Connection){
        console.log(`% WaitingRoom constructor`); 
        
        this.roomChosen = new EventEmitter();
        this.goToState = new EventEmitter();
        
        this.newAvaibleRoom = connection.events.subscribeToNewAvaibleRoom(this, this.onAddAvaibleRoom);
        this.avaibleRoomLess = connection.events.subscribeToAvaibleRoomLess(this, this.onRemoveAvaibleRoom);
        
        console.log(`/ WaitingRoom constructor`);
    }
    
    onAddAvaibleRoom (roomName: string){
        console.log(`<- WaitingRoom.onAddAvaibleRoom: ${roomName} to ${this.allAvaibleRoomsNames}`)
        this.allAvaibleRoomsNames.push(roomName);  
        console.log(`this.avaibleRooms: ${this.allAvaibleRoomsNames}`)
        console.log(`/WaitingRoom.onAddAvaibleRoom`);
    };
    
    
    
    onRemoveAvaibleRoom (roomName: string){
        console.log(`<- WaitingRoom.onRemoveAvaibleRoom : ${roomName}`);  
        let i = this.allAvaibleRoomsNames.indexOf(roomName);
        console.log("removeRoom: " + roomName + " = " + this.allAvaibleRoomsNames[i]);
        this.allAvaibleRoomsNames.splice(i,1);
        console.log(`this.avaibleRooms: ${this.allAvaibleRoomsNames}`);
        console.log(`/ WaitingRoom.onRemoveAvaibleRoom : ${roomName}`);
    };
    
    joinRoom (roomName: string){
        console.log(`WaitingRoom.joinRoom: ${roomName}`);
        
        this.roomChosen.next(roomName);
        this.goToState.next('room');
        var jsonMessage = {
            id:"joinRoom",
            roomName: roomName,
            userName: this.participants.myUserName,
            name: this.participants.myName
        };
        
        this.connection.sendMessage(jsonMessage);
        
        console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
        console.log(`/ WaitingRoom.joinRoom`);    
    }
    
    onLogOut(){
        console.log(`<- WaitingRoom.onLogOut`);
        this.goToState.next('login');
        console.log(`/ WaitingRoom.onLogOut`);
    }
     
 }


