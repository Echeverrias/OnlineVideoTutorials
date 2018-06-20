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
import { SafeResourceUrl } from '@angular/platform-browser';

import { SelectOption } from '../../shared/components/select/select.component';

 @Component({
    moduleId: module.id, 
    selector:'ovt-history',
    styleUrls: ["history.css"],
    template: historyTemplate,
    providers: [HistoryService]
 })

 export class HistoryComponent implements OnInit{
     
    private userName: string;
    public rooms: RoomHistory [];
   // private selectedRoom: RoomHistory = null;
    private destroyed$: Subject<boolean> = new Subject<boolean>();
   // private fileUrl: string = null;
    public currentPage: number = 1;
    public initialRoomsPerPage: number = 5;
    public roomsPerPage: number;
    public showedRooms: RoomHistory [] = [];
    public options : SelectOption[] = [];
    public totalRooms: number = 0;
    public loadingRooms: boolean = true;
    
    
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
        this.roomsPerPage = this.initialRoomsPerPage;
        this.options.push({
            textContent: this.initialRoomsPerPage.toString(),
            value: this.initialRoomsPerPage.toString()
        })
        this.options.push({
            textContent: (this.initialRoomsPerPage + 5).toString(),
            value: (this.initialRoomsPerPage + 5).toString()
        })
        this.options.push({
            textContent: (this.initialRoomsPerPage + 10).toString(),
            value: (this.initialRoomsPerPage + 10).toString()
        })

    }

    private getRoomsHistory(userName: string): void{
        this.history.getRoomsHistory(userName)
        .takeUntil(this.destroyed$)
        .subscribe(
            (rooms: RoomHistory []) => {
                this.loadingRooms = false;
                this.rooms = rooms.reverse(); 
                this.totalRooms = rooms.length;
                this.options.push({
                    textContent: "Todas",
                    value: (this.rooms.length).toString()
                })
                this.showedRooms = this.getRoomsPerPage();
                console.log(this.rooms)
            },
            error => console.log(error),
            () => console.log('completed')
        )
    }
    
    onRoomsPerPage(roomsPerPage: number){
        console.log(`History.Component.onRoomsPerPage(${roomsPerPage})`);
        console.log(`typeOf(roomsPerPage)`, typeof(roomsPerPage));
        this.roomsPerPage = Number(roomsPerPage);
        console.log(`History.Component.this.roomsPerPage: ${this.roomsPerPage}`);
        this.goToPage(1);
    }


    goToPage(newPage: number){
        console.log(`History.Component.goToPage(${newPage})`);
        this.currentPage = newPage;
        this.showedRooms = this.getRoomsPerPage();
        console.log(`this.showedRooms.length: ${this.showedRooms.length}`,this.showedRooms);
    }

    private getRoomsPerPage(): RoomHistory[]{
        console.log('HistoryComponent.getRoomsPerPage');
        console.log("this.currentPage: ", this.currentPage);
        console.log("this.roomsPerPage: ", this.roomsPerPage);
        console.log("typeof(this.currentPage): ", typeof(this.currentPage));
        console.log("typeof(this.roomsPerPage): ", typeof(this.roomsPerPage));
        let startIndex: number = (this.currentPage - 1) * this.roomsPerPage;
        let endIndex: number = startIndex + this.roomsPerPage;
        console.log(startIndex);
        console.log(endIndex);
        console.log('typeof(startIndex)', typeof(startIndex));
        console.log('typeof(endIndex)',typeof(endIndex));
        console.log(`min: ${startIndex}, max: `, endIndex);
        let rooms = this.rooms.slice(startIndex, endIndex);
        console.log(rooms.length)
        return this.rooms.slice(startIndex, endIndex);
    }

    /*
    onSelectedRoom(room: RoomHistory){
        console.log("click onSelectedRoom");
        if (this.selectedRoom == room){
            this.selectedRoom = null;
        }
        else{
        this.selectedRoom = room;
        }
    }
 */
    /*
    onLoadFile(fileUrl:string){
      this.fileUrl = fileUrl;  
    }

    onCloseContentDisplayer(close:boolean){
        console.log('onCloseContentDisplayer: ', close);
            this.onCloseSomeFile();
    }

    private onCloseSomeFile(){
        this.fileUrl = null;
    }
  */
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
