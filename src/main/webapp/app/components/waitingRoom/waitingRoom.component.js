/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
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
var router_1 = require('@angular/router');
var connection_1 = require('../../services/connection');
var myService_1 = require('../../services/myService');
var waitingRoom_html_1 = require('./waitingRoom.html');
var WaitingRoomComponent = (function () {
    function WaitingRoomComponent(router, connection, appService) {
        this.router = router;
        this.connection = connection;
        this.appService = appService;
        console.log("");
        console.log("% WaitingRoom constructor " + new Date().toLocaleTimeString());
        console.log("/ WaitingRoom constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    WaitingRoomComponent.prototype.ngOnInit = function () {
        this.onAvaibleRoomsSubscription = this.connection.subscriptions.subscribeToAllAvaibleRooms(this, this.onSetAvaibleRooms);
        this.onNewAvaibleRoomSubscription = this.connection.subscriptions.subscribeToNewAvaibleRoom(this, this.onAddAvaibleRoom);
        this.onAvaibleRoomLessSubscription = this.connection.subscriptions.subscribeToAvaibleRoomLess(this, this.onRemoveAvaibleRoom);
        this.lookingForRooms();
    };
    WaitingRoomComponent.prototype.lookingForRooms = function () {
        console.log("");
        console.log("* <- WaitingRoom.lookingForRooms " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "waitingRoom"
        };
        this.connection.sendMessage(jsonMessage);
        console.log("/ WaitingRoom.lookingForRooms " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomComponent.prototype.onSetAvaibleRooms = function (avaibleRoomsNames) {
        console.log("");
        console.log("* WaitingRoom.avaibleRoomsNames " + new Date().toLocaleTimeString());
        console.log(avaibleRoomsNames);
        this.allAvaibleRoomsNames = avaibleRoomsNames;
        console.log("/ WaitingRoom.avaibleRoomsNames " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomComponent.prototype.onAddAvaibleRoom = function (roomName) {
        console.log("");
        console.log("* <- WaitingRoom.onAddAvaibleRoom: " + roomName + " to " + this.allAvaibleRoomsNames + " " + new Date().toLocaleTimeString());
        this.allAvaibleRoomsNames.push(roomName);
        console.log("this.avaibleRooms: " + this.allAvaibleRoomsNames + " ");
        console.log("/WaitingRoom.onAddAvaibleRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomComponent.prototype.onRemoveAvaibleRoom = function (roomName) {
        console.log("");
        console.log("* <- WaitingRoom.onRemoveAvaibleRoom : " + roomName + " " + new Date().toLocaleTimeString());
        var i = this.allAvaibleRoomsNames.indexOf(roomName);
        this.allAvaibleRoomsNames.splice(i, 1);
        console.log("this.avaibleRooms: " + this.allAvaibleRoomsNames);
        console.log("/ WaitingRoom.onRemoveAvaibleRoom : " + roomName + " " + new Date().toLocaleTimeString());
        console.log("");
    };
    ;
    WaitingRoomComponent.prototype.joinRoom = function (roomName) {
        console.log("");
        console.log("* WaitingRoom.joinRoom: " + roomName + " " + new Date().toLocaleTimeString());
        this.router.navigate(['/room', roomName]);
        console.log("/ WaitingRoom.joinRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomComponent.prototype.onLogOut = function () {
        console.log("");
        console.log("* <- WaitingRoom.onLogOut " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "logout",
            userName: this.appService.myUserName,
        };
        this.connection.sendMessage(jsonMessage);
        this.router.navigate(['/login']);
        console.log("/ WaitingRoom.onLogOut " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomComponent.prototype.ngOnDestroy = function () {
        console.log("");
        console.log("* <- WaitingRoom.ngOnDestroy " + new Date().toLocaleTimeString());
        this.onAvaibleRoomsSubscription.unsubscribe();
        this.onNewAvaibleRoomSubscription.unsubscribe();
        this.onAvaibleRoomLessSubscription.unsubscribe();
        console.log("/ WaitingRoom.ngOnDestroy " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-waitingRoom',
            styleUrls: ["../../../assets/styles/main.css", "waitingRoom.css"],
            template: waitingRoom_html_1.waitingRoomTemplate
        }), 
        __metadata('design:paramtypes', [router_1.Router, connection_1.Connection, myService_1.MyService])
    ], WaitingRoomComponent);
    return WaitingRoomComponent;
}());
exports.WaitingRoomComponent = WaitingRoomComponent;
//# sourceMappingURL=waitingRoom.component.js.map