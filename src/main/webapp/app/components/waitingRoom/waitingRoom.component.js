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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var waitingRoom_service_1 = require("../../services/waitingRoom.service");
var user_service_1 = require("../../services/user.service");
var waitingRoom_html_1 = require("./waitingRoom.html");
var WaitingRoomComponent = (function () {
    function WaitingRoomComponent(waitingRoom, router, me) {
        this.waitingRoom = waitingRoom;
        this.router = router;
        this.me = me;
        console.log("");
        console.log("% WaitingRoom constructor " + new Date().toLocaleTimeString());
        this.roomName = this.me.myUserName;
        console.log("/ WaitingRoom constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    WaitingRoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("WaitingRoomComponent.onInit");
        this.waitingRoom.init();
        this.waitingRoom.getAvailableRooms().subscribe(function (availableRooms) { return _this.availableRoomsNames = availableRooms; });
    };
    WaitingRoomComponent.prototype.onCreateRoom = function () {
        this.roomName = this.createRoomName(this.roomName);
        this.router.navigate(['/room', this.roomName]);
    };
    WaitingRoomComponent.prototype.createRoomName = function (roomName) {
        var name = roomName;
        if (name !== "") {
            name = name.replace(this.me.myUserName, "");
            name = name.replace(" ", "_");
        }
        return name === "" ? "" + this.me.myUserName : this.me.myUserName + "_" + name;
    };
    WaitingRoomComponent.prototype.onJoinRoom = function (roomName) {
        console.log("");
        console.log("* WaitingRoom.joinRoom: " + roomName + " " + new Date().toLocaleTimeString());
        this.router.navigate(['/room', roomName]);
        console.log("/ WaitingRoom.joinRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    WaitingRoomComponent.prototype.onSignOut = function () {
        console.log("");
        console.log("* <- WaitingRoom.onLogOut " + new Date().toLocaleTimeString());
        this.router.navigate(['/sign']);
    };
    WaitingRoomComponent.prototype.ngOnDestroy = function () {
        console.log("");
        console.log("* <- WaitingRoom.ngOnDestroy " + new Date().toLocaleTimeString());
        this.waitingRoom.destroy();
        console.log("/ WaitingRoom.ngOnDestroy " + new Date().toLocaleTimeString());
        console.log("");
    };
    return WaitingRoomComponent;
}());
WaitingRoomComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-waitingRoom',
        styleUrls: ["waitingRoom.css"],
        template: waitingRoom_html_1.waitingRoomTemplate,
        providers: [waitingRoom_service_1.WaitingRoomService]
    }),
    __metadata("design:paramtypes", [waitingRoom_service_1.WaitingRoomService, router_1.Router, user_service_1.UserService])
], WaitingRoomComponent);
exports.WaitingRoomComponent = WaitingRoomComponent;
//# sourceMappingURL=waitingRoom.component.js.map