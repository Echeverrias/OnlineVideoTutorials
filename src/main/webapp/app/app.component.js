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
var connection_service_1 = require('./services/connection.service');
var user_service_1 = require('./services/user.service');
var AppComponent = (function () {
    function AppComponent(connection, me) {
        this.connection = connection;
        this.me = me;
        console.log("% AppComponent constructor");
        console.log("/ AppComponent constructor");
    }
    AppComponent.prototype.beforeunloadHandler = function (event) {
        console.log(event);
        if (!sessionStorage.getItem("downloadEvent")) {
            console.log(this.me);
            console.log(this.me.myUserName);
            var jsonMessage = {
                id: "closeTab",
                userName: this.me.myUserName,
                roomName: this.me.myRoomName
            };
            console.log(jsonMessage);
            this.connection.sendMessage(jsonMessage);
            this.connection.destroy();
        }
        sessionStorage.removeItem("downloadEvent");
    };
    ;
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "beforeunloadHandler", null);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-app',
            styleUrls: ["app.css"],
            template: "\n        <div id=\"ovt-app\">\n       <router-outlet></router-outlet>\n       </div>"
        }), 
        __metadata('design:paramtypes', [connection_service_1.ConnectionService, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map