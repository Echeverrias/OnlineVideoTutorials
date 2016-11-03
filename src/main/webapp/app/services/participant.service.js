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
var handler_service_1 = require('./handler.service');
var connection_1 = require('./connection');
var myService_1 = require('./myService');
var ParticipantService = (function () {
    function ParticipantService(handler, connection, me) {
        //this.participants = ParticipantComponent[];
        this.handler = handler;
        this.connection = connection;
        this.me = me;
        this.constraints = {
            audio: true,
            video: {
                mandatory: {
                    maxWidth: 320,
                    maxFrameRate: 15,
                    minFrameRate: 15
                }
            }
        };
    }
    ParticipantService.prototype.init = function (participantName, video, roomName) {
        var _this = this;
        this.participantUserName = participantName;
        this.videoParticipant = video;
        this.roomName = roomName;
        this.eeReceiveVideoAnswer = new core_1.EventEmitter();
        this.eeReceiveVideoAnswer.subscribe(function (data) { _this.receiveVideoResponse(data); });
        this.handler.attach("receiveVideoAnswer-" + participantName, this.eeReceiveVideoAnswer);
        this.eeIceCandidate = new core_1.EventEmitter();
        this.eeIceCandidate.subscribe(function (data) { _this.addIceCandidate(data); });
        this.handler.attach("iceCandidate-" + participantName, this.eeIceCandidate);
        this.createRtcPeer();
    };
    ParticipantService.prototype.createRtcPeer = function () {
        var participant = this;
        var options = { mediaConstraints: null, onicecandidate: null, localVideo: null, remoteVideo: null };
        options.onicecandidate = participant.onIceCandidate.bind(participant);
        //   console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");
        // It is me
        if (this.me.myUserName === this.participantUserName) {
            options.localVideo = this.videoParticipant;
            //  console.log("video:");
            //console.log(this.video.nativeElement);
            options.mediaConstraints = this.constraints;
            //  console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error) {
                    return console.error(error);
                }
                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });
        }
        else {
            options.remoteVideo = this.videoParticipant;
            // console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    return console.error(error);
                }
                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });
        }
        // console.log("constraints: " + JSON.stringify(this.constraints));
        //console.log("options: " + JSON.stringify(this.options));
        // console.log(`I'm ${this._userName} with ${this._rtcPeer}`);
        console.log("/ Participant.afterViewInit " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantService.prototype.offerToReceiveVideo = function (error, offerSdp, wp) {
        console.log("");
        console.log("*-> Participant.offerToReceiveVideo  " + this.participantUserName + " " + new Date().toLocaleTimeString());
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
        //alert(`I'm ${this._userName} and i'm going to send an offer`);
        //console.log('Invoking SDP offer callback function');
        var message = {
            id: "receiveVideoFrom",
            userName: this.participantUserName,
            offer: offerSdp,
            roomName: this.roomName
        };
        this.connection.sendMessage(message);
        console.log("/ Participant.offerToReceiveVideo " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantService.prototype.onIceCandidate = function (candidate, wp) {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        var message = {
            id: 'receiveAddress',
            address: candidate,
            userName: this.participantUserName,
            roomName: this.roomName
        };
        this.connection.sendMessage(message);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");
    };
    ParticipantService.prototype.receiveVideoResponse = function (msg) {
        console.log("");
        console.log("* Participant.receiveVideoResponse " + this.me.myUserName + " from " + this.participantUserName + new Date().toLocaleTimeString());
        // console.log(`* Participant.receiveVideoResponse - sdpAnswer: ${sdpAnswer} ${new Date().toLocaleTimeString()}`);
        //console.log(`sdpAnswer: ...`);
        //console.log(sdpAnswer);
        //console.log(`my rtcPeer: `);
        // console.log(this._rtcPeer);
        var sdpAnswer = msg.sdpAnswer;
        //   console.log("@ processing answer");
        this._rtcPeer.processAnswer(sdpAnswer, function (error) {
            if (error) {
                console.error("!! ERROR:Participant.receiveVideoResponse");
                console.error(error);
            }
        });
        //  console.log("# processed answer");
        console.log("/ Participant.receiveVideoResponse " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantService.prototype.addIceCandidate = function (msg) {
        // console.log("");
        //  console.log(`* Participant.addIceCandidate  ${new Date().toLocaleTimeString()}`);
        // console.log(`* Participant.addIceCandidate  - candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        // console.log("@ addIceCandidate");
        //console.log(`my rtcPeer: `);
        //console.log(this._rtcPeer);
        var candidate = msg.candidate;
        this._rtcPeer.addIceCandidate(candidate, function (error) {
            if (error) {
                console.error("!! ERROR:Participant.addIceCandidate");
                console.error(error);
                return;
            }
        });
        // console.log("# addIceCandidate");
        //console.log(`/ Participant.addIceCandidate ${new Date().toLocaleTimeString()}`);
        // console.log("");
    };
    ParticipantService.prototype.dispose = function () {
        console.log("");
        console.log("* Participant.dispose I'm " + this.participantUserName + " and i'm disposed " + new Date().toLocaleTimeString());
        this._rtcPeer.dispose();
        console.log("/ Participant.dispose I'm " + this.participantUserName + "} and i'm disposed " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantService.prototype.destroy = function () {
        this.dispose();
        this.eeReceiveVideoAnswer.unsubscribe();
        this.eeIceCandidate.unsubscribe();
    };
    ParticipantService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [handler_service_1.HandlerService, connection_1.Connection, myService_1.MyService])
    ], ParticipantService);
    return ParticipantService;
}());
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=participant.service.js.map