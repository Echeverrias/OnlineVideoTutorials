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
    
    private onAvaiblesRooms : Object; 
    
    private newAvaibleRoom: Object;
    private avaibleRoomLess: Object;
     
    constructor(private router: Router, private connection: Connection, private appService: MyService){
        console.log(`% WaitingRoom constructor`); 
        
        this.onAvaiblesRooms = connection.events.subscribeToAllAvaibleRooms(this, this.onSetAvaibleRooms);
        
        
        this.newAvaibleRoom = connection.events.subscribeToNewAvaibleRoom(this, this.onAddAvaibleRoom);
        this.avaibleRoomLess = connection.events.subscribeToAvaibleRoomLess(this, this.onRemoveAvaibleRoom);
        
        console.log(`/ WaitingRoom constructor`);
    }
    
    ngOnInit(){
        console.log(`<- OnInit`);
        var jsonMessage = {
            id:"waitingRoom"
       };
        
        this.connection.sendMessage(jsonMessage);
        console.log(`/ OnInit`);
    }
    
    onSetAvaibleRooms(avaibleRoomsNames: string[]){
        this.allAvaibleRoomsNames = avaibleRoomsNames;
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
        
        this.router.navigate(['Room' ,{roomName: roomName}]);
        
        console.log(`/ WaitingRoom.joinRoom`);    
    }
    
    onLogOut(){
        console.log(`<- WaitingRoom.onLogOut`);
        this.router.navigate(['Login']);
        console.log(`/ WaitingRoom.onLogOut`);
    }
     
 }


