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
var login_service_1 = require('../../services/login.service');
var user_service_1 = require('../../services/user.service');
var login_html_1 = require('./login.html');
var LoginComponent = (function () {
    function LoginComponent(router, login, me) {
        this.router = router;
        this.login = login;
        this.me = me;
        console.log("% Login constructor ");
        this.user = { userName: "", password: "" };
        console.log("/ Login constructor " + new Date().toLocaleTimeString());
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.login.init();
        this.user.userName = this.login.getLastUserName();
    };
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        console.log("");
        console.log("* Login.doLogin " + new Date().toLocaleTimeString());
        this.login.validateUser(this.user.userName, this.user.password).subscribe(function (validUser) {
            if (validUser.isATutor) {
                console.log("You are a tutor");
                _this.router.navigate(['/room', validUser.userName]);
                console.log("# go to room");
            }
            else {
                console.log("You are an student");
                _this.router.navigate(['/rooms']);
                console.log("# go to waitingRoom");
            }
        }, function (error) {
            alert("Invalid user name or password");
            console.error("Invalid user");
        }, function () { });
        console.log("/ Login.doLogin " + new Date().toLocaleTimeString());
        console.log("");
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-login',
            styleUrls: ["login.css"],
            template: login_html_1.loginTemplate,
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map