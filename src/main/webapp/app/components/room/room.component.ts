/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, QueryList , EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    
    constructor(private room: RoomService, private _participants: ParticipantsService, private router: Router, private me: UserService, private route: ActivatedRoute) {
      
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

      this.room.init(this.name);
      this.room.getParticipants().subscribe(users => this.users = users);
      this.room.getMainParticipant().subscribe(mainUser => this.mainUser = mainUser);
    }
    
    onExitOfRoom(): void {
        console.log("");
        console.log(`<- Room.onExitOfRoom: ${this.name} ${new Date().toLocaleTimeString()}`);
         
        this.room.onExit();
        
        if (this.me.amAStudent()) {
            this.router.navigate(['/rooms']);
        }
        else {
           this.router.navigate(['/login']);
        }
      
        console.log(`/ Room.onExitOfRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    ngOnDestroy(){
      console.log(`* Room.OnDestroy ${new Date().toLocaleTimeString()}`);
      this._participants.destroy();  
      this.room.destroy();
    }
   
}