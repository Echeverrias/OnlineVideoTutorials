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
var router_1 = require('@angular/router');
var connection_1 = require('../../services/connection');
var myService_1 = require('../../services/myService');
var userFactory_1 = require('../../services/userFactory');
var login_html_1 = require('./login.html');
var LoginComponent = (function () {
    function LoginComponent(router, connection, appService) {
        this.router = router;
        this.connection = connection;
        this.appService = appService;
        console.log("% Login constructor ");
        this.user = {
            userName: "",
            password: ""
        };
        console.log("/ Login constructor " + new Date().toLocaleTimeString());
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.onLoginSubscription = this.connection.subscriptions.subscribeToLogin(this, this.onLogin);
        console.log(this.onLoginSubscription);
        this.user.password = "ZZZ";
    };
    LoginComponent.prototype.doLogin = function () {
        console.log("");
        console.log("* Login.doLogin " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "login",
            userName: this.user.userName,
            password: this.user.password,
        };
        this.connection.sendMessage(jsonMessage);
        console.log("/ Login.doLogin " + new Date().toLocaleTimeString());
        console.log("");
    };
    LoginComponent.prototype.onLogin = function (jsonMessage) {
        console.log("");
        console.log("* <- Login.onLogin " + new Date().toLocaleTimeString());
        if (jsonMessage.validUser) {
            console.log("is a valid user?: " + jsonMessage.validUser);
            console.log("Type user: " + jsonMessage.userType);
            this.appService.addMe(userFactory_1.UserFactory.createAnUser(jsonMessage));
            if (this.appService.amATutor()) {
                console.log("You are a tutor");
                this.router.navigate(['/room', jsonMessage.roomName]);
                console.log("# go to room");
            }
            else {
                console.log("You are an student");
                this.router.navigate(['/rooms']);
                console.log("# go to waitingRoom");
            }
        }
        else {
            alert("Invalid user name or password");
            console.error(jsonMessage.id);
            console.error(jsonMessage.validUser);
            console.error(jsonMessage.typeUSer);
            console.error("Invalid user");
        }
        console.log("/ Login.onLogin " + new Date().toLocaleTimeString());
        console.log("");
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        console.log("* Login.onDestroy ");
        this.onLoginSubscription.unsubscribe();
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-login',
            styleUrls: ["login.css"],
            template: login_html_1.loginTemplate
        }), 
        __metadata('design:paramtypes', [router_1.Router, connection_1.Connection, myService_1.MyService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map