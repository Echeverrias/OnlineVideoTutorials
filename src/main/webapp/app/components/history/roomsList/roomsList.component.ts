/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, Input } from '@angular/core';




import{ roomsListTemplate } from './roomsList.html'

import { RoomHistory } from '../history.types';



 @Component({
    moduleId: module.id, 
    selector:'ovt-rooms-list',
    styleUrls: ["roomsList.css"],
    template: roomsListTemplate,
    
 })

 export class RoomsListComponent  {
     
    @Input() rooms: RoomHistory [];
    private selectedRoom: RoomHistory = null;
  
    
    
    
    
    constructor(){
        console.log("");
        console.log(`% RoomsListComponent constructor ${new Date().toLocaleTimeString()}`); 
       
        console.log(`/ RoomListComponent constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
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
  
 }
