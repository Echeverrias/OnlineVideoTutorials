/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HistoryService } from './history.service';
import { UserService } from '../../services/user.service';

import{ historyTemplate } from './history.html'

import { Room } from './room';

 @Component({
    moduleId: module.id, 
    selector:'ovt-history',
    styleUrls: ["history.css"],
    template: historyTemplate,
    providers: [HistoryService]
 })

 export class HistoryComponent implements OnInit{
     
    private userName: string;
    private rooms: Room [];
    private selectedRoom: Room = null;
    
        
    constructor(private history: HistoryService, private router: Router, private me: UserService){
        console.log("");
        console.log(`% HistoryComponent constructor ${new Date().toLocaleTimeString()}`); 
        
        console.log(`/ HistoryComponent constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    ngOnInit(){
        console.log("HistoryComponent.onInit");
        this.userName = this.me.myUserName;
        this.getRoomsHistory(this.userName);
    }

    private getRoomsHistory(userName: string): void{
        this.history.getRoomsHistory(userName)
        .subscribe(
            (rooms: Room []) => {this.rooms = rooms.slice(0); console.log(this.rooms)},
            error => console.log(error),
            () => console.log('completed')
        )
    }

    onSelectedRoom(room: Room){
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
       
    }
     
 }
