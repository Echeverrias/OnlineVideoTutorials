import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { HandlerService } from './../../core/handler.service';
import { UserService } from './../../core/user.service';
import { ConnectionService } from './../../core/connection.service';

import { IUser, User } from './../../models/user';
import { UserFactory } from './../../models/userFactory';
import { WSMessage, IdMessage, ParticipantInfo, Message } from './../../models/types';


type UserMessage = { userName: string, userType: string, name: string } & IdMessage;
type UserNameMessage = { userName: string, user } & IdMessage;
type ParticipantMessage = ParticipantInfo & IdMessage;

// Messages to the server
const WS_MSG_ID_JOIN_ROOM: string = 'joinRoom';
const WS_MSG_ID_EXIT_ROOM: string = 'exitRoom';

// Messages from the server
const WS_MSG_ID_EXISTING_PARTICIPANTS: string = 'theseAreTheParticipants';
const WS_MSG_ID_NEW_PARTICIPANT: string = 'thereIsANewParticipant';
const WS_MSG_ID_PARTICIPANT_DEPARTURE: string = 'aParticipantHasLeftTheRoom';
// const WS_MSG_ID_EXISTING_PARTICIPANT: string = 'thereIsAParticipant';

@Injectable()
export class RoomService {
   /*
   // private mainParticipant: User;
   // private participants: User[];

  

    private eeGetTheParticipants: Subject<IUser[]|User[]>;
    private eeThereIsANewParticipant: Subject<IUser|User>;
   // private eeThereIsANewParticipant: EventEmitter<IUser>;
    private eeAParticipantHasLefTheRoom: EventEmitter<string>;
    
    private mainParticipant$: Subject<User>;
    private participants$: Subject<User[]>;
    */
    
    private participantInfo: ParticipantInfo;
    private availableParticipants$: Subject<IUser[]>;
    private incomingParticipant$: Subject<IUser>;
    private outcomingParticipant$: Subject<string>;

    constructor(private handler: HandlerService, private connection: ConnectionService, private me: UserService){

        /*
      //  this.mainParticipant = new User();
       // this.participants = [];
       
     //  this.mainParticipant$ = new Subject<User>();
      // this.participants$ = new Subject<User[]>();

        this.eeGetTheParticipants = new Subject<IUser[]|User[]>()
        this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANTS, this.eeGetTheParticipants);

        this.eeThereIsANewParticipant = new EventEmitter<IUser>()
        this.handler.attach(WS_MSG_ID_NEW_PARTICIPANT, this.eeThereIsANewParticipant);
       // this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANT, this.eeThereIsANewParticipant);
       
       this.eeAParticipantHasLefTheRoom = new EventEmitter<string>()
       this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.eeAParticipantHasLefTheRoom);
       //.subscribe((participantName: string): void => { this.onRemoveParticipant(participantName) });
      */
        
    /*

    this.eeAParticipantHasLefTheRoom = new EventEmitter<string>()
            .subscribe((participantName: string): void => { this.onRemoveParticipant(participantName) });
        this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.eeAParticipantHasLefTheRoom);

        this.eeThereIsANewParticipant = new EventEmitter<IUser>()
            .subscribe((participant: IUser): void => { console.log('thereIsANewParticipant: ', participant); this.onAddParticipant(participant) });
            this.handler.attach(WS_MSG_ID_NEW_PARTICIPANT, this.eeThereIsANewParticipant);
           // this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANT, this.eeThereIsANewParticipant);

        this.eeAParticipantHasLefTheRoom = new EventEmitter<string>()
            .subscribe((participantName: string): void => { this.onRemoveParticipant(participantName) });
        this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.eeAParticipantHasLefTheRoom);
*/
       

    }
   
    init(participantInfo: ParticipantInfo){
        this.participantInfo = participantInfo;
       // this.connection.sendWSMessage(WS_MSG_ID_JOIN_ROOM, participantInfo);   
    }
  
    // Prueba
    getParticipants(): Observable<IUser[]>{
        this.availableParticipants$ = new Subject<IUser[]|User[]>()
        this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANTS, this.availableParticipants$);
        this.connection.sendWSMessage(WS_MSG_ID_JOIN_ROOM,this. participantInfo);
        return this.availableParticipants$.asObservable();
    }

    // Prueba
    getIncomingParticipant(): Observable<IUser | User>{
        this.incomingParticipant$ = new Subject<IUser>()
        this.handler.attach(WS_MSG_ID_NEW_PARTICIPANT, this.incomingParticipant$);
        return this.incomingParticipant$.asObservable();
    }

    // Prueba
    getOutcomingParticipant(): Observable<string>{
        this.outcomingParticipant$ = new Subject<string>()
        this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.outcomingParticipant$);
        return this.outcomingParticipant$.asObservable();
    }

    destroy(): void {
        console.log("");
        console.log(`<- RoomService.destroy: ${this.participantInfo.room.id} ${new Date().toLocaleTimeString()}`);
        /** 
        let jsonMessage: ParticipantMessage = Object.assign(this.me.getMyInfo(), {id: "exitRoom"});
        console.log(jsonMessage);
        this.connection.sendMessage(jsonMessage);
        */
        this.handler.detach(WS_MSG_ID_EXISTING_PARTICIPANTS);
        this.handler.detach(WS_MSG_ID_NEW_PARTICIPANT);
        this.handler.detach(WS_MSG_ID_PARTICIPANT_DEPARTURE);
        this.connection.sendWSMessage(WS_MSG_ID_EXIT_ROOM, this.participantInfo);
        console.log(`/ RoomService.destroy ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    
    /*
    getParticipants2(): Subject<User[]>{
        console.log("");
        console.log(`* Room.lookingForParticipants ${new Date().toLocaleTimeString()}`);

        /*
        let jsonMessage: any = {
            id: "joinRoom",
            roomId: +this.roomId,
            userName: this.me.userName,
            userType: this.me.userType,
            name: this.me.name
        };

        this.connection.sendMessage(jsonMessage);
        //

        console.log(this.participants);
        console.log(`/ Room.lookingForParticipants ${new Date().toLocaleTimeString()}`);
        console.log("");
        return this.participants$;
    }
*/
/*
    getMainParticipant(): Subject<User>{
        return this.mainParticipant$;
    }
    
    onAddParticipant(participant: IUser): void {
        console.log("");
        console.log(`* <- Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log(`<- message: ${JSON.stringify(participant)}`);
        console.log(this.participants);
        
        if(this.participants.length == 0){
            this.participants$.next(this.participants); 
        }

        let user: User = UserFactory.createAnUser(participant);;
        console.log(user);
        
        // My video will be the last 
        if (user.userName === this.me.userName) {
            this.participants.push(user);
            console.log("It's me")
        }
        else {
            console.log(`A new participant created: ${JSON.stringify(user)}`);
            if (user.isATutor() || (this.me.amIATutor() && !this.mainParticipant.exist())) {
                console.log(`Am I a tutor?: ${this.me.amIATutor()}`);
                console.log(`Is the new user a tutor?: ${user.isATutor()}`);
                this.mainParticipant.set(user);
                this.mainParticipant$.next(this.mainParticipant);
            }
            else {
                console.log(`Is the new user a student?: ${user.isAStudent()}`);
                this.participants.splice(this.participants.length - 1, 0, user);
            }

        }  
        console.log(this.participants);
        console.log(`/ Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onAddParticipant2(msg: UserMessage): void {
        console.log("");
        console.log(`* <- Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log(`<- message: ${JSON.stringify(msg)}`);
        console.log(this.participants);
        
        if(this.participants.length == 0){
            this.participants$.next(this.participants); 
        }

        let user: User = UserFactory.createAnUser2(msg);;
        console.log(user);
        
        // My video will be the last 
        if (user.userName === this.me.userName) {
            this.participants.push(user);
            console.log("It's me")
        }
        else {
            console.log(`A new participant created: ${JSON.stringify(user)}`);
            if (user.isATutor() || (this.me.amIATutor() && !this.mainParticipant.exist())) {
                console.log(`Am I a tutor?: ${this.me.amIATutor()}`);
                console.log(`Is the new user a tutor?: ${user.isATutor()}`);
                this.mainParticipant.set(user);
                this.mainParticipant$.next(this.mainParticipant);
            }
            else {
                this.participants.splice(this.participants.length - 1, 0, user);
            }

        }  
        console.log(this.participants);
        console.log(`/ Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    onRemoveParticipant(userName: string): void {
        console.log("");
        console.log(`* RoomService.onRemoveParticipant: ${userName} ${new Date().toLocaleTimeString()}`);
        console.log(`users before: ${JSON.stringify(this.participants)}`);
        
        
        if (this.mainParticipant.userName === userName) {
            this.mainParticipant.setToUndefined();
        }
        else {
            let index = this.getIndexOfParticipant(userName);
            this.participants.splice(index, 1);
        }

        console.log(`users after: ${JSON.stringify(this.participants)}`);
        console.log(`/ RoomService.onRemoveParticipant ${new Date().toLocaleTimeString()}`);
        console.log("");

    }

    private getIndexOfParticipant(userName: string): number{
       let index = 0;
       let i = index;
       let length = this.participants.length;
       let found = false;
       
       while (!found && i < length){
           if (this.participants[i].userName === userName){
               found = true;
               index = i;
           }
           else {
               i++;
           }
       }

       if (!found){
           index = length;
       }
       
       return index;
    }

    onExit(): void {
        console.log("");
        console.log(`<- RoomService.onExit: ${this.participantInfo.room.id} ${new Date().toLocaleTimeString()}`);
        /*
        let jsonMessage: ParticipantMessage = Object.assign(this.me.getMyInfo(), {id: "exitRoom"});
        console.log(jsonMessage);
        this.connection.sendMessage(jsonMessage);
        //
        this.connection.sendWSMessage(WS_MSG_ID_EXIT_ROOM, this.participantInfo);
        console.log(`/ RoomService.onExitOfRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    destroy(){
        this.eeThereIsANewParticipant.unsubscribe();
        this.eeAParticipantHasLefTheRoom.unsubscribe();
        this.removeAllParticipants();
    }

    private removeAllParticipants(): void {
        console.log("");
        console.log(`* RoomService.removeAllParticipants ${new Date().toLocaleTimeString()}`);

        this.mainParticipant.setToUndefined();
        this.participants.length = 0;

        console.log(`/ RoomService.removeAllParticipants ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

   */
   

    
    
}