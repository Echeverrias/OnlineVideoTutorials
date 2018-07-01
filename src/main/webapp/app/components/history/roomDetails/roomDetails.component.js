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
var roomDetails_html_1 = require("./roomDetails.html");
var history_types_1 = require("./../history.types");
var RoomDetailsComponent = (function () {
    function RoomDetailsComponent() {
        this.participantsSelected = false;
        this.filesSelected = false;
        console.log("");
        console.log("% RoomDetailsComponent constructor " + new Date().toLocaleTimeString());
        console.log("/ RoomDetailsComponent constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    RoomDetailsComponent.prototype.ngOnChanges = function (changes) {
        console.log('onChanges');
        var dsNow = changes['detailsSelected'].currentValue;
        this.participantsSelected = this.participantsSelected && dsNow;
        this.filesSelected = this.filesSelected && dsNow;
    };
    RoomDetailsComponent.prototype.onStopPropagation = function (event) {
        console.log("onStopPropagation");
        event.stopPropagation();
    };
    RoomDetailsComponent.prototype.showOrHideDetails = function () {
        console.log('click showOrHideDetails');
        this.detailsSelected = !this.detailsSelected;
        if (!this.detailsSelected) {
            this.participantsSelected = false;
            this.filesSelected = false;
        }
    };
    RoomDetailsComponent.prototype.showOrHideParticipants = function () {
        console.log('click showOrHideParticipants');
        this.participantsSelected = !this.participantsSelected;
    };
    RoomDetailsComponent.prototype.showOrHideFiles = function () {
        console.log(' click showOrHideFiles');
        this.filesSelected = !this.filesSelected;
    };
    RoomDetailsComponent.prototype.onDownload = function () {
        // The download event trigger the beforeunload event
        //console.log('downloadEvent');
        //sessionStorage.setItem('downloadEvent', 'true'); 
    };
    return RoomDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", history_types_1.RoomHistory)
], RoomDetailsComponent.prototype, "room", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RoomDetailsComponent.prototype, "detailsSelected", void 0);
RoomDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-room-details',
        styleUrls: ["roomDetails.css"],
        template: roomDetails_html_1.roomDetailsTemplate,
    }),
    __metadata("design:paramtypes", [])
], RoomDetailsComponent);
exports.RoomDetailsComponent = RoomDetailsComponent;
//# sourceMappingURL=roomDetails.component.js.map