/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, QueryList , EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { ParticipantsService } from '../../services/participants.service';

import { ParticipantComponent } from '../participant/participant.component';

import { User } from '../../models/user';

import { roomTemplate } from './room.html'

@Component({
    moduleId: module.id,
    selector: 'ovt-room',
    styleUrls: ["room.css"],
    template: roomTemplate,
    providers: [RoomService, ParticipantsService]
})

export class RoomComponent implements OnInit, OnDestroy{
    
    @ViewChild(ParticipantComponent) mainParticipant: ParticipantComponent;
    @ViewChildren(ParticipantComponent) participants: QueryList<ParticipantComponent>;
    
    private name: string;
    private address: string;
    private mainUser: User = new User();
    private users: User[];
    private activeGadget: boolean;  
    private fileUrl: SafeResourceUrl;
    private showCloseButton: boolean;
    
    constructor(private room: RoomService, private _participants: ParticipantsService, private router: Router, private me: UserService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
      
      console.log("");
      console.log(`% Room constructor ${new Date().toLocaleTimeString()}`);
      console.log(this.users);
      console.log(`/ Room constructor ${new Date().toLocaleTimeString()}`);
      console.log("");

    }
    
    ngOnInit(){
      this.route.params.forEach((params: Params) => {
            this.name = params['roomName'];
        });
      this.address = this.name;
      console.log(`RoomComponent.ngOnInit - this.address: ${this.address}`); //*
      this.room.init(this.name);
      this.room.getParticipants().subscribe((users: User[]): void => { this.users = users } );
      this.room.getMainParticipant().subscribe((mainUser: User): void  => { this.mainUser = mainUser });
    }
    
    onExitOfRoom(): void {
        console.log("");
        console.log(`<- Room.onExitOfRoom: ${this.name} ${new Date().toLocaleTimeString()}`);
         
        this.room.onExit();
        
        this.router.navigate(['/rooms']);
      
        console.log(`/ Room.onExitOfRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    showGadget(isSomeGadgetActive: boolean) {
        this.activeGadget = isSomeGadgetActive;
    }

    onLoadFile(fileUrl: string){
      console.log(`RoomComponent.onLoadFile(${fileUrl})`); 
      this.showCloseButton = false;
      console.log(this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl));
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl); 
    }

    onMouseOverFile(){
        console.log("onMouseOverFile");
        this.showCloseButton = true;
    }
    
    onCloseFile(){
      this.fileUrl = undefined;
      this.showCloseButton = false;
    }

    ngOnDestroy(){
      console.log(`* Room.OnDestroy ${new Date().toLocaleTimeString()}`);
      this._participants.destroy();  
      this.room.destroy();
    }

   
   
}