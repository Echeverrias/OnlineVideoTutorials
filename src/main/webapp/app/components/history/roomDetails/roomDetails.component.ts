/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, Input , OnChanges, SimpleChange} from '@angular/core';
import { Router } from '@angular/router';

import { FileLinkComponent } from '../../share/fileLink/fileLink.component';

import{ roomDetailsTemplate } from './roomDetails.html'

import { RoomHistory } from './../history.types';
import { IUser } from './../../../models/user';

 @Component({
    moduleId: module.id, 
    selector:'ovt-room-details',
    styleUrls: ["roomDetails.css"],
    template: roomDetailsTemplate,
 })

 export class RoomDetailsComponent implements OnChanges{
    
    @Input() room: RoomHistory;
    @Input() detailsSelected: boolean;

    private participantSelected: IUser;
    
   private participantsSelected: boolean = false;
    private filesSelected: boolean = false;
        
    constructor(){
        console.log("");
        console.log(`% RoomDetailsComponent constructor ${new Date().toLocaleTimeString()}`); 
       
        console.log(`/ RoomDetailsComponent constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }


    ngOnChanges(changes : {[propKey:string]: SimpleChange}){
        console.log('onChanges');
        let dsNow = changes['detailsSelected'].currentValue;
        this.participantsSelected = this.participantsSelected && dsNow;
        this.filesSelected = this.filesSelected && dsNow;
    }


    onStopPropagation(event: Event){
    console.log("onStopPropagation");
        event.stopPropagation();
}

    showOrHideDetails(){
        console.log('click showOrHideDetails');
       this.detailsSelected = !this.detailsSelected;
       if (!this.detailsSelected){
        this.participantsSelected = false;
        this.filesSelected = false;
       }
    }

    showOrHideParticipants(){
        console.log('click showOrHideParticipants');
       this.participantsSelected = !this.participantsSelected;
    }

    showOrHideFiles(){
        console.log(' click showOrHideFiles');
         this.filesSelected = !this.filesSelected;
    }

    onDownload(){
        // The download event trigger the beforeunload event
    
        //console.log('downloadEvent');
        //sessionStorage.setItem('downloadEvent', 'true'); 
      }
     
 }
