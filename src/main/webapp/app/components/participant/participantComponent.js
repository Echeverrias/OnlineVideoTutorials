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
var connection_1 = require('../../services/connection');
var myService_1 = require('../../services/myService');
var participant_html_1 = require('./participant.html');
var ParticipantComponent = (function () {
    function ParticipantComponent(connection, appService) {
        this.connection = connection;
        this.appService = appService;
        console.log("");
        console.log("% Participant constructor " + new Date().toLocaleTimeString());
        this.important = false;
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
        console.log("/ Participant constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    ParticipantComponent.prototype.ngAfterViewInit = function () {
        console.log("   ngAfterViewInit");
        console.log("* Participant.afterViewInit: " + this.userName + " " + new Date().toLocaleTimeString());
        this.myUserType = this.userType;
        this.userName = this.id;
        console.log("@ {onicecandidate: participant.onIceCandidate.bind(participant)}");
        this.options = {
            onicecandidate: this.onIceCandidate.bind(this)
        };
        console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");
        var participant = this;
        // It is me
        if (this.appService.myUserName === this.id) {
            this.options.localVideo = this.video.nativeElement;
            console.log("video:");
            console.log(this.video.nativeElement);
            this.options.mediaConstraints = this.constraints;
            console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(this.options, function (error) {
                if (error) {
                    return console.error(error);
                }
                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });
            console.log(this._rtcPeer);
            console.log("# created rtcPeer");
        }
        else {
            this.options.remoteVideo = this.video.nativeElement;
            console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(this.options, function (error) {
                if (error) {
                    return console.error(error);
                }
                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });
            console.log(this._rtcPeer);
            console.log("# creating rtcPeer");
        }
        console.log("constraints: " + JSON.stringify(this.constraints));
        console.log("options: " + JSON.stringify(this.options));
        console.log("I'm " + this.userName + " with " + this._rtcPeer);
        console.log("/ Participant.afterViewInit " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.setClasses = function () {
        var classes = {
            'important': this.important,
        };
        return classes;
    };
    ParticipantComponent.prototype.offerToReceiveVideo = function (error, offerSdp, wp) {
        console.log("");
        console.log("*-> Participant.offerToReceiveVideo  " + new Date().toLocaleTimeString());
        console.log("offerSdp: ...");
        //console.log(offerSdp);
        console.log('Invoking SDP offer callback function');
        var message = {
            id: "receiveVideoFrom",
            userName: this.userName,
            offer: offerSdp,
            roomName: this.roomName
        };
        this.connection.sendMessage(message);
        console.log("/ Participant.offerToReceiveVideo " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.onIceCandidate = function (candidate, wp) {
        console.log("");
        console.log("* -> Participant.onIceCandidtae - Local candidate: " + JSON.stringify(candidate) + " " + new Date().toLocaleTimeString());
        var message = {
            id: 'receiveAddress',
            address: candidate,
            userName: this.userName,
            roomName: this.roomName
        };
        this.connection.sendMessage(message);
        console.log("/ Local candidate " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.receiveVideoResponse = function (sdpAnswer) {
        console.log("");
        console.log("* Participant.receiveVideoResponse - sdpAnswer: " + sdpAnswer + " " + new Date().toLocaleTimeString());
        console.log("sdpAnswer: ...");
        // console.log(sdpAnswer);
        console.log("my rtcPeer: ");
        console.log(this._rtcPeer);
        console.log("@ processing answer");
        this._rtcPeer.processAnswer(sdpAnswer, function (error) {
            if (error) {
                console.error(error);
            }
        });
        console.log("# processing answer");
        console.log("/ Participant.receiveVideoResponse " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.addIceCandidate = function (candidate) {
        console.log("");
        console.log("* Participant.addIceCandidate  - candidate: " + JSON.stringify(candidate) + " " + new Date().toLocaleTimeString());
        console.log("@ addIceCandidate");
        console.log("my rtcPeer: ");
        console.log(this._rtcPeer);
        this._rtcPeer.addIceCandidate(candidate, function (error) {
            if (error) {
                console.error("Error adding candidate: " + error);
                return;
            }
        });
        console.log("# addIceCandidate");
        console.log("/ Participant.addIceCandidate " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.dispose = function () {
        console.log("");
        console.log("* Participant.dispose I'm " + this.id + " and i'm disposed " + new Date().toLocaleTimeString());
        this._rtcPeer.dispose();
        console.log("/ Participant.dispose I'm " + this.id + " and i'm disposed " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.ngOnDestroy = function () {
        console.log("* Participant(" + this.userName + ").onDestroy " + new Date().toLocaleTimeString());
    };
    __decorate([
        core_1.ViewChild('video'), 
        __metadata('design:type', core_1.ElementRef)
    ], ParticipantComponent.prototype, "video", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ParticipantComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ParticipantComponent.prototype, "class", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ParticipantComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ParticipantComponent.prototype, "userType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ParticipantComponent.prototype, "roomName", void 0);
    ParticipantComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'participant',
            styleUrls: ["participant.css"],
            template: participant_html_1.participantComponentTemplate
        }), 
        __metadata('design:paramtypes', [connection_1.Connection, myService_1.MyService])
    ], ParticipantComponent);
    return ParticipantComponent;
}());
exports.ParticipantComponent = ParticipantComponent;
//# sourceMappingURL=participantComponent.js.map