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
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var connection_1 = require('./connection');
var handler_service_1 = require('./handler.service');
var myService_1 = require('./myService');
var WaitingRoomService = (function () {
    function WaitingRoomService(connection, handler, me) {
        var _this = this;
        this.connection = connection;
        this.handler = handler;
        this.me = me;
        console.log("*WaitingRoomService constructor");
        this.availableRoomsObserver = new Subject_1.Subject();
        this.eeAvailableRooms = new core_1.EventEmitter();
        this.eeAvailableRooms.subscribe(function (data) { _this.onSetAvailableRooms(data); });
        this.handler.attach('availableRooms', this.eeAvailableRooms);
        this.eeThereIsANewRooms = new core_1.EventEmitter();
        this.eeThereIsANewRooms.subscribe(function (data) { _this.onAddAvailableRoom(data); });
        this.handler.attach('thereIsANewRoom', this.eeThereIsANewRooms);
        this.eeThereIsAnAvailableRoomLess = new core_1.EventEmitter();
        this.eeThereIsAnAvailableRoomLess.subscribe(function (data) { _this.onRemoveAvailableRoom(data); });
        this.handler.attach('thereIsAnAvailableRoomLess', this.eeThereIsAnAvailableRoomLess);
    }
    WaitingRoomService.prototype.init = function () {
        this.enter();
    };
    WaitingRoomService.prototype.enter = function () {
        console.log("");
        console.log("* <- WaitingRoomService.lookingForRooms " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "enterWaitingRoom",
            userName: this.me.myUserName
        };
        this.connection.sendMessage(jsonMessage);
        console.log("/ WaitingRoomService.lookingForRooms " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomService.prototype.getAvailableRooms = function () {
        console.log("* WaitingRoomService.getavailableRooms");
        return this.availableRoomsObserver;
    };
    WaitingRoomService.prototype.onSetAvailableRooms = function (msg) {
        console.log("");
        console.log("* WaitingRoomService.onSetavailableRooms " + new Date().toLocaleTimeString());
        console.log(msg.availableRoomsNames);
        this.availableRoomsNames = msg.availableRoomsNames;
        this.availableRoomsObserver.next(this.availableRoomsNames);
        console.log("/ WaitingRoomService.onSetavailableRooms " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomService.prototype.onAddAvailableRoom = function (msg) {
        console.log("");
        console.log("* <- WaitingRoomService.onAddavailableRoom: " + msg.roomName + " to " + this.availableRoomsNames + " " + new Date().toLocaleTimeString());
        this.availableRoomsNames.push(msg.roomName);
        console.log("this.availableRooms: " + this.availableRoomsNames + " ");
        console.log("/WaitingRoomService.onAddavailableRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.onRemoveAvailableRoom = function (msg) {
        console.log("");
        console.log("* <- WaitingRoomService.onRemoveavailableRoom : " + msg.roomName + " " + new Date().toLocaleTimeString());
        var i = this.availableRoomsNames.indexOf(msg.roomName);
        this.availableRoomsNames.splice(i, 1);
        console.log("this.availableRooms: " + this.availableRoomsNames);
        console.log("/ WaitingRoomService.onRemoveavailableRoom : " + msg.roomName + " " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomService.prototype.destroy = function () {
        this.exit();
        this.eeAvailableRooms.unsubscribe();
        this.eeThereIsANewRooms.unsubscribe();
        this.eeThereIsAnAvailableRoomLess.unsubscribe();
    };
    WaitingRoomService.prototype.exit = function () {
        console.log("");
        console.log("* <- WaitingRoomService.exit " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "exitWaitingRoom",
            userName: this.me.myUserName
        };
        this.connection.sendMessage(jsonMessage);
        console.log("/ WaitingRoomService.exit " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [connection_1.Connection, handler_service_1.HandlerService, myService_1.MyService])
    ], WaitingRoomService);
    return WaitingRoomService;
}());
exports.WaitingRoomService = WaitingRoomService;
//# sourceMappingURL=waitingRoom.service.js.map