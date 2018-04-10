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
var participants_service_1 = require("./../participants.service");
var user_service_1 = require("./../../../core/user.service");
var participant_html_1 = require("./participant.html");
var Subject_1 = require("rxjs/Subject");
var ParticipantComponent = (function () {
    function ParticipantComponent(participants, me) {
        this.participants = participants;
        this.me = me;
        this.destroyed$ = new Subject_1.Subject();
        console.log("");
        console.log("% Participant constructor " + new Date().toLocaleTimeString());
        this.important = false;
        this.loading = true;
        this.options = { mediaConstraints: null, onicecandidate: null, localVideo: null, remoteVideo: null };
        this.constraints = {
            audio: true,
            video: {
                mandatory: {
                    maxFrameRate: 15,
                    minFrameRate: 15
                }
            }
        };
        console.log("/ Participant constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    ParticipantComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Participant.onInit - userName: " + this._userName);
        this.createRtcPeer();
        /*
        //this.participants.attachParticipant(this._userName, this.processAnswer(), this.addIceCandidate());
         attachParticipant(participantUserName: string, receiveVideoAnswer: (sdpAnswer: any) => any , iceCandidate: (candidate: any) => any ){
        .subscribe((offerInfo: OfferInfo): void => { receiveVideoAnswer(offerInfo.answerSdp) })
        .subscribe((addressInfo: AddressInfo): void => { iceCandidate(addressInfo.iceCandidate) });
        */
        this.participants.getVideoAnswer(this._userName)
            .takeUntil(this.destroyed$)
            .subscribe(function (offerInfo) { _this.processAnswer()(offerInfo.answerSdp); });
        this.participants.getIceCandidate(this._userName)
            .takeUntil(this.destroyed$)
            .subscribe(function (addressInfo) { _this.addIceCandidate()(addressInfo.iceCandidate); });
    };
    ParticipantComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.video.nativeElement.addEventListener("playing", function () { return _this.loading = false; });
    };
    ParticipantComponent.prototype.createRtcPeer = function () {
        var _participant = this;
        var _options = this.options;
        _options.onicecandidate = _participant.onIceCandidate.bind(_participant);
        //   console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");
        // It is me
        if (this.me.userName === this._userName) {
            _options.localVideo = this.video.nativeElement;
            //  console.log("video:");
            //console.log(this.video.nativeElement);
            _options.mediaConstraints = this.constraints;
            //  console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(_options, function (error) {
                if (error) {
                    return console.error(error);
                }
                this.generateOffer(_participant.offerToReceiveVideo.bind(_participant));
            });
            //   console.log(this._rtcPeer);    
            // console.log("# created rtcPeer");
        }
        else {
            _options.remoteVideo = this.video.nativeElement;
            // console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(_options, function (error) {
                if (error) {
                    return console.error(error);
                }
                this.generateOffer(_participant.offerToReceiveVideo.bind(_participant));
            });
            // console.log(this._rtcPeer);    
            //console.log("# creating rtcPeer");
        }
        // console.log("constraints: " + JSON.stringify(this.constraints));
        //console.log("options: " + JSON.stringify(this.options));
        // console.log(`I'm ${this._userName} with ${this._rtcPeer}`);
        console.log("/ Participant.afterViewInit " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.offerToReceiveVideo = function (error, offerSdp, wp) {
        console.log("");
        console.log("***-> ParticipantComponent.offerToReceiveVideo  " + this._userName + " " + new Date().toLocaleTimeString());
        this.participants.offerToReceiveVideo(this.roomId, this._userName, offerSdp);
        console.log("/ ParticipantComponent.offerToReceiveVideo " + new Date().toLocaleTimeString());
        console.log("");
    };
    ParticipantComponent.prototype.onIceCandidate = function (candidate, wp) {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        this.participants.onIceCandidate(this.roomId, this._userName, candidate);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        //console.log("");
    };
    ParticipantComponent.prototype.processAnswer = function () {
        var _this = this;
        console.log("");
        console.log("*** ParticipantComponent.getProcessAnswer " + this.me.userName + " " + new Date().toLocaleTimeString());
        //setTimeout(()=>this.loading = false,1000); //%
        console.log('video:', this.video);
        return (function (sdpAnswer) {
            console.log("*** ParticipantComponent.processAnswer " + new Date().toLocaleTimeString());
            _this._rtcPeer.processAnswer(sdpAnswer, function (error) {
                if (error) {
                    console.error("!! ERROR:Participant.processAnswer");
                    console.error(error);
                    return;
                }
            });
        });
    };
    ParticipantComponent.prototype.addIceCandidate = function () {
        // console.log("");
        var _this = this;
        // console.log("");
        return (function (iceCandidate) {
            console.log(' Participant.addIceCandidate:', iceCandidate);
            _this._rtcPeer.addIceCandidate(iceCandidate, function (error) {
                if (error) {
                    console.error("!! ERROR:Participant.addIceCandidate");
                    console.error(error);
                    return;
                }
            });
        });
    };
    ParticipantComponent.prototype.dispose = function () {
        console.log("");
        console.log("* ParticipantComponent.dispose I'm " + this._userName + " and i'm disposed " + new Date().toLocaleTimeString());
        this._rtcPeer.dispose();
        console.log("/ ParticipantComponent.dispose I'm " + this._userName + "} and i'm disposed " + new Date().toLocaleTimeString());
        console.log("");
    };
    Object.defineProperty(ParticipantComponent.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    ParticipantComponent.prototype.getFirstName = function () {
        return this.name.split(" ")[0];
    };
    ParticipantComponent.prototype.setClasses = function () {
        var classes = {
            'important': this.important,
            'large': this.size === 'large',
            'small': this.size === 'small',
            'loading': this.loading == true,
        };
        return classes;
    };
    ParticipantComponent.prototype.playing = function () {
        console.log("The video is playing");
        this.loading = false;
    };
    ParticipantComponent.prototype.ngOnDestroy = function () {
        console.log("* Participant(" + this._userName + ").onDestroy " + new Date().toLocaleTimeString());
        this.dispose();
        //this.participants.detachParticipant(this._userName);
        this.participants.destroyParticipant(this._userName);
        this.destroyed$.next(true);
        this.destroyed$.complete();
    };
    return ParticipantComponent;
}());
__decorate([
    core_1.ViewChild('video'),
    __metadata("design:type", core_1.ElementRef)
], ParticipantComponent.prototype, "video", void 0);
__decorate([
    core_1.Input('userName'),
    __metadata("design:type", String)
], ParticipantComponent.prototype, "_userName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ParticipantComponent.prototype, "class", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ParticipantComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ParticipantComponent.prototype, "userType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ParticipantComponent.prototype, "roomId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ParticipantComponent.prototype, "size", void 0);
ParticipantComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-participant',
        styleUrls: ["participant.css"],
        template: participant_html_1.participantComponentTemplate,
    }),
    __metadata("design:paramtypes", [participants_service_1.ParticipantsService, user_service_1.UserService])
], ParticipantComponent);
exports.ParticipantComponent = ParticipantComponent;
//# sourceMappingURL=participant.component.js.map