import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { HandlerService } from './../../services/handler.service';
import { UserService } from './../../services/user.service';
import { ConnectionService } from './../../services/connection.service';

import { User } from './../../models/user';
import { UserFactory } from './../../models/userFactory';
import { IdMessage, ParticipantInfo, Message } from './../../models/types';


type UserMessage = { userName: string, userType: string, name: string } & IdMessage;
type UserNameMessage = { userName: string, user } & IdMessage;
type ParticipantMessage = ParticipantInfo & IdMessage;;

@Injectable()
export class RoomService {

    private mainParticipant: User;
    private participants: User[];

    private roomId: string;

    private eeThereIsANewParticipant: EventEmitter<Message>;
    private eeAParticipantHasLefTheRoom: EventEmitter<Message>;
    
    private mainParticipantObserver: Subject<User>;
    private participantsObserver: Subject<User[]>;

    constructor(private handler: HandlerService, private connection: ConnectionService, private me: UserService){
        
        this.mainParticipantObserver = new Subject<User>();
        this.participantsObserver = new Subject<User[]>();
        
        this.mainParticipant = new User();
        this.participants = [];

        this.eeThereIsANewParticipant = new EventEmitter<Message>()
            .subscribe((data: UserMessage): void => { this.onAddParticipant(data) });
        this.handler.attach('thereIsANewParticipant', this.eeThereIsANewParticipant);
        this.handler.attach('thereIsAParticipant', this.eeThereIsANewParticipant);

        this.eeAParticipantHasLefTheRoom = new EventEmitter<Message>()
            .subscribe((data: UserNameMessage): void => { this.onRemoveParticipant(data) });
        this.handler.attach('aParticipantHasLeftTheRoom', this.eeAParticipantHasLefTheRoom);
    }

    init(roomId: string){
        this.roomId = roomId;
       // this.me.myCurrentRoomId = roomId; //*
    }

    getParticipants(): Subject<User[]>{
        console.log("");
        console.log(`* Room.lookingForParticipants ${new Date().toLocaleTimeString()}`);

        let jsonMessage: any = {
            id: "joinRoom",
            roomId: +this.roomId,
            userName: this.me.userName,
            userType: this.me.userType,
            name: this.me.name
        };

        this.connection.sendMessage(jsonMessage);

        console.log(this.participants);
        console.log(`/ Room.lookingForParticipants ${new Date().toLocaleTimeString()}`);
        console.log("");
        return this.participantsObserver;
    }

    getMainParticipant(): Subject<User>{
        return this.mainParticipantObserver;
    }
    
    onAddParticipant(msg: UserMessage): void {
        console.log("");
        console.log(`* <- Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log(`<- message: ${JSON.stringify(msg)}`);
        console.log(this.participants);
        
        if(this.participants.length == 0){
            this.participantsObserver.next(this.participants); 
        }

        let user: User = UserFactory.createAnUser(msg);;
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
                this.mainParticipantObserver.next(this.mainParticipant);
            }
            else {
                this.participants.splice(this.participants.length - 1, 0, user);
            }

        }  
        console.log(this.participants);
        console.log(`/ Room.onAddParticipant ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    onRemoveParticipant(msg: UserNameMessage): void {
        console.log("");
        console.log(`* RoomService.onRemoveParticipant: ${msg.userName} ${new Date().toLocaleTimeString()}`);
        console.log(`users before: ${JSON.stringify(this.participants)}`);
        
        let userName = msg.userName;
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
        console.log(`<- RoomService.onExit: ${this.roomId} ${new Date().toLocaleTimeString()}`);
        
        let jsonMessage: ParticipantMessage = Object.assign(this.me.getMyInfo(), {id: "exitRoom"});
        console.log(jsonMessage);
        this.connection.sendMessage(jsonMessage);
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


   

    
    
}