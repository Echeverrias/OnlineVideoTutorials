/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, QueryList , EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


import { UserService } from '../../services/user.service';
import { RoomService } from './room.service';
import { ParticipantsService } from './participants.service';

import { ParticipantComponent } from './participant/participant.component';

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
    
    private id: string;
    private mainUser: User = new User();
    private users: User[];
    private activeGadget: boolean;  
    private fileUrl: SafeResourceUrl;
    private showCloseButton: boolean;
    
    constructor(private room: RoomService, private _participants: ParticipantsService, private router: Router, private me: UserService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
      
      console.log("");
      console.log(`% Room constructor ${new Date().toLocaleTimeString()}`);
      console.log("this.me: ", this.me)
      console.log("this.me.getMe(): ", this.me.getMe());
      console.log("this.me.getMyInfo(): ", this.me.getMyInfo());
      console.log(this.users);
      console.log(`/ Room constructor ${new Date().toLocaleTimeString()}`);
      console.log("");

    }
    
    ngOnInit(){
      this.route.params.forEach((params: Params) => {
            this.id = params['roomId'];
        });
      console.log(`RoomComponent.ngOnInit - this.id: ${this.id}`); //*
      this.room.init(this.me.getMyInfo());
      this.room.getParticipants().subscribe((users: User[]): void => { this.users = users } );
      this.room.getMainParticipant().subscribe((mainUser: User): void  => { this.mainUser = mainUser });
    }
    
    onExitOfRoom(): void {
        console.log("");
        console.log(`<- Room.onExitOfRoom: ${this.id} ${new Date().toLocaleTimeString()}`);
         
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
      this.me.deleteMyCurrentRoom();
    }

   
   
}