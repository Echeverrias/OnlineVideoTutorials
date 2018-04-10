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
var connection_service_1 = require("./../../core/connection.service");
var handler_service_1 = require("./../../core/handler.service");
var room_1 = require("./../../models/room");
//type RoomMessage = { roomName: string } & IdMessage;
//type AvailableRoomsMessage = { availableRooms: Room[] } & IdMessage;
var CREATE_ROOM_ENDPOINT = '/create_room';
var SUBSCRIPTION_CREATED_ROOM_ENDPOINT = '/created_room';
var SUBSCRIPTION_ELIMINATED_ROOM_ENDPOINT = '/eliminated_room';
// Messages to the server
var WS_MSG_ID_ENTER_WAITING_ROOM = 'enterWaitingRoom';
var WS_MSG_ID_EXIT_WAITING_ROOM = 'exitWaitingRoom';
// Messages from the server
var WS_MSG_ID_AVAILABLE_ROOMS = 'availableRooms';
var WaitingRoomService = (function () {
    function WaitingRoomService(http, connection, handler) {
        this.http = http;
        this.connection = connection;
        this.handler = handler;
        console.log("*WaitingRoomService constructor");
        this.availableRooms = [];
    }
    WaitingRoomService.prototype.init = function (user) {
        console.log('WaitingRoom.init()');
        console.log(user);
        this.user = user;
    };
    WaitingRoomService.prototype.initSubscription = function () {
        console.log("WaitingRoomService.initSubscription()");
        this.stompClient = this.connection.stompOverWsClient;
        this.createdRoomSubscription = this.stompClient.subscribe(SUBSCRIPTION_CREATED_ROOM_ENDPOINT, this.getOnCreatedRoomSubscription());
        this.eliminatedRoomSubscription = this.stompClient.subscribe(SUBSCRIPTION_ELIMINATED_ROOM_ENDPOINT, this.getOnEliminatedRoomSubscription());
    };
    // stomp
    WaitingRoomService.prototype.getOnCreatedRoomSubscription = function () {
        var _this = this;
        var onSubscription = function (message) {
            console.log("Msg received: " + message);
            _this.onAddAvailableRoom(JSON.parse(message.body));
        };
        return onSubscription;
    };
    // stomp
    WaitingRoomService.prototype.getOnEliminatedRoomSubscription = function () {
        var _this = this;
        var onSubscription = function (message) {
            console.log("Msg received: " + message);
            _this.onRemoveAvailableRoom(JSON.parse(message.body));
        };
        return onSubscription;
    };
    WaitingRoomService.prototype.onAddAvailableRoom = function (room) {
        console.log("");
        console.log("* <- WaitingRoomService.onAddavailableRoom: " + room.name + " to " + this.availableRooms + " " + new Date().toLocaleTimeString());
        console.log("room: ", room);
        console.log(this.availableRooms);
        this.availableRooms.push(room);
        this.availableRooms$.next(this.availableRooms);
        console.log(this.availableRooms);
        console.log("/WaitingRoomService.onAddavailableRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.onRemoveAvailableRoom = function (room) {
        console.log("");
        console.log("* <- WaitingRoomService.onRemoveavailableRoom : " + room.id + " " + new Date().toLocaleTimeString());
        var roomId = room.id;
        console.log(this.availableRooms);
        var i = this.availableRooms.findIndex(function (r) { return r.id == roomId; });
        this.availableRooms.splice(i, 1);
        console.log(this.availableRooms);
        this.availableRooms$.next(this.availableRooms);
        console.log("this.availableRooms: " + this.availableRooms);
        console.log("/ WaitingRoomService.onRemoveavailableRoom : " + roomId + " " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.getAvailableRooms = function () {
        var _this = this;
        console.log("* WaitingRoomService.getAvailableRooms");
        this.availableRooms$ = new Subject_1.Subject();
        this.handler.attach(WS_MSG_ID_AVAILABLE_ROOMS, this.availableRooms$);
        this.connection.sendWSMessage(WS_MSG_ID_ENTER_WAITING_ROOM, this.user);
        console.log(this.availableRooms);
        return this.availableRooms$.asObservable()
            .map(function (availableRooms) {
            console.log('map');
            _this.availableRooms = availableRooms.slice(0);
            console.log(_this.availableRooms);
            return _this.availableRooms;
        });
    };
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
    WaitingRoomService.prototype.destroy = function () {
        console.log("");
        console.log("* <- WaitingRoomService.exit " + new Date().toLocaleTimeString());
        this.connection.sendWSMessage(WS_MSG_ID_EXIT_WAITING_ROOM, this.user);
        this.handler.detach(WS_MSG_ID_AVAILABLE_ROOMS);
        this.availableRooms.length = 0;
        if (this.stompClient) {
            this.destroySubscription();
        }
        console.log("/ WaitingRoomService.exit " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomService.prototype.destroySubscription = function () {
        console.log('WaitingRoom.destroySubscription()');
        try {
            this.createdRoomSubscription.unsubscribe();
            this.eliminatedRoomSubscription.unsubscribe();
        }
        catch (e) {
            console.log(e);
        }
    };
    return WaitingRoomService;
}());
WaitingRoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, connection_service_1.ConnectionService, handler_service_1.HandlerService])
], WaitingRoomService);
exports.WaitingRoomService = WaitingRoomService;
//# sourceMappingURL=waitingRoom.service.js.map