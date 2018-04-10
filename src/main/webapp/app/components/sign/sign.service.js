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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var connection_service_1 = require("./../../core/connection.service");
var user_service_1 = require("./../../core/user.service");
//type UserMessage = { userName: string, userType: string, name: string}
//type LoginMessage = UserMessage & IdMessage;
//type LogoutMessage = { userName: string } & IdMessage;
// Messages to the server
var WS_MSG_ID_LOGIN = 'login';
var WS_MSG_ID_LOGOUT = 'logout';
var VALIDATE_USER_ENDPOINT = "validateUser";
var VALIDATE_ENDPOINT = "validateField";
var REGISTER_ENDPOINT = "register";
var EDIT_PERFIL_ENDPOINT = "editPerfil";
var SignService = (function () {
    function SignService(http, connection, me) {
        this.http = http;
        this.connection = connection;
        this.me = me;
        console.log("*SignService constructor");
    }
    SignService.prototype.validateUser = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(user);
        console.log(this.http); //%%
        return this.http.post("" + this.connection.urlServer + VALIDATE_USER_ENDPOINT, body, options)
            .map(function (res) {
            console.log("VALIDATE USER");
            console.log(res);
            console.log(res.toString());
            if (res.status = 200) {
                console.log("res.json(): " + res.json());
                //this.createUser(res.json());
                return res.json();
            }
            else {
                console.log("res.status: " + res.status);
                return null;
            }
        })
            .catch(function (error) { return Rx_1.Observable.throw(error); });
    };
    SignService.prototype.validateField = function (fieldToValidate) {
        console.log("Validate:  " + fieldToValidate);
        var body = JSON.stringify(fieldToValidate);
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("" + this.connection.urlServer + VALIDATE_ENDPOINT, body, options);
    };
    ;
    SignService.prototype.registerNewUser = function (user) {
        console.log(user);
        console.log(JSON.stringify(user));
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(user);
        return this.http.post("" + this.connection.urlServer + REGISTER_ENDPOINT, body, options)
            .map(function (res) {
            console.log("REGISTER USER");
            console.log(res);
            console.log(res.toString());
            var success;
            if (res.status == 200) {
                // this.createUser(res.json());
                return res.json();
            }
            else {
                console.log("The user is not registered");
                success = false;
                return null;
            }
        })
            .catch(function (error) { return Rx_1.Observable.throw(error); });
    };
    SignService.prototype.login = function (user) {
        console.log("");
        console.log("* SignService.createUser " + new Date().toLocaleTimeString());
        console.log(user);
        /* //*
        let um :LoginMessage = {
            id: WS_MSG_ID_LOGIN,
            name: user.name,
            userName: user.userName,
            userType: user.userType
        }

        // this.connection.sendMessage(um);
        */
        this.connection.sendWSMessage(WS_MSG_ID_LOGIN, user);
        console.log("/ SignService.createUser " + new Date().toLocaleTimeString());
        console.log("");
    };
    SignService.prototype.modifyPerfilUser = function (user) {
        console.log(user);
        Object.assign(user, { userName: this.me.userName });
        console.log(JSON.stringify(user));
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(user);
        return this.http.post("" + this.connection.urlServer + EDIT_PERFIL_ENDPOINT, body, options)
            .map(function (res) {
            console.log("REDIT PERFIL");
            console.log(res);
            console.log(res.toString());
            var success;
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
            .catch(function (error) { return Rx_1.Observable.throw(error); });
    };
    SignService.prototype.logout = function (user) {
        console.log("");
        console.log("* <- SignService.logOut " + new Date().toLocaleTimeString());
        this.connection.sendWSMessage(WS_MSG_ID_LOGOUT, user);
        this.me.deleteMe();
        console.log("/ SignService.logOut " + new Date().toLocaleTimeString());
        console.log("");
    };
    return SignService;
}());
SignService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, connection_service_1.ConnectionService, user_service_1.UserService])
], SignService);
exports.SignService = SignService;
//# sourceMappingURL=sign.service.js.map