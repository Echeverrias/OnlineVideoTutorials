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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var connection_service_1 = require('./connection.service');
var handler_service_1 = require('./handler.service');
var user_service_1 = require('./user.service');
var SignService = (function () {
    function SignService(http, connection, handler, me) {
        this.http = http;
        this.connection = connection;
        this.handler = handler;
        this.me = me;
        this.validateUserEndPoint = "validateUser";
        this.registerEndPoint = "register";
        console.log("*SignService constructor");
        this.logOut();
    }
    SignService.prototype.init = function () {
        console.log("*SignService.init");
        // Reset login status
        //this.destroyMe();
    };
    SignService.prototype.validateUser = function (userName, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({ userName: userName, password: password });
        console.log(this.http); //%%
        return this.http.post("" + this.connection.urlServer + this.validateUserEndPoint, body, options)
            .map(function (res) {
            if (res.status == 200) {
                console.log("res.json(): " + res.json());
                _this.createUser(res.json());
            }
            else {
                console.log("res.status: " + res.status);
            }
            return res.json();
        })
            .catch(function (error) { return Rx_1.Observable.throw(error); });
    };
    SignService.prototype.registerNewUser = function (user) {
        var _this = this;
        console.log(user);
        console.log(JSON.stringify(user));
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(user);
        return this.http.post("" + this.connection.urlServer + this.registerEndPoint, body, options)
            .map(function (res) {
            var exit;
            if (res.status == 200) {
                _this.createUser(user);
                exit = true;
            }
            else {
                exit = false;
            }
            return exit;
        })
            .catch(function (error) { return Rx_1.Observable.throw(error); });
    };
    SignService.prototype.createUser = function (user) {
        console.log("");
        console.log("* SignService.createUser " + new Date().toLocaleTimeString());
        console.log(user);
        localStorage.setItem('ovtUser', JSON.stringify(user));
        localStorage.setItem('ovtLastUserName', user.userName);
        this.me.registerMe(user);
        console.log(this.me.getMe());
        var jsonMessage = {
            id: "login",
            userName: this.me.myUserName,
            name: this.me.myName,
            userType: this.me.myUserType
        };
        this.connection.sendMessage(jsonMessage);
        console.log("/ SignService.createUser " + new Date().toLocaleTimeString());
        console.log("");
    };
    SignService.prototype.getLastUserName = function () {
        return localStorage.getItem('ovtLastUserName');
    };
    SignService.prototype.logOut = function () {
        console.log("");
        console.log("* <- SignService.logOut " + new Date().toLocaleTimeString());
        if (this.me.amLogged()) {
            console.log("* I'm going to logout me");
            var jsonMessage = {
                id: "logout",
                userName: this.me.myUserName,
            };
            this.connection.sendMessage(jsonMessage);
            this.me.deleteMe();
        }
        console.log("/ SignService.logOut " + new Date().toLocaleTimeString());
        console.log("");
    };
    SignService.prototype.destroyMe = function () {
        console.log("*SignService.destroyMe");
        //localStorage.removeItem('ovtUser');
    };
    SignService.prototype.destroy = function () {
        console.log("*SignService.destroy");
    };
    SignService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, connection_service_1.ConnectionService, handler_service_1.HandlerService, user_service_1.UserService])
    ], SignService);
    return SignService;
}());
exports.SignService = SignService;
//# sourceMappingURL=sign.service.js.map