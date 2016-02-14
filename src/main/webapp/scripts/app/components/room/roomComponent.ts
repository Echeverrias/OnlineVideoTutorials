/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import {Component, OnInit, AfterViewInit, ViewChildren} from 'angular2/core';
import {CORE_DIRECTIVES, NgFor, NgIf} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';

import {Connection} from '../../services/connection.ts';
import {User} from '../../services/user.ts';
import {UserFactory} from '../../services/userFactory.ts';
import {MyService} from '../../services/myService.ts';

import {ParticipantComponent} from '../participant/participantComponent.ts';

@Component({
    selector: 'room',
    directives: [CORE_DIRECTIVES, NgFor, NgIf, ParticipantComponent],
    styleUrls: ["assets/styles/main.css"],
    templateUrl: "scripts/app/components/room/room.html"
})
export class RoomComponent implements OnInit{
    @ViewChildren(ParticipantComponent) participants: QueryList<ParticipantComponent>;
    private users: User[];
    private participantLess: Object;
    private participantInRoom: Object;
    
    
   
    constructor(private router: Router, private connection: Connection, private appService: MyService, private routeParams: RouteParams) {
      console.log(`% Room constructor`);
      
      
      this.users = [];
      this.participantLess = this.connection.events.subscribeToParticipantLess(this, this.onRemoveParticipant);
      this.participantInRoom = this.connection.events.subscribeToParticipantInRoom(this, this.onAddParticipant);
      this.lookingForParticipants();
      
      /*
      console.log(`me: ${JSON.stringify(participants.me)}`) 
      console.log(`tutor: ${JSON.stringify(participants.tutor)}`) 
      console.log(`students: ${JSON.stringify(participants.students)}`) 
      console.log(`studentsNames: ${JSON.stringify(participants.studentsNames)}`)
      console.log(`AmIAStudent: ${JSON.stringify(participants.amIAStudent())}`) 
      console.log(`AmIATutor: ${JSON.stringify(participants.amIATutor())}`) 
      */
      console.log(`/ Room constructor`);
    }
    
   
    
  ngAfterViewInit() {
    console.log(`ngAfterViewInit`);
  }
  ngAfterViewChecked() {
    console.log(`ngAfterViewChecked`);
  }
  
   ngOnInit(){
        console.log(`ngOnInit`);
    };
    
    ngAfterContentInit() {
        console.log(`ngAfterContentInit`);
  }
  ngAfterContentChecked() {
     console.log(`ngAfterContentChecked`);
  }
    
    private lookingForParticipants(){
        console.log(`* ngAfterViewInit`);
        if (this.appService.me.isAStudent()){
            
       
            var jsonMessage = {
                id:"joinRoom",
                roomName: this.routeParams.get('roomName'),
                userName: this.appService.me.userName,
                name: this.appService.me.name
            };

            this.connection.sendMessage(jsonMessage);
            
        }
        console.log(`/ ngAfterViewInit`);    
    }
    
    onExitOfRoom(){
        console.log(`<- Room.onExitOfRoom: ${this.roomName}`);
        
        
        let jsonMessage = {
                id: "exitRoom",
                roomName: this.routeParams.get('roomName'),
                userName: this.appService.me.userName,
                userType: this.appService.me.userType,
        }
        
        this.connection.sendMessage(jsonMessage);    
        
        if (this.appService.me.isAStudent()){
            this.router.navigate(['WaitingRoom']);
            
        }
        else{
            this.router.navigate(['Login']);
        }    
        
        this.removeAllParticipants();
        
        console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
        console.log("/ Room.onExitOfRoom");
    }
    
    // When a student (not a tutor) enter into a room
    onAddParticipant (jsonMessage: Object): void{
    console.log("<- Room.onAddParticipant");
    console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
    console.log(`users before: ${JSON.stringify(this.users)}`)
    
    let user = UserFactory.createAnUser(jsonMessage);
    this.users.push(user);
    
    console.log(`participants after: ${JSON.stringify(this.users)}`)
    console.log("/ Room.onAddParticipant");
    }
    
    
    onRemoveParticipant (jsonMessage: Object): void {
        console.log("<- Room.onRemoveParticipant - name: " + jsonMessage.userName)
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
            
        this.removeParticipantComponent(jsonMessage.userName);
        
        console.log("/ Room.onRemoveParticipant");
    }
    
    private removeParticipantComponent(userName: string): void{
        console.log(`* Room.removeParticipantComponent: ${userName}`);
        this.closeParticipant(userName);
        this.deleteUser(userName);
        console.log(`/ Room.removeParticipantComponent`);
    }
    
    private closeParticipant(userName:string): void{
        console.log(`* Room.closeParticipant: ${userName}`);
        let participant = this.participants._results.filter(participant => participant.id === userName)[0];
        participant.dispose();
        console.log(`* Room.closeParticipant`);
    }
    
    private deleteUser(userName: string): void{
        console.log(`* Room.deleteUser: ${userName}`);
        console.log(`users before: ${JSON.stringify(this.users)}`);
        let index = this.getIndexOfUser(userName);
        this.users.splice(index,1);
        console.log(`users after: ${JSON.stringify(this.users)}`);
        console.log(`* Room.deleteUser`);
    }
    
    private getIndexOfUser(userName: string): number{
       let index = 0;
       let i = index;
       let length = this.users.length;
       let found = false;
       
       while (!found && i < length){
           if (this.users[i].userName === userName){
               found = true;
               index = i;
           }
           else {
               i++;
           }
       }
       
       return index;
   }
   
   removeAllParticipants(): void{
       
       console.log(`* Room.removeAllParticipants`);
       this.participants._results.map(participant => participant.dispose());
       this.users.length = 0;
       console.log(`/ Room.removeAllParticipants`);
       /*
       let index = 0;
       let i = index;
       let length = this.users.length;
       
       for(var i = (length - 1); i < 0; i--){
           this.participants._results[i].dispose();
           this.users.length = i;
        }
        */
   }
   
}






