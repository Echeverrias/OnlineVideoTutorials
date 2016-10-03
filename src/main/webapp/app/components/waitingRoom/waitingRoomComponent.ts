/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Connection } from '../../services/connection';
import { MyService } from '../../services/myService';

import{ waitingRoomTemplate } from './waitingRoom.html'

 @Component({
    moduleId: module.id, 
    selector:'waitingRoom',
    styleUrls: ["../../../assets/styles/main.css", "waitingRoom.css"],
    template: waitingRoomTemplate
 })

 export class WaitingRoomComponent implements OnInit, OnDestroy{
     
    private allAvaibleRoomsNames : string[];
    
    private onAvaibleRoomsSubscription : Object; 
    private onNewAvaibleRoomSubscription: Object;
    private onAvaibleRoomLessSubscription: Object;
     
    constructor(private router: Router, private connection: Connection, private appService: MyService){
        console.log("");
        console.log(`% WaitingRoom constructor ${new Date().toLocaleTimeString()}`); 
        
       
        
        console.log(`/ WaitingRoom constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
        
    }
    
    ngOnInit(){
        this.onAvaibleRoomsSubscription = this.connection.subscriptions.subscribeToAllAvaibleRooms(this, this.onSetAvaibleRooms);
        this.onNewAvaibleRoomSubscription = this.connection.subscriptions.subscribeToNewAvaibleRoom(this, this.onAddAvaibleRoom);
        this.onAvaibleRoomLessSubscription = this.connection.subscriptions.subscribeToAvaibleRoomLess(this, this.onRemoveAvaibleRoom);
        
        this.lookingForRooms();
    }
    
    private lookingForRooms(): void {
        console.log("");
        console.log(`* <- WaitingRoom.lookingForRooms ${new Date().toLocaleTimeString()}`);

        var jsonMessage = {
            id:"waitingRoom"
        };
        
        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoom.lookingForRooms ${new Date().toLocaleTimeString()}`);
        console.log("");
        
    }
    
    onSetAvaibleRooms(avaibleRoomsNames: string[]){
        console.log("");
        console.log(`* WaitingRoom.avaibleRoomsNames ${new Date().toLocaleTimeString()}`);
        
        this.allAvaibleRoomsNames = avaibleRoomsNames;
        
        console.log(`/ WaitingRoom.avaibleRoomsNames ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onAddAvaibleRoom (roomName: string){
        console.log("");
        console.log(`* <- WaitingRoom.onAddAvaibleRoom: ${roomName} to ${this.allAvaibleRoomsNames} ${new Date().toLocaleTimeString()}`)
        
        this.allAvaibleRoomsNames.push(roomName);  
        
        console.log(`this.avaibleRooms: ${this.allAvaibleRoomsNames} `)
        console.log(`/WaitingRoom.onAddAvaibleRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
        
    };
    
    onRemoveAvaibleRoom (roomName: string){
        console.log("");
        console.log(`* <- WaitingRoom.onRemoveAvaibleRoom : ${roomName} ${new Date().toLocaleTimeString()}`); 
         
        let i = this.allAvaibleRoomsNames.indexOf(roomName);
        this.allAvaibleRoomsNames.splice(i,1);
        
        console.log(`this.avaibleRooms: ${this.allAvaibleRoomsNames}`);
        console.log(`/ WaitingRoom.onRemoveAvaibleRoom : ${roomName} ${new Date().toLocaleTimeString()}`);
        console.log("");
        
    };
    
    joinRoom (roomName: string){
        console.log("");
        console.log(`* WaitingRoom.joinRoom: ${roomName} ${new Date().toLocaleTimeString()}`);
        
        this.router.navigate(['Room' ,{roomName: roomName}]);
        
        console.log(`/ WaitingRoom.joinRoom ${new Date().toLocaleTimeString()}`);  
        console.log("");
        
    }
    
    onLogOut(){
        console.log("");
        console.log(`* <- WaitingRoom.onLogOut ${new Date().toLocaleTimeString()}`);
        
        let jsonMessage = {
            id: "logout",
            userName: this.appService.myUserName,
        };
               
        this.connection.sendMessage(jsonMessage);
        
        this.router.navigate(['Login']);
        
        console.log(`/ WaitingRoom.onLogOut ${new Date().toLocaleTimeString()}`);
        console.log("")
    }
    
    ngOnDestroy(){
        console.log("");
        console.log(`* <- WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        
        this.onAvaibleRoomsSubscription.unsubscribe();
        this.onNewAvaibleRoomSubscription.unsubscribe();
        this.onAvaibleRoomLessSubscription.unsubscribe();
        
        console.log(`/ WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        console.log("")
    }
     
 }