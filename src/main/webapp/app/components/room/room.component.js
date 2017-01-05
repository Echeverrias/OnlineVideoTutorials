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
var user_service_1 = require('../../services/user.service');
var room_service_1 = require('../../services/room.service');
var participants_service_1 = require('../../services/participants.service');
var participant_component_1 = require('../participant/participant.component');
var user_1 = require('../../models/user');
var room_html_1 = require('./room.html');
var RoomComponent = (function () {
    function RoomComponent(room, _participants, router, me, route) {
        this.room = room;
        this._participants = _participants;
        this.router = router;
        this.me = me;
        this.route = route;
        this.mainUser = new user_1.User();
        console.log("");
        console.log("% Room constructor " + new Date().toLocaleTimeString());
        console.log(this.users);
        console.log("/ Room constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    RoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.name = params['roomName'];
        });
        this.address = this.name;
        this.room.init(this.name);
        this.room.getParticipants().subscribe(function (users) { _this.users = users; });
        this.room.getMainParticipant().subscribe(function (mainUser) { _this.mainUser = mainUser; });
    };
    RoomComponent.prototype.onExitOfRoom = function () {
        console.log("");
        console.log("<- Room.onExitOfRoom: " + this.name + " " + new Date().toLocaleTimeString());
        this.room.onExit();
        if (this.me.amAStudent()) {
            this.router.navigate(['/rooms']);
        }
        else {
            this.router.navigate(['/login']);
        }
        console.log("/ Room.onExitOfRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomComponent.prototype.showGadget = function (isSomeGadgetActive) {
        this.activeGadget = isSomeGadgetActive;
    };
    RoomComponent.prototype.ngOnDestroy = function () {
        console.log("* Room.OnDestroy " + new Date().toLocaleTimeString());
        this._participants.destroy();
        this.room.destroy();
    };
    __decorate([
        core_1.ViewChild(participant_component_1.ParticipantComponent), 
        __metadata('design:type', participant_component_1.ParticipantComponent)
    ], RoomComponent.prototype, "mainParticipant", void 0);
    __decorate([
        core_1.ViewChildren(participant_component_1.ParticipantComponent), 
        __metadata('design:type', core_1.QueryList)
    ], RoomComponent.prototype, "participants", void 0);
    RoomComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-room',
            styleUrls: ["room.css"],
            template: room_html_1.roomTemplate,
            providers: [room_service_1.RoomService, participants_service_1.ParticipantsService]
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService, participants_service_1.ParticipantsService, router_1.Router, user_service_1.UserService, router_1.ActivatedRoute])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map