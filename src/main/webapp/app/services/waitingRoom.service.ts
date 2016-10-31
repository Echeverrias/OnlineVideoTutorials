import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Connection } from './connection';
import { HandlerService } from './handler.service';
import { MyService } from './myService';

type RoomMessage = { roomName: string }
type availableRoomsMessage = { availableRoomsNames: string [] }

@Injectable()
export class WaitingRoomService {

    private availableRoomsNames: string[];
    private eeAvailableRooms: EventEmitter;
    private eeThereIsANewRooms: EventEmitter;
    private eeThereIsAnAvailableRoomLess: EventEmitter;

    private availableRoomsObserver: Subject<string[]>;

    constructor(private connection: Connection, private handler: HandlerService, private me: MyService){
        console.log("*WaitingRoomService constructor");

        this.availableRoomsObserver = new Subject<string[]>();

        this.eeAvailableRooms = new EventEmitter();
        this.eeAvailableRooms.subscribe(data => this.onSetAvailableRooms(data));
        this.handler.attach('availableRooms', this.eeAvailableRooms);

        this.eeThereIsANewRooms = new EventEmitter();
        this.eeThereIsANewRooms.subscribe(data => this.onAddAvailableRoom(data));
        this.handler.attach('thereIsANewRoom', this.eeThereIsANewRooms);

        this.eeThereIsAnAvailableRoomLess = new EventEmitter();
        this.eeThereIsAnAvailableRoomLess.subscribe(data => this.onRemoveAvailableRoom(data));
        this.handler.attach('thereIsAnAvailableRoomLess', this.eeThereIsAnAvailableRoomLess);
    }

    init(){
       this.enter();
    }

    private enter(): void {
        console.log("");
        console.log(`* <- WaitingRoomService.lookingForRooms ${new Date().toLocaleTimeString()}`);

        var jsonMessage = {
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

    onSetAvailableRooms(msg: availableRoomsMessage): void{
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

        var jsonMessage = {
            id: "exitWaitingRoom",
            userName: this.me.myUserName
        };

        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);
        console.log("");

    }
    
}