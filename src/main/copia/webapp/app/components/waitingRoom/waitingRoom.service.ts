import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ConnectionService } from './../../services/connection.service';
import { HandlerService } from './../../services/handler.service';

import { UserInfoMessage, IdMessage, Message, WSMessage } from './../../models/types';
import { IRoom, Room } from './../../models/room';
import { IUserInfo } from './../../models/user';

type RoomMessage = { roomName: string } & IdMessage;
type AvailableRoomsMessage = { availableRooms: Room[] } & IdMessage;

const CREATE_ROOM_ENDPOINT = '/create_room';
const SUBSCRIPTION_ENDPOINT = '/created_room';

@Injectable()
export class WaitingRoomService {

    private eeThereIsANewRoom: EventEmitter<Message>; //* sustituido por suscripcion stomp

    private availableRooms: IRoom[];
    private eeAvailableRooms: EventEmitter<Message>;
    private eeThereIsAnAvailableRoomLess: EventEmitter<Message>;

    private availableRooms$: Subject<IRoom[]>;

    private stompClient: any;
    private subscription: any; 
    private shippingAddress: string = `${SUBSCRIPTION_ENDPOINT}`; 

    constructor(private http: Http, private connection: ConnectionService, private handler: HandlerService){
        console.log("*WaitingRoomService constructor");
        this.availableRooms$ = new Subject<IRoom[]>();
        
    }

    initAsStudent(user: IUserInfo){
        console.log("WRService.inisAsStudent: ", user);
        this.eeThereIsAnAvailableRoomLess = new EventEmitter<Message>()
            .subscribe((data: WSMessage): void => { this.onRemoveAvailableRoom(data.payload) });
        this.handler.attach('thereIsunAvailableRoomLess', this.eeThereIsAnAvailableRoomLess);
    
        //* sustituido po suscripcion stomp
        this.eeThereIsANewRoom = new EventEmitter<Message>()
            .subscribe((data: WSMessage): void => { this.onAddAvailableRoom(data.payload) });
       this.handler.attach('thereIsANewRoom', this.eeThereIsANewRoom);
       
       this.stompClient = this.connection.stompOverWsClient;
       this.subscription = this.stompClient.subscribe(this.shippingAddress, this.getOnSubscription());
      
       this.init(user);
    }

    initAsTutor(user: IUserInfo){
        console.log("WRService.inisAsTutor: ", user);
        this.init(user);
    }    

    private init(user: IUserInfo){
        this.eeAvailableRooms = new EventEmitter<Message>()
            .subscribe((data: WSMessage): void => { this.onSetAvailableRooms(data.payload) });
        this.handler.attach('availableRooms', this.eeAvailableRooms);
        this.enter(user); 
    }

    private enter(user: IUserInfo): void {
        console.log("");
        console.log(`* <- WaitingRoomService.lookingForRooms ${new Date().toLocaleTimeString()}`);

        let jsonMessage: UserInfoMessage = Object.assign({ id: "enterWaitingRoom" }, user);
        console.log(jsonMessage);
        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoomService.lookingForRooms ${new Date().toLocaleTimeString()}`);
        console.log("");
        
    }

    private getOnSubscription(): any{
        let onSubscription = (message) => {
            console.log(`Msg received: ${message}`);
            this.onAddAvailableRoom(JSON.parse(message.body));
        }

        return onSubscription;
    }


    getAvailableRooms(): Subject<IRoom[]> {
        console.log(`* WaitingRoomService.getAvailableRooms`);
        return this.availableRooms$;
    }

    onSetAvailableRooms(availableRooms: IRoom []): void{
        console.log("");
        console.log(`* WaitingRoomService.onSetAvailableRooms ${new Date().toLocaleTimeString()}`);
        console.log("availableRooms:", availableRooms);
        
        this.availableRooms = availableRooms.slice(0);
        this.availableRooms$.next(this.availableRooms);
        
        console.log(`/ WaitingRoomService.onSetAvailableRooms ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onAddAvailableRoom (room: IRoom){
        console.log("");
        console.log(`* <- WaitingRoomService.onAddavailableRoom: ${room.name} to ${this.availableRooms} ${new Date().toLocaleTimeString()}`)
        console.log(`room: `, room);
        
        this.availableRooms.push(room);  
        
        console.log(`this.availableRooms: ${this.availableRooms} `)
        console.log(`/WaitingRoomService.onAddavailableRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    };
    
    onRemoveAvailableRoom (roomId: number){
        console.log("");
        console.log(`* <- WaitingRoomService.onRemoveavailableRoom : ${roomId} ${new Date().toLocaleTimeString()}`); 
         
        let i = this.availableRooms.findIndex(r => r.id == roomId);
        this.availableRooms.splice(i,1);
        
        console.log(`this.availableRooms: ${this.availableRooms}`);
        console.log(`/ WaitingRoomService.onRemoveavailableRoom : ${roomId} ${new Date().toLocaleTimeString()}`);
        console.log("");
    };

    createRoom(roomName: string, tutorName): Observable<IRoom>{
        let room: Room = new Room(roomName, tutorName);
        return this.retrieveRoom(room.json());
    }

    retrieveRoom(room: IRoom): Observable<IRoom>{
        return this.http.post(CREATE_ROOM_ENDPOINT, room)
            .map((response: Response) => {
                console.log('WaitingRoomService.retrieveRoom: ', response);
                return response.json();
            })
    }

    destroyAsStudent(user: IUserInfo){
        console.log("WRService.destroyAsStudent: ", user);
        this.destroy(user);
        this.eeThereIsAnAvailableRoomLess.unsubscribe();
        this.subscription.unsubscribe();
        this.eeThereIsANewRoom.unsubscribe(); //*
    }

    destroyAsTutor(user: IUserInfo){
        console.log("WRService.destroyAsTutor: ", user);
        this.destroy(user);
    }

    private destroy(user: IUserInfo){
        this.exit(user);
        this.eeAvailableRooms.unsubscribe();
    }

    private exit(user: IUserInfo): void {
        console.log("");
        console.log(`* <- WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);

        let jsonMessage: UserInfoMessage = Object.assign({id: "exitWaitingRoom"}, user);
        console.log('user exit message: ', jsonMessage);
        this.connection.sendMessage(jsonMessage);
        console.log(`/ WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);
        console.log("");

    }
    
}