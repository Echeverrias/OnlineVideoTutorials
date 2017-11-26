/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


import{ roomDetailsTemplate } from './roomDetails.html'

import { RoomHistory } from './../history.types';
import { IUser } from './../../../models/user';

 @Component({
    moduleId: module.id, 
    selector:'ovt-room-details',
    styleUrls: ["roomDetails.css"],
    template: roomDetailsTemplate,
 })

 export class RoomDetailsComponent {
    
    @Input() room: RoomHistory;
    
    private participantsSelected: boolean = false;
    private filesSelected: boolean = false;
        
    constructor(){
        console.log("");
        console.log(`% RoomDetailsComponent constructor ${new Date().toLocaleTimeString()}`); 
        
        console.log(`/ RoomDetailsComponent constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    showOrHideParticipants(){
       this.participantsSelected = !this.participantsSelected;
    }

    showOrHideFiles(){
         this.filesSelected = !this.filesSelected;
    }
     
 }
