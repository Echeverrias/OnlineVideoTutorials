

/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { WaitingRoomService } from './waitingRoom.service';
import { UserService } from '../../core/user.service';

import{ waitingRoomTemplate } from './waitingRoom.html'
import { IRoom, Room } from './../../models/room';
import { IUserInfo } from './../../models/user';
import { Subject } from 'rxjs/Subject';


 @Component({
    moduleId: module.id, 
    selector:'ovt-waitingRoom',
    styleUrls: ["waitingRoom.css"],
    template: waitingRoomTemplate,
    providers: [WaitingRoomService],
    //changeDetection: ChangeDetectionStrategy.OnPush,
 })

 export class WaitingRoomComponent implements OnInit, OnDestroy {
     
    private availableRooms : IRoom[];
    private roomName: string;
    private destroyed$: Subject<boolean> = new Subject<boolean>();
    
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
        this.waitingRoom.init(this.me.getMe());
        if(this.me.amIAStudent()){
            this.waitingRoom.initSubscription();
        }
        this.getAvailableRooms(this.me.getMe());
       
    }

    getAvailableRooms(me: IUserInfo){    
        this.waitingRoom.getAvailableRooms()
        .takeUntil(this.destroyed$)
        .subscribe(availableRooms => {
            console.log('WaitingRoomComponent.getAvailableRooms.subscription:');
            console.log(availableRooms);
            this.availableRooms = availableRooms;
        });
    }    
    
    onCreateRoom(roomName: string){
        this.waitingRoom.createRoom(roomName, this.me.userName)
       .takeUntil(this.destroyed$)
       .subscribe(
            (room: IRoom) => {
                this.enterIntoRoom(room);
            },    
            error => console.log(error)
        )
        
    }

    onJoinRoom (room: IRoom){
        console.log("");
        console.log(`* WaitingRoom.joinRoom: ${room.name} ${new Date().toLocaleTimeString()}`);
        if(this.me.amIATutor()){
            let auxRoom: Room = new Room();
            auxRoom.setDataRoom(room);
            this.waitingRoom.retrieveRoom(auxRoom.json())
            .takeUntil(this.destroyed$)
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
        
        this.waitingRoom.destroy();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        
        console.log(`/ WaitingRoom.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        console.log("")
    }
     
 }