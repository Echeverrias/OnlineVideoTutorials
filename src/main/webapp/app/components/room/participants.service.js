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
var handler_service_1 = require("./../../core/handler.service");
var connection_service_1 = require("./../../core/connection.service");
var user_service_1 = require("./../../core/user.service");
var Subject_1 = require("rxjs/Subject");
// Messages to the server
var WS_MSG_ID_RECEIVE_VIDEO_FROM = 'receiveVideoFrom';
var WS_MSG_ID_RECEIVE_ADDRESS = 'receiveAddress';
// Messages from the server
var WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM = 'receiveVideoAnswer-';
var WS_MSG_ID_PREFIX_ICE_CANDIDATE = 'iceCandidate-';
var ParticipantsService = (function () {
    function ParticipantsService(handler, connection, me) {
        this.handler = handler;
        this.connection = connection;
        this.me = me;
        // this.subscriptions = new Map<string, any>();
        this.attached = [];
    }
    /*
        attachParticipant(participantUserName: string, receiveVideoAnswer: (sdpAnswer: any) => any , iceCandidate: (candidate: any) => any ){
    
            let eeReceiveVideoAnswer: EventEmitter<OfferInfo> = new EventEmitter<OfferInfo>();
            let receiveVideoAnswerSubscription = eeReceiveVideoAnswer
                .subscribe((offerInfo: OfferInfo): void => { receiveVideoAnswer(offerInfo.answerSdp) })
            this.handler.attach(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`, eeReceiveVideoAnswer);
            this.subscriptions.set(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`, eeReceiveVideoAnswer);
    
            let eeIceCandidate: EventEmitter<AddressInfo> = new EventEmitter<AddressInfo>();
            let eeIceCandidateSubscription = eeIceCandidate
                .subscribe((addressInfo: AddressInfo): void => { iceCandidate(addressInfo.iceCandidate) });
            this.handler.attach(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`, eeIceCandidate);
            this.subscriptions.set(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`, eeIceCandidate);
    
        }
    */
    ParticipantsService.prototype.getVideoAnswer = function (participantUserName) {
        var receiveVideoAnswer$ = new Subject_1.Subject();
        var id = this.getVideoAnswerId(participantUserName);
        this.handler.attach(id, receiveVideoAnswer$);
        this.attached.push(id);
        return receiveVideoAnswer$.asObservable();
    };
    ParticipantsService.prototype.getVideoAnswerId = function (participantUserName) {
        return "" + WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM + participantUserName;
    };
    ParticipantsService.prototype.getIceCandidate = function (participantUserName) {
        var iceCandidate$ = new Subject_1.Subject();
        var id = this.getIceCandidateId(participantUserName);
        this.handler.attach(id, iceCandidate$);
        this.attached.push(id);
        return iceCandidate$.asObservable();
    };
    ParticipantsService.prototype.getIceCandidateId = function (participantUserName) {
        return "" + WS_MSG_ID_PREFIX_ICE_CANDIDATE + participantUserName;
    };
    ParticipantsService.prototype.offerToReceiveVideo = function (roomId, participantUserName, offerSdp) {
        console.log("");
        console.log("***-> ParticipantService.offerToReceiveVideo  " + participantUserName + " " + new Date().toLocaleTimeString());
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
        //console.log('Invoking SDP offer callback function');
        var offer = {
            roomId: roomId,
            userName: participantUserName,
            offerSdp: offerSdp,
            answerSdp: ""
        };
        this.connection.sendWSMessage(WS_MSG_ID_RECEIVE_VIDEO_FROM, offer);
        console.log("/ ParticipantService.offerToReceiveVideo " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantsService.prototype.onIceCandidate = function (roomId, participantUserName, iceCandidate) {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        var address = {
            roomId: roomId,
            userName: participantUserName,
            iceCandidate: iceCandidate
        };
        this.connection.sendWSMessage(WS_MSG_ID_RECEIVE_ADDRESS, address);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");
    };
    /*
    detachParticipant(participantUserName: string): void {

        this.subscriptions.get(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`).unsubscribe();
        this.subscriptions.delete(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`);
        this.handler.detach(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`)
        this.subscriptions.get(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`).unsubscribe();
        this.subscriptions.delete(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`);
        this.handler.detach(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`);
    }

   
    destroy(): void {
        
        this.subscriptions.forEach((subscription, key) => {
            subscription.unsubscribe();
            this.handler.detach(key);
        });
        this.subscriptions.clear();
        console.log(this.subscriptions);
    }
    */
    ParticipantsService.prototype.destroy = function () {
        var _this = this;
        console.log('ParticipantsService.destroy()');
        console.log(this.attached);
        this.attached.forEach(function (id) { return _this.handler.detach(id); });
        console.log(this.attached);
    };
    ParticipantsService.prototype.destroyParticipant = function (participantUserName) {
        console.log("ParticipantsService.destroyParticipant(" + participantUserName + ")");
        console.log(this.attached);
        var id = this.getVideoAnswerId(participantUserName);
        this.handler.detach(id);
        var i = this.attached.indexOf(id);
        this.attached.splice(i, 1);
        id = this.getIceCandidateId(participantUserName);
        this.handler.detach(id);
        i = this.attached.indexOf(this.getIceCandidateId(participantUserName));
        this.attached.splice(i, 1);
        console.log(this.attached);
    };
    return ParticipantsService;
}());
ParticipantsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [handler_service_1.HandlerService, connection_service_1.ConnectionService, user_service_1.UserService])
], ParticipantsService);
exports.ParticipantsService = ParticipantsService;
//# sourceMappingURL=participants.service.js.map