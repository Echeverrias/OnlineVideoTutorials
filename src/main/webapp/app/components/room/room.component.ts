/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, ViewChildren, OnDestroy, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Connection } from '../../services/connection';
import { MyService } from '../../services/myService';

import { ParticipantComponent } from '../participant/participant.component';

import { User } from '../../services/user';
import { UserFactory } from '../../services/userFactory';

import { roomTemplate } from './room.html'

@Component({
    moduleId: module.id,
    selector: 'room',
    styleUrls: ["../../../assets/styles/main.css", "room.css"],
    template: roomTemplate
})

export class RoomComponent implements OnInit, OnDestroy{
    
    @ViewChildren(ParticipantComponent) participants: QueryList<ParticipantComponent>;
    
    private name: string;
    private address: string;
    private users: User[];
    
    private onParticipantLessSubscription: Object;
    private onParticipantInRoomSubscription: Object;
    private onVideoResponseSubscription: Object;
    private onIceCandidateSubscription: Object;
    

    constructor(private router: Router, private connection: Connection, private appService: MyService, private route: ActivatedRoute) {
      
      console.log("");
      console.log(`% Room constructor ${new Date().toLocaleTimeString()}`);
      
      this.address = "/" + this.name;
      this.users = [];

      
      console.log(this.users);
      console.log(`/ Room constructor ${new Date().toLocaleTimeString()}`);
      console.log("");
    }
    
    ngOnInit(){

      this.route.params.forEach((params:Params) => {
          this.name = params['roomName'];
        });
      
      this.onParticipantLessSubscription = this.connection.subscriptions.subscribeToParticipantLess(this, this.onRemoveParticipant);
      this.onParticipantInRoomSubscription = this.connection.subscriptions.subscribeToParticipantInRoom(this, this.onAddParticipant);
      this.onVideoResponseSubscription = this.connection.subscriptions.subscribeToVideoAnswer(this, this.onReceiveVideoResponse);
      this.onIceCandidateSubscription = this.connection.subscriptions.subscribeToIceCandidate(this, this.onAddIceCandidate);
      
      this.lookingForParticipants();
      
    }
    
    private lookingForParticipants():void{
         console.log("");
         console.log(`* Room.lookingForParticipants ${new Date().toLocaleTimeString()}`);
        
            var jsonMessage = {
                id:"joinRoom",
                roomName: this.name,
                userName: this.appService.myUserName,
                userType: this.appService.myUserType,
                name: this.appService.myName
            };

            this.connection.sendMessage(jsonMessage);
            
        console.log(this.users);
        console.log(`/ Room.lookingForParticipants ${new Date().toLocaleTimeString()}`);  
        console.log("");
          
    }

    onAddParticipant(jsonMessage: Object): void {
        console.log("");
        console.log(`* <- Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
        console.log(this.users);

        let user: User;

        if (jsonMessage.userName === this.appService.myUserName) {
            user = this.appService.getMe();
            console.log("It's me")
        }
        else {
            user = UserFactory.createAnUser(jsonMessage);
            console.log("A new participant created")
        }

        this.users.push(user);

        console.log(this.users);
        console.log(`/ Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    onReceiveVideoResponse(jsonMessage: Object): void{
        console.log("");
        console.log(`<- Room.onReceiveVideoResponse ${new Date().toLocaleTimeString()}`);
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
        
        let userName = jsonMessage.userName;
        let sdpAnswer = jsonMessage.sdpAnswer;
        
        let participant = this.getParticipant(userName);
        
        console.log(`participant:`);
        console.log(participant);
        
        participant.receiveVideoResponse(sdpAnswer);
        
        console.log(`/ Room.onReceiveVideoResponse ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    onAddIceCandidate(jsonMessage: Object): void{
        console.log("");
        console.log(`<- Room.onIceCandidate ${new Date().toLocaleTimeString()}`);
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
        
        let userName = jsonMessage.userName;
        let candidate = jsonMessage.candidate;

        let participant = this.getParticipant(userName);
        
        console.log(`participant:`);
        console.log(participant);
        
        participant.addIceCandidate(candidate);
        
        console.log(`/ Room.onIceCandidate`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");
    }
    
    onRemoveParticipant (jsonMessage: Object): void {
        console.log("");
        console.log(`<- Room.onRemoveParticipant - name: ${jsonMessage.userName} ${new Date().toLocaleTimeString()}`)
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
        
        this.removeParticipantComponent(jsonMessage.userName);
        
        console.log("/ Room.onRemoveParticipant ${new Date().toLocaleTimeString()}");
        console.log("");
    }
    
    private removeParticipantComponent(userName: string): void{
        console.log("");
        console.log(`* Room.removeParticipantComponent: ${userName} ${new Date().toLocaleTimeString()}`);
        
        this.closeParticipant(userName);
        this.deleteUser(userName);
        
        console.log(`/ Room.removeParticipantComponent ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    private closeParticipant(userName:string): void{
        console.log("");
        console.log(`* Room.closeParticipant: ${userName} ${new Date().toLocaleTimeString()}`);
        
        let participant = this.getParticipant(userName);
        participant.dispose();
        
        console.log(`/ Room.closeParticipant ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    private getParticipant (userName: string): ParticipantComponent{
        console.log("");
        console.log(`* Room.getParticipant: ${userName} of ...  ${new Date().toLocaleTimeString()}`);
        console.log(this.participants);
      
        let participant = this.participants._results.filter(participant => participant.id === userName)[0];
      
        console.log(`/ Room.getParticipant -> ${participant.userName} ${new Date().toLocaleTimeString()}`);
        console.log("");
        return participant;    
    }
    
    private deleteUser(userName: string): void{
        console.log("");
        console.log(`* Room.deleteUser: ${userName} ${new Date().toLocaleTimeString()}`);
        console.log(`users before: ${JSON.stringify(this.users)}`);
        
        let index = this.getIndexOfUser(userName);
        this.users.splice(index,1);
        
        console.log(`users after: ${JSON.stringify(this.users)}`);
        console.log(`/ Room.deleteUser ${new Date().toLocaleTimeString()}`);
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

    
    onExitOfRoom(): void {
        console.log("");
        console.log(`<- Room.onExitOfRoom: ${this.name} ${new Date().toLocaleTimeString()}`);


        let jsonMessage = {
            id: "exitRoom",
            roomName: this.name,
            userName: this.appService.myUserName,
            userType: this.appService.myUserType,
        }

        this.connection.sendMessage(jsonMessage);

        this.removeAllParticipants();

        if (this.appService.amAStudent()) {
            this.router.navigate(['/rooms']);
        }
        else {
           this.router.navigate(['/login']);
        }

        console.log(`/ Room.onExitOfRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    
    removeAllParticipants(): void{
       console.log("");
       console.log(`* Room.removeAllParticipants ${new Date().toLocaleTimeString()}`);
       
       this.participants._results.map(participant => participant.dispose());
       this.users.length = 0;
       
       console.log(`/ Room.removeAllParticipants ${new Date().toLocaleTimeString()}`);
       console.log("");
    }
   
    ngOnDestroy(){
       console.log(`* Room.OnDestroy ${new Date().toLocaleTimeString()}`);
        
      this.onParticipantLessSubscription.unsubscribe();
      this.onParticipantInRoomSubscription.unsubscribe();
      this.onVideoResponseSubscription.unsubscribe();
      this.onIceCandidateSubscription.unsubscribe();
    }
   
}