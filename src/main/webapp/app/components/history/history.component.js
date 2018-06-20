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
var Subject_1 = require("rxjs/Subject");
var history_service_1 = require("./history.service");
var user_service_1 = require("../../core/user.service");
var history_html_1 = require("./history.html");
var HistoryComponent = (function () {
    function HistoryComponent(history, router, me) {
        this.history = history;
        this.router = router;
        this.me = me;
        // private selectedRoom: RoomHistory = null;
        this.destroyed$ = new Subject_1.Subject();
        // private fileUrl: string = null;
        this.currentPage = 1;
        this.initialRoomsPerPage = 5;
        this.showedRooms = [];
        this.options = [];
        this.totalRooms = 0;
        this.loadingRooms = true;
        console.log("");
        console.log("% HistoryComponent constructor " + new Date().toLocaleTimeString());
        console.log("/ HistoryComponent constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    HistoryComponent.prototype.ngOnInit = function () {
        console.log("HistoryComponent.onInit");
        this.userName = this.me.userName;
        this.getRoomsHistory(this.userName);
        this.roomsPerPage = this.initialRoomsPerPage;
        this.options.push({
            textContent: this.initialRoomsPerPage.toString(),
            value: this.initialRoomsPerPage.toString()
        });
        this.options.push({
            textContent: (this.initialRoomsPerPage + 5).toString(),
            value: (this.initialRoomsPerPage + 5).toString()
        });
        this.options.push({
            textContent: (this.initialRoomsPerPage + 10).toString(),
            value: (this.initialRoomsPerPage + 10).toString()
        });
    };
    HistoryComponent.prototype.getRoomsHistory = function (userName) {
        var _this = this;
        this.history.getRoomsHistory(userName)
            .takeUntil(this.destroyed$)
            .subscribe(function (rooms) {
            _this.loadingRooms = false;
            _this.rooms = rooms.reverse();
            _this.totalRooms = rooms.length;
            _this.options.push({
                textContent: "Todas",
                value: (_this.rooms.length).toString()
            });
            _this.showedRooms = _this.getRoomsPerPage();
            console.log(_this.rooms);
        }, function (error) { return console.log(error); }, function () { return console.log('completed'); });
    };
    HistoryComponent.prototype.onRoomsPerPage = function (roomsPerPage) {
        console.log("History.Component.onRoomsPerPage(" + roomsPerPage + ")");
        console.log("typeOf(roomsPerPage)", typeof (roomsPerPage));
        this.roomsPerPage = Number(roomsPerPage);
        console.log("History.Component.this.roomsPerPage: " + this.roomsPerPage);
        this.goToPage(1);
    };
    HistoryComponent.prototype.goToPage = function (newPage) {
        console.log("History.Component.goToPage(" + newPage + ")");
        this.currentPage = newPage;
        this.showedRooms = this.getRoomsPerPage();
        console.log("this.showedRooms.length: " + this.showedRooms.length, this.showedRooms);
    };
    HistoryComponent.prototype.getRoomsPerPage = function () {
        console.log('HistoryComponent.getRoomsPerPage');
        console.log("this.currentPage: ", this.currentPage);
        console.log("this.roomsPerPage: ", this.roomsPerPage);
        console.log("typeof(this.currentPage): ", typeof (this.currentPage));
        console.log("typeof(this.roomsPerPage): ", typeof (this.roomsPerPage));
        var startIndex = (this.currentPage - 1) * this.roomsPerPage;
        var endIndex = startIndex + this.roomsPerPage;
        console.log(startIndex);
        console.log(endIndex);
        console.log('typeof(startIndex)', typeof (startIndex));
        console.log('typeof(endIndex)', typeof (endIndex));
        console.log("min: " + startIndex + ", max: ", endIndex);
        var rooms = this.rooms.slice(startIndex, endIndex);
        console.log(rooms.length);
        return this.rooms.slice(startIndex, endIndex);
    };
    /*
    onSelectedRoom(room: RoomHistory){
        console.log("click onSelectedRoom");
        if (this.selectedRoom == room){
            this.selectedRoom = null;
        }
        else{
        this.selectedRoom = room;
        }
    }
 */
    /*
    onLoadFile(fileUrl:string){
      this.fileUrl = fileUrl;
    }

    onCloseContentDisplayer(close:boolean){
        console.log('onCloseContentDisplayer: ', close);
            this.onCloseSomeFile();
    }

    private onCloseSomeFile(){
        this.fileUrl = null;
    }
  */
    HistoryComponent.prototype.onReturn = function () {
        this.router.navigate(["/rooms"]);
    };
    HistoryComponent.prototype.ngOnDestroy = function () {
        console.log("");
        console.log("* <- History.ngOnDestroy " + new Date().toLocaleTimeString());
        this.destroyed$.next(true);
        this.destroyed$.complete();
        console.log("/ History.ngOnDestroy " + new Date().toLocaleTimeString());
        console.log("");
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-history',
        styleUrls: ["history.css"],
        template: history_html_1.historyTemplate,
        providers: [history_service_1.HistoryService]
    }),
    __metadata("design:paramtypes", [history_service_1.HistoryService, router_1.Router, user_service_1.UserService])
], HistoryComponent);
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map