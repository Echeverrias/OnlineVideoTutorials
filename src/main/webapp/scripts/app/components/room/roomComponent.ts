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
    styleUrls: ["assets/styles/main.css", "assets/styles/room.css"],
    templateUrl: "scripts/app/components/room/room.html"
})
export class RoomComponent implements OnInit{
    
    
    @ViewChildren(ParticipantComponent) participants: QueryList<ParticipantComponent>;
    
    
    private name: string;
    private users: User[];
    private participantLess: Object;
    private participantInRoom: Object;
    private videoResponse: Object;
    private iceCandidate: Object;
    
    
    
   
    constructor(private router: Router, private connection: Connection, private appService: MyService, private routeParams: RouteParams) {
      
      console.log("");
     console.log("* " + new Date().toLocaleTimeString());
      console.log(`% Room constructor`);
      
      this.name = routeParams.get('roomName');
      this.users = [];
      this.participantLess = this.connection.events.subscribeToParticipantLess(this, this.onRemoveParticipant);
      this.participantInRoom = this.connection.events.subscribeToParticipantInRoom(this, this.onAddParticipant);
      this.videoResponse = this.connection.events.subscribeToVideoAnswer(this, this.onReceiveVideoResponse);
      this.iceCandidate = this.connection.events.subscribeToIceCandidate(this, this.onAddIceCandidate);
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
     console.log("/ " + new Date().toLocaleTimeString());
      console.log("");
    }
    
   
    private lookingForParticipants(){
         console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`* Room.ngAfterViewInit`);
        
            
       
            var jsonMessage = {
                id:"joinRoom",
                roomName: this.routeParams.get('roomName'),
                userName: this.appService.me.userName,
                userType: this.appService.me.userType,
                name: this.appService.me.name
            };

            this.connection.sendMessage(jsonMessage);
            
        
        console.log(`/ Room.ngAfterViewInit`);  
        console.log("/ " + new Date().toLocaleTimeString()); 
         console.log("");
          
    }
    
    onExitOfRoom(){
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`<- Room.onExitOfRoom: ${this.name}`);
        
        
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
        
        console.log("/ Room.onExitOfRoom");
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
    }
    
    
    onReceiveVideoResponse(jsonMessage: Object): void{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log("<- Room.onReceiveVideoResponse");
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);

        let userName = jsonMessage.userName;
        let sdpAnswer = jsonMessage.sdpAnswer;

        let participant = this.getParticipant(userName);
        participant.receiveVideoResponse(sdpAnswer);


        console.log(`/ Room.onReceiveVideoResponse`);
        console.log("* " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    
    onAddIceCandidate(jsonMessage: Object): void{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log("<- Room.onIceCandidate");
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);

        let userName = jsonMessage.userName;
        let candidate = jsonMessage.candidate;

        let participant = this.getParticipant(userName);
        participant.addIceCandidate(candidate);


        console.log(`/ Room.onIceCandidate`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    
   
    onAddParticipant (jsonMessage: Object): void{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        
        console.log("<- Room.onAddParticipant");
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
        console.log(`users before: ${JSON.stringify(this.users)}`)
        
        let user: User;
        if (jsonMessage.userName === this.appService.me.userName) {
            user = this.appService.me;
        }
        else {
            user = UserFactory.createAnUser(jsonMessage);
        }
            
        this.users.push(user);

        console.log(`participants after: ${JSON.stringify(this.users)}`)
        console.log("/ Room.onAddParticipant");
        console.log("* " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    
    
    
    onRemoveParticipant (jsonMessage: Object): void {
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log("<- Room.onRemoveParticipant - name: " + jsonMessage.userName)
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
            
        this.removeParticipantComponent(jsonMessage.userName);
        
        console.log("/ Room.onRemoveParticipant");
        console.log("* " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    private removeParticipantComponent(userName: string): void{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`* Room.removeParticipantComponent: ${userName}`);
        this.closeParticipant(userName);
        this.deleteUser(userName);
        console.log(`/ Room.removeParticipantComponent`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        
    }
    
    
    
    
    private closeParticipant(userName:string): void{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`* Room.closeParticipant: ${userName}`);
        let participant = this.getParticipant(userName);
        participant.dispose();
        console.log(`* Room.closeParticipant`);
         console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
       
    }
    
    
    private getParticipant (userName: string): ParticipantComponent{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`* Room.getParticipant: ${userName}`);
        let participant = this.participants._results.filter(participant => participant.id === userName)[0];
        
        console.log(`* Room.getParticipant`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        return participant;    
    }
    
    private deleteUser(userName: string): void{
        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`* Room.deleteUser: ${userName}`);
        console.log(`users before: ${JSON.stringify(this.users)}`);
        let index = this.getIndexOfUser(userName);
        this.users.splice(index,1);
        console.log(`users after: ${JSON.stringify(this.users)}`);
        console.log(`/ Room.deleteUser`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
        
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
       console.log("");
       console.log("* " + new Date().toLocaleTimeString());
       console.log(`* Room.removeAllParticipants`);
       this.participants._results.map(participant => participant.dispose());
       this.users.length = 0;
       console.log(`/ Room.removeAllParticipants`);
       console.log("/ " + new Date().toLocaleTimeString());
       console.log("");
            

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






