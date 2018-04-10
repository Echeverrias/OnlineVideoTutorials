/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { HistoryService } from './history.service';
import { UserService } from '../../core/user.service';

import{ historyTemplate } from './history.html'

import { IRoomHistory, RoomHistory } from './history.types';

 @Component({
    moduleId: module.id, 
    selector:'ovt-history',
    styleUrls: ["history.css"],
    template: historyTemplate,
    providers: [HistoryService]
 })

 export class HistoryComponent implements OnInit{
     
    private userName: string;
    private rooms: RoomHistory [];
    private selectedRoom: RoomHistory = null;
    private destroyed$: Subject<boolean> = new Subject<boolean>();
    
        
    constructor(private history: HistoryService, private router: Router, private me: UserService){
        console.log("");
        console.log(`% HistoryComponent constructor ${new Date().toLocaleTimeString()}`); 
        
        console.log(`/ HistoryComponent constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    ngOnInit(){
        console.log("HistoryComponent.onInit");
        this.userName = this.me.userName;
        this.getRoomsHistory(this.userName);
    }

    private getRoomsHistory(userName: string): void{
        this.history.getRoomsHistory(userName)
        .takeUntil(this.destroyed$)
        .subscribe(
            (rooms: RoomHistory []) => {
                this.rooms = rooms.reverse(); 
                console.log(this.rooms)
            },
            error => console.log(error),
            () => console.log('completed')
        )
    }

    onSelectedRoom(room: RoomHistory){
        console.log("click onSelectedRoom");
        if (this.selectedRoom == room){
            this.selectedRoom = null;
        }
        else{
        this.selectedRoom = room;
        }
    }

    onReturn(){
        this.router.navigate(["/rooms"]);
    }

    
    
    ngOnDestroy(){
        console.log("");
        console.log(`* <- History.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        
        this.destroyed$.next(true);
        this.destroyed$.complete();
     
        console.log(`/ History.ngOnDestroy ${new Date().toLocaleTimeString()}`);
        console.log("")
    }
     
 }
