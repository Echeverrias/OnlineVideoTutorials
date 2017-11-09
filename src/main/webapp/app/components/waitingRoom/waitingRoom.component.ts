
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { WaitingRoomService } from './waitingRoom.service';
import { UserService } from '../../services/user.service';

import{ waitingRoomTemplate } from './waitingRoom.html'
import { IRoom, Room } from './../../models/room';


 @Component({
    moduleId: module.id, 
    selector:'ovt-waitingRoom',
    styleUrls: ["waitingRoom.css"],
    template: waitingRoomTemplate,
    providers: [WaitingRoomService]
 })

 export class WaitingRoomComponent implements OnInit, OnDestroy{
     
    private availableRooms : IRoom[];
    private roomName: string;
    
    private onavailableRoomsSubscription : Object; 
    private onNewavailableRoomSubscription: Object;
    private onavailableRoomLessSubscription: Object;
     
    constructor(private waitingRoom: WaitingRoomService, private router: Router, private me: UserService){
        console.log("");
        console.log(`% WaitingRoom constructor ${new Date().toLocaleTimeString()}`); 
        console.log("Last room: ", this.me.getMyLastRoom());
        this.roomName = this.me.userName;
        console.log(`/ WaitingRoom constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    ngOnInit(){
        console.log("WaitingRoomComponent.onInit");
        console.log(this.me);
        this.getAvailableRooms();
        if (this.me.amIAStudent()){
            this.waitingRoom.initAsStudent(this.me.getMe());
        }
        else{
            console.log("Im a tutor");
            console.log("My current room: ", this.me.getMyCurrentRoom());
            this.waitingRoom.initAsTutor(this.me.getMe());
        }    
    }

    getAvailableRooms(){    
        this.waitingRoom.getAvailableRooms()
        .subscribe(availableRooms => {
            console.log("available rooms: ", availableRooms);
            this.availableRooms = availableRooms
        });
    }    

    onCreateRoom(roomName: string){
        this.waitingRoom.createRoom(roomName, this.me.userName)
       .subscribe(
            (room: IRoom) => {
                this.enterIntoRoom(room);
            },    
            error => console.log(error)
        )
        
    }

/* // EL nombre de la room será su id
    private createRoomName(roomName : string): string{
        let name = roomName;
        if (name !== ""){ 
            name = name.replace(this.me.userName, ""); 
            name = name.replace(" ", "_");
        }     
        return name === "" ? `${this.me.userName}` : `${this.me.userName }_${name }`;
    }
*/
    onJoinRoom (room: IRoom){
        console.log("");
        console.log(`* WaitingRoom.joinRoom: ${room.name} ${new Date().toLocaleTimeString()}`);
        if(this.me.amIATutor()){
            let auxRoom: Room = new Room();
            auxRoom.setDataRoom(room);
            this.waitingRoom.retrieveRoom(auxRoom.json())
            .subscribe(
                (room: IRoom) => {
                    this.enterIntoRoom(room);
                },    
                error => console.log(error)
            )
        }
        else{
            this.enterIntoRoom(room);
        }
        console.log(`/ WaitingRoom.joinRoom ${new Date().toLocaleTimeString()}`);  
        console.log("");
    }
    
    private enterIntoRoom(room:IRoom){
        console.log('enterIntoRoom');
        console.log(room);
        this.me.registerCurrentRoom(room);
        console.log( this.me.getMyCurrentRoom());
        this.router.navigate(['/rooms' ,room.id]);
    }

    onSignOut(){
        console.log("");
        console.log(`* <- WaitingRoom.onLogOut ${new Date().toLocaleTimeString()}`);
        this.router.navigate(['/sign']);
    }
    
    ngOnDestroy(){
        console.log("");
        console.log(`* <- WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        
        if (this.me.amIAStudent()){
            this.waitingRoom.destroyAsStudent(this.me.getMe());
        }
        else{
            this.waitingRoom.destroyAsTutor(this.me.getMe());
        }    
        
        console.log(`/ WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        console.log("")
    }
     
 }