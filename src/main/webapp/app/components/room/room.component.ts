/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, QueryList , EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


import { UserService } from '../../core/user.service';
import { RoomService } from './room.service';
import { ParticipantsService } from './participants.service';

import { ParticipantComponent } from './participant/participant.component';

import { UserFactory } from './../../models/userFactory';
import { User, IUser } from '../../models/user';
import { Subject } from 'rxjs/Subject';

import { roomTemplate } from './room.html'

@Component({
    moduleId: module.id,
    selector: 'ovt-room',
    styleUrls: ["room.css"],
    template: roomTemplate,
    providers: [RoomService, ParticipantsService]
})

export class RoomComponent implements OnInit, OnDestroy{
    
    @ViewChild(ParticipantComponent) mainParticipantComponent: ParticipantComponent;
    @ViewChildren(ParticipantComponent) participantsComponent: QueryList<ParticipantComponent>;
    
    private id: number;
 //   private mainUser: User = new User();
 //   private users: User[];
    private activeGadget: boolean;  
    private mainParticipant: User;
    private participants: User[];
    private fileUrl: SafeResourceUrl;
    private showCloseButton: boolean;
    
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(private room: RoomService, private _participants: ParticipantsService, private router: Router, private me: UserService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
      
      console.log("");
      console.log(`% Room constructor ${new Date().toLocaleTimeString()}`);
      console.log("this.me: ", this.me)
      console.log("this.me.getMe(): ", this.me.getMe());
      console.log("this.me.getMyInfo(): ", this.me.getMyInfo());
      console.log(this.participants);
      console.log(`/ Room constructor ${new Date().toLocaleTimeString()}`);
      console.log("");

    }
    
    ngOnInit(){
      this.route.params.forEach((params: Params) => {
            this.id = parseInt(params['roomId']);
        });
      console.log(`RoomComponent.ngOnInit - this.id: ${this.id}`); //*
      this.room.init(this.me.getMyInfo());
      //this.room.getParticipants().subscribe((users: User[]): void => { this.users = users } );
      //this.room.getMainParticipant().subscribe((mainUser: User): void  => { this.mainUser = mainUser });
      
      this.room.getParticipants()
     .takeUntil(this.destroyed$)
     .subscribe((users: IUser[]): void => { 
       console.log('RoomComponent.getParticipants()');
       let participants = users.map(u => UserFactory.createAnUser(u));
       this.setAvailableParticipants(participants);
       console.log('These are the available participants:');
       console.log(this.participants);
      });

      
      this.room.getIncomingParticipant()
      .takeUntil(this.destroyed$) 
      .subscribe((user: IUser): void  => { 
        console.log('RoomComponent.getNewParticipant()');
        let participant = UserFactory.createAnUser(user);
        this.setNewParticipant(participant);
      });

      this.room.getOutcomingParticipant()
      .takeUntil(this.destroyed$) 
      .subscribe((userName: string) => this.removeParticipant(userName));
    
    }

    private setAvailableParticipants(participants: User[]){
      let students = this.getStudents(participants);
      let tutor = this.findTutor(participants); 
      let me = this.findMe(participants);
      if (this.me.amIATutor()) {
       this.mainParticipant = students.splice(0, 1)[0];
       this.participants = students;
      } else {
         this.participants = students;
      }   
      this.participants.push(me);
      if (tutor && !this.mainParticipant && this.me.amIAStudent()) {
       this.mainParticipant = tutor;
      } 
    }  

    private findTutor(users: User[]): User {
     return users.find(user => user.isATutor());
    }

    private findMe(users: User[]): User {
      return users.find(user => user.userName === this.me.userName) ;
    }

    private getStudents(users: User[]): User[] {
      return users.filter(user => user.isAStudent() && (user.userName !== this.me.userName));
    }

    private setNewParticipant(participant: User){
      if (participant.userName === this.me.userName) {
        this.participants.push(participant);
      }
      else if(participant.isAStudent() && (this.me.amIAStudent() || this.mainParticipant)) {
        this.participants.splice(this.participants.length - 1, 0, participant);
      } else {
        this.mainParticipant = participant;
      }
    }
    
    removeParticipant(userName: string): void {
      console.log("");
      console.log(`* RoomComponent.onRemoveParticipant: ${userName} ${new Date().toLocaleTimeString()}`);
      
      if (this.mainParticipant.userName === userName) {
          //this.mainUser.setToUndefined();
          this.mainParticipant = undefined;
      }
      else {
          console.log(`The participant to remove isn't the main participant`);
          let index = this.getIndexOfParticipant(userName);
          if (index > -1) {
            this.participants.splice(index, 1);
          }
      }

      

      console.log(`users after: ${JSON.stringify(this.participants)}`);
      console.log(`/ RoomComponent.onRemoveParticipant ${new Date().toLocaleTimeString()}`);
      console.log("");

  }

  private getIndexOfParticipant(userName: string): number{
    return this.participants.findIndex(p => p.userName === userName);
 }
    
    onExitOfRoom(): void {
        console.log("");
        console.log(`<- Room.onExitOfRoom: ${this.id} ${new Date().toLocaleTimeString()}`);
         
       //this.room.onExit();
        
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
      this.destroyed$.next(true);
      this.destroyed$.complete();
      this._participants.destroy();  
      this.room.destroy();
      this.participants.length = 0;
      this.mainParticipant = null; //this.mainUser.setToUndefined();
      this.me.deleteMyCurrentRoom();
    }

   
   
}