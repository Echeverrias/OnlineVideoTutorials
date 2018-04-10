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
var Subject_1 = require("rxjs/Subject");
var handler_service_1 = require("./../../core/handler.service");
var user_service_1 = require("./../../core/user.service");
var connection_service_1 = require("./../../core/connection.service");
// Messages to the server
var WS_MSG_ID_JOIN_ROOM = 'joinRoom';
var WS_MSG_ID_EXIT_ROOM = 'exitRoom';
// Messages from the server
var WS_MSG_ID_EXISTING_PARTICIPANTS = 'theseAreTheParticipants';
var WS_MSG_ID_NEW_PARTICIPANT = 'thereIsANewParticipant';
var WS_MSG_ID_PARTICIPANT_DEPARTURE = 'aParticipantHasLeftTheRoom';
// const WS_MSG_ID_EXISTING_PARTICIPANT: string = 'thereIsAParticipant';
var RoomService = (function () {
    function RoomService(handler, connection, me) {
        /*
      //  this.mainParticipant = new User();
       // this.participants = [];
       
     //  this.mainParticipant$ = new Subject<User>();
      // this.participants$ = new Subject<User[]>();

        this.eeGetTheParticipants = new Subject<IUser[]|User[]>()
        this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANTS, this.eeGetTheParticipants);

        this.eeThereIsANewParticipant = new EventEmitter<IUser>()
        this.handler.attach(WS_MSG_ID_NEW_PARTICIPANT, this.eeThereIsANewParticipant);
       // this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANT, this.eeThereIsANewParticipant);
       
       this.eeAParticipantHasLefTheRoom = new EventEmitter<string>()
       this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.eeAParticipantHasLefTheRoom);
       //.subscribe((participantName: string): void => { this.onRemoveParticipant(participantName) });
      */
        this.handler = handler;
        this.connection = connection;
        this.me = me;
        /*
    
        this.eeAParticipantHasLefTheRoom = new EventEmitter<string>()
                .subscribe((participantName: string): void => { this.onRemoveParticipant(participantName) });
            this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.eeAParticipantHasLefTheRoom);
    
            this.eeThereIsANewParticipant = new EventEmitter<IUser>()
                .subscribe((participant: IUser): void => { console.log('thereIsANewParticipant: ', participant); this.onAddParticipant(participant) });
                this.handler.attach(WS_MSG_ID_NEW_PARTICIPANT, this.eeThereIsANewParticipant);
               // this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANT, this.eeThereIsANewParticipant);
    
            this.eeAParticipantHasLefTheRoom = new EventEmitter<string>()
                .subscribe((participantName: string): void => { this.onRemoveParticipant(participantName) });
            this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.eeAParticipantHasLefTheRoom);
    */
    }
    RoomService.prototype.init = function (participantInfo) {
        this.participantInfo = participantInfo;
        // this.connection.sendWSMessage(WS_MSG_ID_JOIN_ROOM, participantInfo);   
    };
    // Prueba
    RoomService.prototype.getParticipants = function () {
        this.availableParticipants$ = new Subject_1.Subject();
        this.handler.attach(WS_MSG_ID_EXISTING_PARTICIPANTS, this.availableParticipants$);
        this.connection.sendWSMessage(WS_MSG_ID_JOIN_ROOM, this.participantInfo);
        return this.availableParticipants$.asObservable();
    };
    // Prueba
    RoomService.prototype.getIncomingParticipant = function () {
        this.incomingParticipant$ = new Subject_1.Subject();
        this.handler.attach(WS_MSG_ID_NEW_PARTICIPANT, this.incomingParticipant$);
        return this.incomingParticipant$.asObservable();
    };
    // Prueba
    RoomService.prototype.getOutcomingParticipant = function () {
        this.outcomingParticipant$ = new Subject_1.Subject();
        this.handler.attach(WS_MSG_ID_PARTICIPANT_DEPARTURE, this.outcomingParticipant$);
        return this.outcomingParticipant$.asObservable();
    };
    RoomService.prototype.destroy = function () {
        console.log("");
        console.log("<- RoomService.destroy: " + this.participantInfo.room.id + " " + new Date().toLocaleTimeString());
        /**
        let jsonMessage: ParticipantMessage = Object.assign(this.me.getMyInfo(), {id: "exitRoom"});
        console.log(jsonMessage);
        this.connection.sendMessage(jsonMessage);
        */
        this.handler.detach(WS_MSG_ID_EXISTING_PARTICIPANTS);
        this.handler.detach(WS_MSG_ID_NEW_PARTICIPANT);
        this.handler.detach(WS_MSG_ID_PARTICIPANT_DEPARTURE);
        this.connection.sendWSMessage(WS_MSG_ID_EXIT_ROOM, this.participantInfo);
        console.log("/ RoomService.destroy " + new Date().toLocaleTimeString());
        console.log("");
    };
    return RoomService;
}());
RoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [handler_service_1.HandlerService, connection_service_1.ConnectionService, user_service_1.UserService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map