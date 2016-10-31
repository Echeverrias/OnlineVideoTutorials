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
var myService_1 = require('../../services/myService');
var room_service_1 = require('../../services/room.service');
var handler_service_1 = require('../../services/handler.service');
var participant_component_1 = require('../participant/participant.component');
var user_1 = require('../../services/user');
var room_html_1 = require('./room.html');
var RoomComponent = (function () {
    // private eeReceiveVideoAnswer: EventEmitter;
    // private eeIceCandidate: EventEmitter;
    function RoomComponent(handler, room, router, me, route) {
        this.handler = handler;
        this.room = room;
        this.router = router;
        this.me = me;
        this.route = route;
        this.mainUser = new user_1.User();
        console.log("");
        console.log("% Room constructor " + new Date().toLocaleTimeString());
        /*
        this.eeReceiveVideoAnswer = new EventEmitter();
        this.eeReceiveVideoAnswer.subscribe(data => this.onReceiveVideoResponse(data));
        this.handler.attach('receiveVideoAnswer', this.eeReceiveVideoAnswer);
                             
        this.eeIceCandidate = new EventEmitter();
        this.eeIceCandidate.subscribe(data => this.onAddIceCandidate(data));
        this.handler.attach('iceCandidate', this.eeIceCandidate);
        */
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
        this.room.getParticipants().subscribe(function (users) { return _this.users = users; });
        this.room.getMainParticipant().subscribe(function (mainUser) { return _this.mainUser = mainUser; });
    };
    /*
    onReceiveVideoResponse(jsonMessage: Object): void {
        console.log("");
        console.log(`<- Room.onReceiveVideoResponse from ${jsonMessage.userName} ${new Date().toLocaleTimeString()}`);
        //console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
         
        let userName = jsonMessage.userName;
        let sdpAnswer = jsonMessage.sdpAnswer;
        let participant = this.getParticipant(userName);

        console.log(`participant:`);
        console.log(participant);

        participant.receiveVideoResponse(sdpAnswer);
        console.log(`/ Room.onReceiveVideoResponse ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onAddIceCandidate(jsonMessage: Object): void {
      //  console.log("");
       //// console.log(`<- Room.onIceCandidate from ${jsonMessage.userName} ${new Date().toLocaleTimeString()}`);
        //console.log(`<- message: ${JSON.stringify(jsonMessage)}`);

        let userName = jsonMessage.userName;
        let candidate = jsonMessage.candidate;

        let participant = this.getParticipant(userName);

      //  console.log(`participant:`);
      //  console.log(participant);

        participant.addIceCandidate(candidate);

      //  console.log(`/ Room.onIceCandidate`);
      //  console.log("/ " + new Date().toLocaleTimeString());
       // console.log("");
    }

    private getParticipant(userName: string): ParticipantComponent {
        //console.log("");
       // console.log(`* Room.getParticipant: ${userName} of ...  ${new Date().toLocaleTimeString()}`);
       // console.log(this.users);
        let participant: ParticipantComponent;
        if (this.mainParticipant.userName === userName) {
            participant = this.mainParticipant;
        }
        else {
            participant = this.participants._results.filter(participant => participant.id === userName)[0];
        }

       // console.log(`/ Room.getParticipant -> ${participant.userName} ${new Date().toLocaleTimeString()}`);
       // console.log("");
        return participant;
    }
  */
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
    RoomComponent.prototype.ngOnDestroy = function () {
        console.log("* Room.OnDestroy " + new Date().toLocaleTimeString());
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
            providers: [room_service_1.RoomService]
        }), 
        __metadata('design:paramtypes', [handler_service_1.HandlerService, room_service_1.RoomService, router_1.Router, myService_1.MyService, router_1.ActivatedRoute])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map