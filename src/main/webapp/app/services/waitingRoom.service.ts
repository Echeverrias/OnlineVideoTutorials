import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConnectionService } from './connection.service';
import { HandlerService } from './handler.service';
import { UserService } from './user.service';

import { Message } from '../models/types';
import { IdMessage } from '../models/types';


type RoomMessage = { roomName: string } & IdMessage;
type AvailableRoomsMessage = { availableRoomsNames: string[] } & IdMessage;
type UserNameMessage = { userName: string } & IdMessage;

@Injectable()
export class WaitingRoomService {

    private availableRoomsNames: string[];
    private eeAvailableRooms: EventEmitter<Message>;
    private eeThereIsANewRooms: EventEmitter<Message>;
    private eeThereIsAnAvailableRoomLess: EventEmitter<Message>;

    private availableRoomsObserver: Subject<string[]>;

    constructor(private connection: ConnectionService, private handler: HandlerService, private me: UserService){
        console.log("*WaitingRoomService constructor");

        this.availableRoomsObserver = new Subject<string[]>();

        this.eeAvailableRooms = new EventEmitter<Message>();
        this.eeAvailableRooms.subscribe((data: AvailableRoomsMessage): void => { this.onSetAvailableRooms(data) });
        this.handler.attach('availableRooms', this.eeAvailableRooms);

        this.eeThereIsANewRooms = new EventEmitter<Message>();
        this.eeThereIsANewRooms.subscribe((data: RoomMessage): void => { this.onAddAvailableRoom(data) });
        this.handler.attach('thereIsANewRoom', this.eeThereIsANewRooms);

        this.eeThereIsAnAvailableRoomLess = new EventEmitter<Message>();
        this.eeThereIsAnAvailableRoomLess.subscribe((data: RoomMessage): void => { this.onRemoveAvailableRoom(data) });
        this.handler.attach('thereIsAnAvailableRoomLess', this.eeThereIsAnAvailableRoomLess);
    }

    init(){
       this.enter();
    }

    private enter(): void {
        console.log("");
        console.log(`* <- WaitingRoomService.lookingForRooms ${new Date().toLocaleTimeString()}`);

        let jsonMessage: UserNameMessage = {
            id:"enterWaitingRoom",
            userName: this.me.myUserName
        };
        

        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoomService.lookingForRooms ${new Date().toLocaleTimeString()}`);
        console.log("");
        
    }

    getAvailableRooms(): Subject<string[]> {
        console.log(`* WaitingRoomService.getavailableRooms`);
        return this.availableRoomsObserver;
    }

    onSetAvailableRooms(msg: AvailableRoomsMessage): void{
        console.log("");
        console.log(`* WaitingRoomService.onSetavailableRooms ${new Date().toLocaleTimeString()}`);
        console.log(msg.availableRoomsNames);
        
        this.availableRoomsNames = msg.availableRoomsNames;
        this.availableRoomsObserver.next(this.availableRoomsNames);
        
        console.log(`/ WaitingRoomService.onSetavailableRooms ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onAddAvailableRoom (msg: RoomMessage){
        console.log("");
        console.log(`* <- WaitingRoomService.onAddavailableRoom: ${msg.roomName} to ${this.availableRoomsNames} ${new Date().toLocaleTimeString()}`)
        
        this.availableRoomsNames.push(msg.roomName);  
        
        console.log(`this.availableRooms: ${this.availableRoomsNames} `)
        console.log(`/WaitingRoomService.onAddavailableRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    };
    
    onRemoveAvailableRoom (msg: RoomMessage){
        console.log("");
        console.log(`* <- WaitingRoomService.onRemoveavailableRoom : ${msg.roomName} ${new Date().toLocaleTimeString()}`); 
         
        let i = this.availableRoomsNames.indexOf(msg.roomName);
        this.availableRoomsNames.splice(i,1);
        
        console.log(`this.availableRooms: ${this.availableRoomsNames}`);
        console.log(`/ WaitingRoomService.onRemoveavailableRoom : ${msg.roomName} ${new Date().toLocaleTimeString()}`);
        console.log("");
    };

    destroy(){

        this.exit();
        this.eeAvailableRooms.unsubscribe();
        this.eeThereIsANewRooms.unsubscribe();
        this.eeThereIsAnAvailableRoomLess.unsubscribe();
    }

    private exit(): void {
        console.log("");
        console.log(`* <- WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);

        let jsonMessage: UserNameMessage = {
            id: "exitWaitingRoom",
            userName: this.me.myUserName
        };

        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);
        console.log("");

    }
    
}