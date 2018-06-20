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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var user_service_1 = require("../../core/user.service");
var room_service_1 = require("./room.service");
var participants_service_1 = require("./participants.service");
var participant_component_1 = require("./participant/participant.component");
var userFactory_1 = require("./../../models/userFactory");
var Subject_1 = require("rxjs/Subject");
var contentDisplayer_component_1 = require("../../shared/components/contentDisplayer/contentDisplayer.component");
var room_html_1 = require("./room.html");
var RoomComponent = (function () {
    function RoomComponent(room, _participants, router, me, route, sanitizer) {
        this.room = room;
        this._participants = _participants;
        this.router = router;
        this.me = me;
        this.route = route;
        this.sanitizer = sanitizer;
        this.options = { validMimeTypes: null };
        this.destroyed$ = new Subject_1.Subject();
        console.log("");
        console.log("% Room constructor " + new Date().toLocaleTimeString());
        this.options.validMimeTypes = contentDisplayer_component_1.ContentDisplayerComponent.getValidMimeTypes();
        console.log("this.me: ", this.me);
        console.log("this.me.getMe(): ", this.me.getMe());
        console.log("this.me.getMyInfo(): ", this.me.getMyInfo());
        console.log(this.participants);
        console.log("/ Room constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    RoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.id = parseInt(params['roomId']);
        });
        console.log("RoomComponent.ngOnInit - this.id: " + this.id); //*
        this.room.init(this.me.getMyInfo());
        //this.room.getParticipants().subscribe((users: User[]): void => { this.users = users } );
        //this.room.getMainParticipant().subscribe((mainUser: User): void  => { this.mainUser = mainUser });
        this.room.getParticipants()
            .takeUntil(this.destroyed$)
            .subscribe(function (users) {
            console.log('RoomComponent.getParticipants()');
            var participants = users.map(function (u) { return userFactory_1.UserFactory.createAnUser(u); });
            _this.setAvailableParticipants(participants);
            console.log('These are the available participants:');
            console.log('this.participants: ', _this.participants);
        });
        this.room.getIncomingParticipant()
            .takeUntil(this.destroyed$)
            .subscribe(function (user) {
            console.log('RoomComponent.getNewParticipant()');
            var participant = userFactory_1.UserFactory.createAnUser(user);
            _this.setNewParticipant(participant);
        });
        this.room.getOutcomingParticipant()
            .takeUntil(this.destroyed$)
            .subscribe(function (userName) { return _this.removeParticipant(userName); });
    };
    RoomComponent.prototype.setAvailableParticipants = function (participants) {
        var students = this.getStudents(participants);
        var tutor = this.findTutor(participants);
        var me = this.findMe(participants);
        if (this.me.amIATutor()) {
            this.mainParticipant = students.splice(0, 1)[0];
            this.participants = students;
        }
        else {
            this.participants = students;
        }
        this.participants.push(me);
        if (tutor && !this.mainParticipant && this.me.amIAStudent()) {
            this.mainParticipant = tutor;
        }
    };
    RoomComponent.prototype.findTutor = function (users) {
        return users.find(function (user) { return user.isATutor(); });
    };
    RoomComponent.prototype.findMe = function (users) {
        var _this = this;
        return users.find(function (user) { return user.userName === _this.me.userName; });
    };
    RoomComponent.prototype.getStudents = function (users) {
        var _this = this;
        return users.filter(function (user) { return user.isAStudent() && (user.userName !== _this.me.userName); });
    };
    RoomComponent.prototype.setNewParticipant = function (participant) {
        if (participant.userName === this.me.userName) {
            this.participants.push(participant);
        }
        else if (participant.isAStudent() && (this.me.amIAStudent() || this.mainParticipant)) {
            this.participants.splice(this.participants.length - 1, 0, participant);
        }
        else {
            this.mainParticipant = participant;
        }
    };
    RoomComponent.prototype.removeParticipant = function (userName) {
        console.log("");
        console.log("* RoomComponent.onRemoveParticipant: " + userName + " " + new Date().toLocaleTimeString());
        if (this.mainParticipant.userName === userName) {
            //this.mainUser.setToUndefined();
            this.mainParticipant = undefined;
        }
        else {
            console.log("The participant to remove isn't the main participant");
            var index = this.getIndexOfParticipant(userName);
            if (index > -1) {
                this.participants.splice(index, 1);
            }
        }
        console.log("users after: " + JSON.stringify(this.participants));
        console.log("/ RoomComponent.onRemoveParticipant " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomComponent.prototype.getIndexOfParticipant = function (userName) {
        return this.participants.findIndex(function (p) { return p.userName === userName; });
    };
    RoomComponent.prototype.onExitOfRoom = function () {
        console.log("");
        console.log("<- Room.onExitOfRoom: " + this.id + " " + new Date().toLocaleTimeString());
        //this.room.onExit();
        this.router.navigate(['/rooms']);
        console.log("/ Room.onExitOfRoom " + new Date().toLocaleTimeString());
        console.log("");
    };
    RoomComponent.prototype.showGadget = function (isSomeGadgetActive) {
        this.activeGadget = isSomeGadgetActive;
    };
    RoomComponent.prototype.onLoadFile = function (fileUrl) {
        console.log("RoomComponent.onLoadFile(" + fileUrl + ")");
        this.showCloseButton = false; //b
        console.log(this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl));
        this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
        this.fileUrl = fileUrl;
    };
    RoomComponent.prototype.onMouseOverFile = function () {
        console.log("onMouseOverFile");
        this.showCloseButton = true; //b
    };
    RoomComponent.prototype.onCloseFile = function () {
        this.fileUrl = undefined;
        this.showCloseButton = false; //b
    };
    RoomComponent.prototype.ngOnDestroy = function () {
        console.log("* Room.OnDestroy " + new Date().toLocaleTimeString());
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this._participants.destroy();
        this.room.destroy();
        this.participants.length = 0;
        this.mainParticipant = null; //this.mainUser.setToUndefined();
        this.me.deleteMyCurrentRoom();
    };
    return RoomComponent;
}());
__decorate([
    core_1.ViewChild(participant_component_1.ParticipantComponent),
    __metadata("design:type", participant_component_1.ParticipantComponent)
], RoomComponent.prototype, "mainParticipantComponent", void 0);
__decorate([
    core_1.ViewChildren(participant_component_1.ParticipantComponent),
    __metadata("design:type", core_1.QueryList)
], RoomComponent.prototype, "participantsComponent", void 0);
RoomComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-room',
        styleUrls: ["room.css"],
        template: room_html_1.roomTemplate,
        providers: [room_service_1.RoomService, participants_service_1.ParticipantsService]
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService, participants_service_1.ParticipantsService, router_1.Router, user_service_1.UserService, router_1.ActivatedRoute, platform_browser_1.DomSanitizer])
], RoomComponent);
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map