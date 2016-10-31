/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, QueryList , EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Connection } from '../../services/connection';
import { MyService } from '../../services/myService';
import { RoomService } from '../../services/room.service';
import { HandlerService } from '../../services/handler.service';

import { ParticipantComponent } from '../participant/participant.component';

import { User } from '../../services/user';
import { UserFactory } from '../../services/userFactory';

import { roomTemplate } from './room.html'

@Component({
    moduleId: module.id,
    selector: 'ovt-room',
    styleUrls: ["room.css"],
    template: roomTemplate,
    providers: [RoomService]
})

export class RoomComponent implements OnInit, OnDestroy{
    
    @ViewChild(ParticipantComponent) mainParticipant: ParticipantComponent;
    @ViewChildren(ParticipantComponent) participants: QueryList<ParticipantComponent>;
    
    private name: string;
    private address: string;
    private mainUser: User = new User();
    private users: User[];
    
   // private eeReceiveVideoAnswer: EventEmitter;
   // private eeIceCandidate: EventEmitter;

    constructor(private handler: HandlerService, private room: RoomService, private router: Router, private me: MyService, private route: ActivatedRoute) {
      
      console.log("");
      console.log(`% Room constructor ${new Date().toLocaleTimeString()}`);
      /*
      this.eeReceiveVideoAnswer = new EventEmitter();
      this.eeReceiveVideoAnswer.subscribe(data => this.onReceiveVideoResponse(data));
      this.handler.attach('receiveVideoAnswer', this.eeReceiveVideoAnswer);
                           
      this.eeIceCandidate = new EventEmitter();
      this.eeIceCandidate.subscribe(data => this.onAddIceCandidate(data));
      this.handler.attach('iceCandidate', this.eeIceCandidate);
      */
      
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
    /*
    onReceiveVideoResponse(jsonMessage: Object): void {
        console.log("");
        console.log(`<- Room.onReceiveVideoResponse from ${jsonMessage.userName} ${new Date().toLocaleTimeString()}`);
        //console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
         
        let userName = jsonMessage.userName;
        let sdpAnswer = jsonMessage.sdpAnswer;
        let participant = this.getParticipant(userName);

        console.log(`participant:`);
        console.log(participant);

        participant.receiveVideoResponse(sdpAnswer);
        console.log(`/ Room.onReceiveVideoResponse ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onAddIceCandidate(jsonMessage: Object): void {
      //  console.log("");
       //// console.log(`<- Room.onIceCandidate from ${jsonMessage.userName} ${new Date().toLocaleTimeString()}`);
        //console.log(`<- message: ${JSON.stringify(jsonMessage)}`);

        let userName = jsonMessage.userName;
        let candidate = jsonMessage.candidate;

        let participant = this.getParticipant(userName);

      //  console.log(`participant:`);
      //  console.log(participant);

        participant.addIceCandidate(candidate);

      //  console.log(`/ Room.onIceCandidate`);
      //  console.log("/ " + new Date().toLocaleTimeString());
       // console.log("");
    }

    private getParticipant(userName: string): ParticipantComponent {
        //console.log("");
       // console.log(`* Room.getParticipant: ${userName} of ...  ${new Date().toLocaleTimeString()}`);
       // console.log(this.users);
        let participant: ParticipantComponent;
        if (this.mainParticipant.userName === userName) {
            participant = this.mainParticipant;
        }
        else {
            participant = this.participants._results.filter(participant => participant.id === userName)[0];
        }

       // console.log(`/ Room.getParticipant -> ${participant.userName} ${new Date().toLocaleTimeString()}`);
       // console.log("");
        return participant;
    }
  */

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
        
      this.room.destroy();
    }
   
}