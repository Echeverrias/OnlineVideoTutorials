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
var handler_service_1 = require("./handler.service");
var connection_service_1 = require("./connection.service");
var user_service_1 = require("./user.service");
var ParticipantsService = (function () {
    function ParticipantsService(handler, connection, me) {
        this.handler = handler;
        this.connection = connection;
        this.me = me;
        this.eventEmitters = new Map();
    }
    ParticipantsService.prototype.attachParticipant = function (participantUserName, receiveVideoAnswer, iceCandidate) {
        var eeReceiveVideoAnswer = new core_1.EventEmitter();
        eeReceiveVideoAnswer.subscribe(function (data) { receiveVideoAnswer(data.sdpAnswer); });
        this.handler.attach("receiveVideoAnswer-" + participantUserName, eeReceiveVideoAnswer);
        this.eventEmitters.set("receiveVideoAnswer-" + participantUserName, eeReceiveVideoAnswer);
        var eeIceCandidate = new core_1.EventEmitter();
        eeIceCandidate.subscribe(function (data) { iceCandidate(data.candidate); });
        this.handler.attach("iceCandidate-" + participantUserName, eeIceCandidate);
        this.eventEmitters.set("iceCandidate-" + participantUserName, eeIceCandidate);
    };
    ParticipantsService.prototype.offerToReceiveVideo = function (participantUserName, roomName, offerSdp) {
        console.log("");
        console.log("***-> ParticipantService.offerToReceiveVideo  " + participantUserName + " " + new Date().toLocaleTimeString());
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
        //console.log('Invoking SDP offer callback function');
        var message = {
            id: "receiveVideoFrom",
            userName: participantUserName,
            offer: offerSdp,
            roomName: roomName
        };
        this.connection.sendMessage(message);
        console.log("/ ParticipantService.offerToReceiveVideo " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantsService.prototype.onIceCandidate = function (participantUserName, roomName, candidate) {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        var message = {
            id: 'receiveAddress',
            address: candidate,
            userName: participantUserName,
            roomName: roomName
        };
        this.connection.sendMessage(message);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");
    };
    ParticipantsService.prototype.detachParticipant = function (participantUserName) {
        this.eventEmitters.get("receiveVideoAnswer-" + participantUserName).unsubscribe();
        this.eventEmitters.delete("receiveVideoAnswer-" + participantUserName);
        this.handler.detach("receiveVideoAnswer-" + participantUserName);
        this.eventEmitters.get("iceCandidate-" + participantUserName).unsubscribe();
        this.eventEmitters.delete("iceCandidate-" + participantUserName);
        this.handler.detach("iceCandidate-" + participantUserName);
    };
    ParticipantsService.prototype.destroy = function () {
        var _this = this;
        this.eventEmitters.forEach(function (eventEmitter, key) {
            eventEmitter.unsubscribe();
            _this.handler.detach(key);
        });
        this.eventEmitters.clear();
        console.log(this.eventEmitters);
    };
    return ParticipantsService;
}());
ParticipantsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [handler_service_1.HandlerService, connection_service_1.ConnectionService, user_service_1.UserService])
], ParticipantsService);
exports.ParticipantsService = ParticipantsService;
//# sourceMappingURL=participants.service.js.map