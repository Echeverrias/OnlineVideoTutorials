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
var handler_service_1 = require('./handler.service');
var user_service_1 = require('./user.service');
var connection_service_1 = require('./connection.service');
var user_1 = require('../models/user');
var userFactory_1 = require('../models/userFactory');
;
var RoomService = (function () {
    function RoomService(handler, connection, me) {
        var _this = this;
        this.handler = handler;
        this.connection = connection;
        this.me = me;
        this.mainParticipantObserver = new Subject_1.Subject();
        this.participantsObserver = new Subject_1.Subject();
        this.mainParticipant = new user_1.User();
        this.participants = [];
        this.eeThereIsANewParticipant = new core_1.EventEmitter();
        this.eeThereIsANewParticipant.subscribe(function (data) { _this.onAddParticipant(data); });
        this.handler.attach('thereIsANewParticipant', this.eeThereIsANewParticipant);
        this.handler.attach('thereIsAParticipant', this.eeThereIsANewParticipant);
        this.eeAParticipantHasLefTheRoom = new core_1.EventEmitter();
        this.eeAParticipantHasLefTheRoom.subscribe(function (data) { _this.onRemoveParticipant(data); });
        this.handler.attach('aParticipantHasLeftTheRoom', this.eeAParticipantHasLefTheRoom);
    }
    RoomService.prototype.init = function (roomName) {
        this.roomName = roomName;
        this.me.myRoomName = roomName;
    };
    RoomService.prototype.getParticipants = function () {
        console.log("");
        console.log("* Room.lookingForParticipants " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "joinRoom",
            roomName: this.roomName,
            userName: this.me.myUserName,
            userType: this.me.myUserType,
            name: this.me.myName
        };
        this.connection.sendMessage(jsonMessage);
        console.log(this.participants);
        console.log("/ Room.lookingForParticipants " + new Date().toLocaleTimeString());
        console.log("");
        return this.participantsObserver;
    };
    RoomService.prototype.getMainParticipant = function () {
        return this.mainParticipantObserver;
    };
    RoomService.prototype.onAddParticipant = function (msg) {
        console.log("");
        console.log("* <- Room.onAddParticipant " + new Date().toLocaleTimeString());
        console.log("<- message: " + JSON.stringify(msg));
        console.log(this.participants);
        if (this.participants.length == 0) {
            this.participantsObserver.next(this.participants);
        }
        var user = userFactory_1.UserFactory.createAnUser(msg);
        ;
        console.log(user);
        // My video will be the last 
        if (user.userName === this.me.myUserName) {
            this.participants.push(user);
            console.log("It's me");
        }
        else {
            console.log("A new participant created: " + JSON.stringify(user));
            if (user.isATutor() || (this.me.amATutor() && !this.mainParticipant.exist())) {
                console.log("Am I a tutor?: " + this.me.amATutor());
                console.log("Is the new user a tutor?: " + user.isATutor());
                this.mainParticipant.set(user);
                this.mainParticipantObserver.next(this.mainParticipant);
            }
            else {
                this.participants.splice(this.participants.length - 1, 0, user);
            }
        }
        console.log(this.participants);
        console.log("/ Room.onAddParticipant " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomService.prototype.onRemoveParticipant = function (msg) {
        console.log("");
        console.log("* RoomService.onRemoveParticipant: " + msg.userName + " " + new Date().toLocaleTimeString());
        console.log("users before: " + JSON.stringify(this.participants));
        var userName = msg.userName;
        if (this.mainParticipant.userName === userName) {
            this.mainParticipant.setToUndefined();
        }
        else {
            var index = this.getIndexOfParticipant(userName);
            this.participants.splice(index, 1);
        }
        console.log("users after: " + JSON.stringify(this.participants));
        console.log("/ RoomService.onRemoveParticipant " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomService.prototype.getIndexOfParticipant = function (userName) {
        var index = 0;
        var i = index;
        var length = this.participants.length;
        var found = false;
        while (!found && i < length) {
            if (this.participants[i].userName === userName) {
                found = true;
                index = i;
            }
            else {
                i++;
            }
        }
        if (!found) {
            index = length;
        }
        return index;
    };
    RoomService.prototype.onExit = function () {
        console.log("");
        console.log("<- RoomService.onExit: " + this.roomName + " " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "exitRoom",
            roomName: this.roomName,
            userName: this.me.myUserName,
            userType: this.me.myUserType,
            name: undefined
        };
        this.connection.sendMessage(jsonMessage);
        this.me.deleteMyRoomName();
        console.log("/ RoomService.onExitOfRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomService.prototype.removeAllParticipants = function () {
        console.log("");
        console.log("* RoomService.removeAllParticipants " + new Date().toLocaleTimeString());
        this.mainParticipant.setToUndefined();
        this.participants.length = 0;
        console.log("/ RoomService.removeAllParticipants " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomService.prototype.destroy = function () {
        this.eeThereIsANewParticipant.unsubscribe();
        this.eeAParticipantHasLefTheRoom.unsubscribe();
        this.removeAllParticipants();
    };
    RoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [handler_service_1.HandlerService, connection_service_1.ConnectionService, user_service_1.UserService])
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map