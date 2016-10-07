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
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var connection_1 = require('./services/connection');
var loginComponent_1 = require('./components/login/loginComponent');
var roomComponent_1 = require('./components/room/roomComponent');
var waitingRoomComponent_1 = require('./components/waitingRoom/waitingRoomComponent');
var AppComponent = (function () {
    function AppComponent(connection) {
        this.connection = connection;
        console.log("% AppComponent constructor");
        console.log("/ AppComponent constructor");
    }
    AppComponent.prototype.beforeunloadHandler = function (event) {
        var jsonMessage = {
            id: "closeTab"
        };
        this.connection.sendMessage(jsonMessage);
    };
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "beforeunloadHandler", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, loginComponent_1.LoginComponent],
            styleUrls: ["assets/styles/kurento.css", "assets/styles/main.css"],
            template: "\n        \n        Online Video Tutorials<br>\n       <router-outlet></router-outlet>\n       \n    "
        }),
        router_deprecated_1.RouteConfig([
            { path: '/login', name: 'Login', component: loginComponent_1.LoginComponent, useAsDefault: true },
            { path: '/rooms', name: 'WaitingRoom', component: waitingRoomComponent_1.WaitingRoomComponent },
            { path: '/room/:roomName', name: 'Room', component: roomComponent_1.RoomComponent },
        ]), 
        __metadata('design:paramtypes', [connection_1.Connection])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map