import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ConnectionService } from './../../core/connection.service';
import { HandlerService } from './../../core/handler.service';

import { UserInfoMessage, IdMessage, Message, WSMessage } from './../../models/types';
import { IRoom, Room } from './../../models/room';
import { IUserInfo } from './../../models/user';

//type RoomMessage = { roomName: string } & IdMessage;
//type AvailableRoomsMessage = { availableRooms: Room[] } & IdMessage;

const CREATE_ROOM_ENDPOINT = '/create_room';
const SUBSCRIPTION_CREATED_ROOM_ENDPOINT = '/created_room';
const SUBSCRIPTION_ELIMINATED_ROOM_ENDPOINT = '/eliminated_room';

// Messages to the server
const WS_MSG_ID_ENTER_WAITING_ROOM: string = 'enterWaitingRoom';
const WS_MSG_ID_EXIT_WAITING_ROOM: string = 'exitWaitingRoom';

// Messages from the server
const WS_MSG_ID_AVAILABLE_ROOMS: string = 'availableRooms';

@Injectable()
export class WaitingRoomService {

    private user: IUserInfo;

    private availableRooms: IRoom[];
    private availableRooms$: Subject<IRoom[]>;

    private stompClient: any;
    private createdRoomSubscription: any; 
    private eliminatedRoomSubscription: any;  


    constructor(private http: Http, private connection: ConnectionService, private handler: HandlerService){
        console.log("*WaitingRoomService constructor");
        this.availableRooms = [];
        
    }

    init(user: IUserInfo) {
        console.log('WaitingRoom.init()');
        console.log(user);
        this.user = user;
    }

    initSubscription(){
        console.log("WaitingRoomService.initSubscription()");
        this.stompClient = this.connection.stompOverWsClient;
        this.createdRoomSubscription = this.stompClient.subscribe(SUBSCRIPTION_CREATED_ROOM_ENDPOINT, this.getOnCreatedRoomSubscription());
        this.eliminatedRoomSubscription = this.stompClient.subscribe(SUBSCRIPTION_ELIMINATED_ROOM_ENDPOINT, this.getOnEliminatedRoomSubscription());
      
      }

    // stomp
    private getOnCreatedRoomSubscription(): any{
        let onSubscription = (message) => {
            console.log(`Msg received: ${message}`);
            this.onAddAvailableRoom(JSON.parse(message.body));
        }

        return onSubscription;
    }

    // stomp
    private getOnEliminatedRoomSubscription(): any{
        let onSubscription = (message) => {
            console.log(`Msg received: ${message}`);
            this.onRemoveAvailableRoom(JSON.parse(message.body));
        }

        return onSubscription;
    }

    private onAddAvailableRoom (room: IRoom){
        console.log("");
        console.log(`* <- WaitingRoomService.onAddavailableRoom: ${room.name} to ${this.availableRooms} ${new Date().toLocaleTimeString()}`)
        console.log(`room: `, room)
        console.log(this.availableRooms);
        this.availableRooms.push(room); 
        this.availableRooms$.next(this.availableRooms);
        console.log(this.availableRooms);
        console.log(`/WaitingRoomService.onAddavailableRoom ${new Date().toLocaleTimeString()}`);
        console.log("");
    };
    
    private onRemoveAvailableRoom (room: IRoom){
        console.log("");
        console.log(`* <- WaitingRoomService.onRemoveavailableRoom : ${room.id} ${new Date().toLocaleTimeString()}`); 
        let roomId: number = room.id;
        console.log(this.availableRooms);
        let i = this.availableRooms.findIndex(r => r.id == roomId);
        this.availableRooms.splice(i,1);
        console.log(this.availableRooms);
        this.availableRooms$.next(this.availableRooms); 
        
        console.log(`this.availableRooms: ${this.availableRooms}`);
        console.log(`/ WaitingRoomService.onRemoveavailableRoom : ${roomId} ${new Date().toLocaleTimeString()}`);
        console.log("");
    };

    getAvailableRooms(): Observable<IRoom[]> {
        console.log(`* WaitingRoomService.getAvailableRooms`);
    
        this.availableRooms$ = new Subject<IRoom[]>();
        this.handler.attach(WS_MSG_ID_AVAILABLE_ROOMS, this.availableRooms$);
        this.connection.sendWSMessage(WS_MSG_ID_ENTER_WAITING_ROOM, this.user);
        console.log(this.availableRooms);
        return this.availableRooms$.asObservable()
        .map((availableRooms: IRoom[]): IRoom[] => {
            console.log('map');
            this.availableRooms = availableRooms.slice(0);
            console.log(this.availableRooms);
            return this.availableRooms;
        });
    }

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
   
    destroy(): void {
        console.log("");
        console.log(`* <- WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);

        this.connection.sendWSMessage(WS_MSG_ID_EXIT_WAITING_ROOM, this.user);
        this.handler.detach(WS_MSG_ID_AVAILABLE_ROOMS);
        this.availableRooms.length = 0;
        if (this.stompClient) {
            this.destroySubscription();    
        }    
        console.log(`/ WaitingRoomService.exit ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    private destroySubscription(){
        console.log('WaitingRoom.destroySubscription()');
        try{
            this.createdRoomSubscription.unsubscribe();
            this.eliminatedRoomSubscription.unsubscribe();
        } catch(e) {
            console.log(e);
        }    
    }


}