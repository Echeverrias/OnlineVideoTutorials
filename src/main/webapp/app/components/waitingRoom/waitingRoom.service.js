"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var connection_service_1 = require("./../../services/connection.service");
var handler_service_1 = require("./../../services/handler.service");
var room_1 = require("./../../models/room");
//type RoomMessage = { roomName: string } & IdMessage;
//type AvailableRoomsMessage = { availableRooms: Room[] } & IdMessage;
var CREATE_ROOM_ENDPOINT = '/create_room';
var SUBSCRIPTION_CREATED_ROOM_ENDPOINT = '/created_room';
var SUBSCRIPTION_ELIMINATED_ROOM_ENDPOINT = '/eliminated_room';
// Messages to the server
var WS_MSG_ID_ENTER_WAITING_ROOM = 'enterWaitingRoom';
var WS_MSG_ID_EXIT_WAITING_ROOM = 'exitWaitingRoom';
/* //*
// Messages from the server
const WS_MSG_ID_ROOM_LESS: string = 'thereIsAnAvailableRoomLess';
const WS_MSG_ID_NEW_ROOM: string = 'thereIsANewRoom';
*/
var WaitingRoomService = (function () {
    /* /*
    private eeThereIsAnAvailableRoomLess: EventEmitter<Message>;
    */
    function WaitingRoomService(http, connection, handler) {
        this.http = http;
        this.connection = connection;
        this.handler = handler;
        console.log("*WaitingRoomService constructor");
        this.availableRooms$ = new Subject_1.Subject();
        this.availableRooms = [];
    }
    WaitingRoomService.prototype.initAsStudent = function (user) {
        console.log("WRService.inisAsStudent: ", user);
        /* //*
        // sustituido po suscripcion stomp
        this.eeThereIsAnAvailableRoomLess = new EventEmitter<Message>()
            .subscribe((data: WSMessage): void => { this.onRemoveAvailableRoom2(data.payload) });
        this.handler.attach(WS_MSG_ID_ROOM_LESS, this.eeThereIsAnAvailableRoomLess);
    
       
        this.eeThereIsANewRoom = new EventEmitter<Message>()
            .subscribe((data: WSMessage): void => { this.onAddAvailableRoom(data.payload) });
       this.handler.attach(WS_MSG_ID_NEW_ROOM, this.eeThereIsANewRoom);
       */
        this.stompClient = this.connection.stompOverWsClient;
        this.createdRoomSubscription = this.stompClient.subscribe(SUBSCRIPTION_CREATED_ROOM_ENDPOINT, this.getOnCreatedRoomSubscription());
        this.eliminatedRoomSubscription = this.stompClient.subscribe(SUBSCRIPTION_ELIMINATED_ROOM_ENDPOINT, this.getOnEliminatedRoomSubscription());
        this.init(user);
    };
    WaitingRoomService.prototype.initAsTutor = function (user) {
        console.log("WRService.inisAsTutor: ", user);
        this.init(user);
    };
    WaitingRoomService.prototype.init = function (user) {
        var _this = this;
        this.eeAvailableRooms = new core_1.EventEmitter()
            .subscribe(function (data) { _this.onSetAvailableRooms(data.payload); });
        this.handler.attach('availableRooms', this.eeAvailableRooms);
        this.enter(user);
    };
    WaitingRoomService.prototype.enter = function (user) {
        console.log("");
        console.log("* <- WaitingRoomService.lookingForRooms " + new Date().toLocaleTimeString());
        /**
        let jsonMessage: UserInfoMessage = Object.assign({ id: "enterWaitingRoom" }, user);
        console.log(jsonMessage);
        this.connection.sendMessage(jsonMessage);
        */
        this.connection.sendWSMessage(WS_MSG_ID_ENTER_WAITING_ROOM, user);
        console.log("/ WaitingRoomService.lookingForRooms " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomService.prototype.getOnCreatedRoomSubscription = function () {
        var _this = this;
        var onSubscription = function (message) {
            console.log("Msg received: " + message);
            _this.onAddAvailableRoom(JSON.parse(message.body));
        };
        return onSubscription;
    };
    WaitingRoomService.prototype.getOnEliminatedRoomSubscription = function () {
        var _this = this;
        var onSubscription = function (message) {
            console.log("Msg received: " + message);
            _this.onRemoveAvailableRoom(JSON.parse(message.body));
        };
        return onSubscription;
    };
    WaitingRoomService.prototype.getAvailableRooms = function () {
        console.log("* WaitingRoomService.getAvailableRooms");
        return this.availableRooms$;
    };
    WaitingRoomService.prototype.onSetAvailableRooms = function (availableRooms) {
        console.log("");
        console.log("* WaitingRoomService.onSetAvailableRooms " + new Date().toLocaleTimeString());
        console.log("availableRooms:", availableRooms);
        this.availableRooms = availableRooms.slice(0);
        this.availableRooms$.next(this.availableRooms);
        console.log("/ WaitingRoomService.onSetAvailableRooms " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomService.prototype.onAddAvailableRoom = function (room) {
        console.log("");
        console.log("* <- WaitingRoomService.onAddavailableRoom: " + room.name + " to " + this.availableRooms + " " + new Date().toLocaleTimeString());
        console.log("room: ", room);
        this.availableRooms.push(room);
        console.log("this.availableRooms: " + this.availableRooms + " ");
        console.log("/WaitingRoomService.onAddavailableRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.onRemoveAvailableRoom = function (room) {
        console.log("");
        console.log("* <- WaitingRoomService.onRemoveavailableRoom : " + room.id + " " + new Date().toLocaleTimeString());
        var roomId = room.id;
        var i = this.availableRooms.findIndex(function (r) { return r.id == roomId; });
        this.availableRooms.splice(i, 1);
        console.log("this.availableRooms: " + this.availableRooms);
        console.log("/ WaitingRoomService.onRemoveavailableRoom : " + roomId + " " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.onRemoveAvailableRoom2 = function (roomId) {
        console.log("");
        console.log("* <- WaitingRoomService.onRemoveavailableRoom : " + roomId + " " + new Date().toLocaleTimeString());
        var i = this.availableRooms.findIndex(function (r) { return r.id == roomId; });
        this.availableRooms.splice(i, 1);
        console.log("this.availableRooms: " + this.availableRooms);
        console.log("/ WaitingRoomService.onRemoveavailableRoom : " + roomId + " " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.createRoom = function (roomName, tutorName) {
        var room = new room_1.Room(roomName, tutorName);
        return this.retrieveRoom(room.json());
    };
    WaitingRoomService.prototype.retrieveRoom = function (room) {
        return this.http.post(CREATE_ROOM_ENDPOINT, room)
            .map(function (response) {
            console.log('WaitingRoomService.retrieveRoom: ', response);
            return response.json();
        });
    };
    WaitingRoomService.prototype.destroyAsStudent = function (user) {
        console.log("WRService.destroyAsStudent: ", user);
        this.destroy(user);
        this.createdRoomSubscription.unsubscribe();
        this.eliminatedRoomSubscription.unsubscribe();
        /** //*
        this.eeThereIsAnAvailableRoomLess.unsubscribe();
        this.eeThereIsANewRoom.unsubscribe();  */
    };
    WaitingRoomService.prototype.destroyAsTutor = function (user) {
        console.log("WRService.destroyAsTutor: ", user);
        this.destroy(user);
    };
    WaitingRoomService.prototype.destroy = function (user) {
        this.exit(user);
        this.eeAvailableRooms.unsubscribe();
        this.availableRooms.length = 0;
    };
    WaitingRoomService.prototype.exit = function (user) {
        console.log("");
        console.log("* <- WaitingRoomService.exit " + new Date().toLocaleTimeString());
        /*
        let jsonMessage: UserInfoMessage = Object.assign({id: "exitWaitingRoom"}, user);
        console.log('user exit message: ', jsonMessage);
        this.connection.sendMessage(jsonMessage);
        */
        this.connection.sendWSMessage(WS_MSG_ID_EXIT_WAITING_ROOM, user);
        console.log("/ WaitingRoomService.exit " + new Date().toLocaleTimeString());
        console.log("");
    };
    return WaitingRoomService;
}());
WaitingRoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, connection_service_1.ConnectionService, handler_service_1.HandlerService])
], WaitingRoomService);
exports.WaitingRoomService = WaitingRoomService;
//# sourceMappingURL=waitingRoom.service.js.map