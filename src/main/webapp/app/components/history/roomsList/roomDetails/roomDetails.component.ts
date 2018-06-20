

/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, Input , Output, OnChanges, SimpleChange, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

//b import { FileLinkComponent } from '../../../shared/fileLink/fileLink.component';

import{ roomDetailsTemplate } from './roomDetails.html'

import { RoomHistory } from './../../history.types';
import { IUser } from './../../../../models/user';
import { ContentDisplayerComponent } from '../../../../shared/components/contentDisplayer/contentDisplayer.component';


 @Component({
    moduleId: module.id, 
    selector:'ovt-room-details',
    styleUrls: ["roomDetails.css"],
    template: roomDetailsTemplate,
 })

 export class RoomDetailsComponent implements OnChanges{
    
    @Input() room: RoomHistory;
    @Input() detailsSelected: boolean;
   // @Output("ovt-load-file") loadFile: EventEmitter<string>;
   
    private participantSelected: IUser;
    public displayedFile: string;
    
    private participantsSelected: boolean = false;
    private filesSelected: boolean = false;
    
    validMimeTypes: any;

    constructor(){
        console.log("");
        console.log(`% RoomDetailsComponent constructor ${new Date().toLocaleTimeString()}`); 
        //this.loadFile = new EventEmitter<string>();
        this.validMimeTypes = ContentDisplayerComponent.getValidMimeTypes();
        console.log(`/ RoomDetailsComponent constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }


    ngOnChanges(changes : {[propKey:string]: SimpleChange}){
        console.log('RoomDetailsComponent.onChanges');
        let dsNow = changes['detailsSelected'].currentValue;
        this.participantsSelected = this.participantsSelected && dsNow;
        this.filesSelected = this.filesSelected && dsNow;
    }


    onStopPropagation(event: Event){
    console.log("RoomDetailsComponent.onStopPropagation");
    event.stopPropagation();
}

    showOrHideDetails(){
        console.log('RoomDetailsComponent.showOrHideDetails');
       this.detailsSelected = !this.detailsSelected;
       if (!this.detailsSelected){
        this.participantsSelected = false;
        this.filesSelected = false;
       }
    }

    showOrHideParticipants(){
        console.log('RoomDetailsComponent.showOrHideParticipants');
       this.participantsSelected = !this.participantsSelected;
       return false;
    }

    showOrHideFiles(){
        console.log('RoomDetailsComponent.showOrHideFiles');
        this.filesSelected = !this.filesSelected;
        return false;
    }
   
    /*
    onLoadFile(fileUrl:string){
      this.loadFile.emit(fileUrl);
      return false;
    }

  */

  onLoadFile(fileUrl:string){
    console.log(`RoomDetailsComponent.onLoadFile({{fileUrl}})`)
    this.displayedFile = fileUrl;  
  }

  onCloseContentDisplayer(close:boolean){
      console.log('onCloseContentDisplayer: ', close);
      this.displayedFile = null;
      return false;
  }


    onDownload(){
        // The download event trigger the beforeunload event
    
        //console.log('downloadEvent');
        //sessionStorage.setItem('downloadEvent', 'true'); 
      }
     
 }
