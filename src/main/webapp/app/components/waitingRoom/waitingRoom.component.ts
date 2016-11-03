/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { WaitingRoomService } from '../../services/waitingRoom.service';
import { UserService } from '../../services/user.service';

import{ waitingRoomTemplate } from './waitingRoom.html'

 @Component({
    moduleId: module.id, 
    selector:'ovt-waitingRoom',
    styleUrls: ["waitingRoom.css"],
    template: waitingRoomTemplate,
    providers: [WaitingRoomService]
 })

 export class WaitingRoomComponent implements OnInit, OnDestroy{
     
    private availableRoomsNames : string[];
    
    private onavailableRoomsSubscription : Object; 
    private onNewavailableRoomSubscription: Object;
    private onavailableRoomLessSubscription: Object;
     
    constructor(private waitingRoom: WaitingRoomService, private router: Router, private me: UserService){
        console.log("");
        console.log(`% WaitingRoom constructor ${new Date().toLocaleTimeString()}`); 
        console.log(`/ WaitingRoom constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    ngOnInit(){
        this.waitingRoom.init();
        this.waitingRoom.getAvailableRooms().subscribe(availableRooms => this.availableRoomsNames = availableRooms);
    }

    onJoinRoom (roomName: string){
        console.log("");
        console.log(`* WaitingRoom.joinRoom: ${roomName} ${new Date().toLocaleTimeString()}`);
        
        this.router.navigate(['/room' ,roomName]);
        
        console.log(`/ WaitingRoom.joinRoom ${new Date().toLocaleTimeString()}`);  
        console.log("");
    }
    
    onLogOut(){
        console.log("");
        console.log(`* <- WaitingRoom.onLogOut ${new Date().toLocaleTimeString()}`);
       
        this.router.navigate(['/login']);
     }
    
    ngOnDestroy(){
        console.log("");
        console.log(`* <- WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        
        this.waitingRoom.destroy();
        
        console.log(`/ WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        console.log("")
    }
     
 }