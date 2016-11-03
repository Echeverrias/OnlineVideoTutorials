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
var Subject_1 = require('rxjs/Subject');
var connection_service_1 = require('./connection.service');
var handler_service_1 = require('./handler.service');
var user_service_1 = require('./user.service');
var userFactory_1 = require('../models/userFactory');
var LoginService = (function () {
    function LoginService(connection, handler, me) {
        var _this = this;
        this.connection = connection;
        this.handler = handler;
        this.me = me;
        console.log("*LoginService constructor");
        this.userValidationObserver = new Subject_1.Subject();
        this.eeLogin = new core_1.EventEmitter();
        this.eeLogin.subscribe(function (data) { _this.onLogin(data); });
        this.handler.attach('login', this.eeLogin);
        this.logOut();
    }
    LoginService.prototype.init = function () {
        console.log("*LoginService.init");
        // Reset login status
        //this.destroyMe();
    };
    LoginService.prototype.doLogin = function (userName, password) {
        console.log("");
        console.log("* LogiService.doLogin " + new Date().toLocaleTimeString());
        var jsonMessage = {
            id: "login",
            userName: userName,
            password: password,
        };
        this.connection.sendMessage(jsonMessage);
        console.log("/ LogiService.doLogin " + new Date().toLocaleTimeString());
        console.log("");
        return this.userValidationObserver;
    };
    LoginService.prototype.onLogin = function (msg) {
        console.log("");
        console.log("* <- LogiService.onLogin " + new Date().toLocaleTimeString());
        console.log("/ LogiService.onLogin " + new Date().toLocaleTimeString());
        console.log("");
        console.log("is a valid user?: " + msg.validUser);
        if (msg.validUser) {
            var user = userFactory_1.UserFactory.createAnUser(msg);
            localStorage.setItem('ovtUser', JSON.stringify(user));
            localStorage.setItem('ovtLastUserName', msg.userName);
            this.me.registerMe(user);
        }
        this.userValidationObserver.next(msg.validUser);
    };
    LoginService.prototype.getLastUserName = function () {
        return localStorage.getItem('ovtLastUserName');
    };
    LoginService.prototype.logOut = function () {
        console.log("");
        console.log("* <- LoginService.logOut " + new Date().toLocaleTimeString());
        if (this.me.amLogged()) {
            console.log("* I'm going to logout me");
            var jsonMessage = {
                id: "logout",
                userName: this.me.myUserName,
            };
            this.connection.sendMessage(jsonMessage);
            this.me.deleteMe();
        }
        console.log("/ LoginService.logOut " + new Date().toLocaleTimeString());
        console.log("");
    };
    LoginService.prototype.destroyMe = function () {
        console.log("*LoginService.destroyMe");
        //localStorage.removeItem('ovtUser');
    };
    LoginService.prototype.destroy = function () {
        console.log("*LoginService.destroy");
        this.eeLogin.unsubscribe();
        this.handler.detach('login');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [connection_service_1.ConnectionService, handler_service_1.HandlerService, user_service_1.UserService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map