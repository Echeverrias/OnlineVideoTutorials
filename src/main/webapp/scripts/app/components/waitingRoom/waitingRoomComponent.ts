/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import {Component, EventEmitter,OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';

import {Connection} from '../../services/connection.ts';
import {MyService} from '../../services/myService.ts';

 @Component({
    selector:'waitingRoom',
    styleUrls: ["assets/styles/main.css", "scripts/app/components/waitingRoom/waitingRoom.css"],
    directives: [FORM_DIRECTIVES],
    templateUrl: "scripts/app/components/waitingRoom/waitingRoom.html"
 })

 export class WaitingRoomComponent implements OnInit{
     
    private allAvaibleRoomsNames : string[];
    
    private onAvaibleRooms : Object; 
    
    private newAvaibleRoom: Object;
    private avaibleRoomLess: Object;
     
    constructor(private router: Router, private connection: Connection, private appService: MyService){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`% WaitingRoom constructor`); 
        
        this.onAvaibleRooms = connection.events.subscribeToAllAvaibleRooms(this, this.onSetAvaibleRooms);
        
        
        this.newAvaibleRoom = connection.events.subscribeToNewAvaibleRoom(this, this.onAddAvaibleRoom);
        this.avaibleRoomLess = connection.events.subscribeToAvaibleRoomLess(this, this.onRemoveAvaibleRoom);
        
        console.log(`/ WaitingRoom constructor`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    ngOnInit(){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`<- WaitingRoom.ngOnInit`);
        var jsonMessage = {
            id:"waitingRoom"
       };
        
        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoom.ngOnInit`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    onSetAvaibleRooms(avaibleRoomsNames: string[]){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`* WaitingRoom.avaibleRoomsNames`);
        this.allAvaibleRoomsNames = avaibleRoomsNames;
        console.log(`/ WaitingRoom.avaibleRoomsNames`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
    }

    onAddAvaibleRoom (roomName: string){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`<- WaitingRoom.onAddAvaibleRoom: ${roomName} to ${this.allAvaibleRoomsNames}`)
        this.allAvaibleRoomsNames.push(roomName);  
        console.log(`this.avaibleRooms: ${this.allAvaibleRoomsNames}`)
        console.log(`/WaitingRoom.onAddAvaibleRoom`);
        console.log("/ " + new Date().toLocaleTimeString());
         console.log("");
        
    };
    
    onRemoveAvaibleRoom (roomName: string){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`<- WaitingRoom.onRemoveAvaibleRoom : ${roomName}`);  
        let i = this.allAvaibleRoomsNames.indexOf(roomName);
        console.log("removeRoom: " + roomName + " = " + this.allAvaibleRoomsNames[i]);
        this.allAvaibleRoomsNames.splice(i,1);
        console.log(`this.avaibleRooms: ${this.allAvaibleRoomsNames}`);
        console.log(`/ WaitingRoom.onRemoveAvaibleRoom : ${roomName}`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        
    };
    
    joinRoom (roomName: string){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`WaitingRoom.joinRoom: ${roomName}`);
        
        this.router.navigate(['Room' ,{roomName: roomName}]);
        
        console.log(`/ WaitingRoom.joinRoom`);  
        console.log("/ " + new Date().toLocaleTimeString());  
        console.log("");
        
    }
    
    onLogOut(){
         console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`<- WaitingRoom.onLogOut`);
        this.router.navigate(['Login']);
        console.log(`/ WaitingRoom.onLogOut`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("")
    }
     
 }


