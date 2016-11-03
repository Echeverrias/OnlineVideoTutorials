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
var participant_service_1 = require('../../services/participant.service');
var participant_html_1 = require('./participant.html');
var ParticipantComponent = (function () {
    function ParticipantComponent(participant) {
        this.participant = participant;
        console.log("");
        console.log("% Participant constructor " + new Date().toLocaleTimeString());
        this.important = false;
        console.log("/ Participant constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    ParticipantComponent.prototype.ngOnInit = function () {
        //console.log(`Participant.onInit - userType: ${this.userType}`);
    };
    ParticipantComponent.prototype.ngAfterViewInit = function () {
        console.log("   ngAfterViewInit");
        console.log("* Participant.afterViewInit: " + this.id + " " + new Date().toLocaleTimeString());
        this._userName = this.id;
        this.participant.init(this.id, this.video.nativeElement, this.roomName);
        //this.participant.signIn(this);
    };
    Object.defineProperty(ParticipantComponent.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    ParticipantComponent.prototype.setClasses = function () {
        var classes = {
            'important': this.important,
        };
        return classes;
    };
    ParticipantComponent.prototype.ngOnDestroy = function () {
        console.log("* Participant(" + this._userName + ").onDestroy " + new Date().toLocaleTimeString());
        this.participant.destroy();
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
            selector: 'ovt-participant',
            styleUrls: ["participant.css"],
            template: participant_html_1.participantComponentTemplate,
            providers: [participant_service_1.ParticipantService]
        }), 
        __metadata('design:paramtypes', [participant_service_1.ParticipantService])
    ], ParticipantComponent);
    return ParticipantComponent;
}());
exports.ParticipantComponent = ParticipantComponent;
//# sourceMappingURL=participant.component.js.map