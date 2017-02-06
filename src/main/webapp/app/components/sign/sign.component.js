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
var sign_service_1 = require('../../services/sign.service');
var user_service_1 = require('../../services/user.service');
var sign_html_1 = require('./sign.html');
var SignComponent = (function () {
    function SignComponent(router, sign, me) {
        this.router = router;
        this.sign = sign;
        this.me = me;
        this.email_regexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        console.log("% Sign constructor ");
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.signIn = true;
        console.log("/ Sign constructor " + new Date().toLocaleTimeString());
    }
    SignComponent.prototype.ngOnInit = function () {
        this.sign.init();
        this.user.userName = this.sign.getLastUserName();
    };
    SignComponent.prototype.onChangeToSignUp = function () {
        console.log("onChangeToSignUp()");
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.signIn = false;
        this.checkField = false;
    };
    SignComponent.prototype.onGoingToClick = function () {
        console.log("onGoingToClick");
        console.log(this.user);
        this.checkField = true;
        console.log("checkField: " + this.checkField);
    };
    SignComponent.prototype.doSignUp = function () {
        var _this = this;
        this.sign.registerNewUser(this.user).subscribe(function (success) {
            if (success) {
                if (_this.me.amATutor()) {
                    console.log("You are a tutor");
                    _this.router.navigate(['/room', _this.me.myUserName]);
                    console.log("# go to room");
                }
                else {
                    console.log("You are an student");
                    _this.router.navigate(['/rooms']);
                    console.log("# go to waitingRoom");
                }
            }
        }, function (error) {
            console.log("ERROR");
            alert(error.json().message);
            console.error(error.json().message);
        }, function () { });
    };
    SignComponent.prototype.doSignIn = function () {
        var _this = this;
        console.log("");
        console.log("* Sign.doSignIn " + new Date().toLocaleTimeString());
        this.sign.validateUser(this.user.userName, this.user.password).subscribe(function (validUser) {
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
            alert("El nombre de usuario o la contraseña son incorrectos");
            console.log("ERROR");
            console.log("error: " + error);
            console.log(error);
            console.error("Invalid user name or password");
        }, function () { });
        console.log("/ sign.doSignIn " + new Date().toLocaleTimeString());
        console.log("");
    };
    SignComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-sign',
            styleUrls: ["sign.css"],
            template: sign_html_1.signTemplate,
            providers: [sign_service_1.SignService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, sign_service_1.SignService, user_service_1.UserService])
    ], SignComponent);
    return SignComponent;
}());
exports.SignComponent = SignComponent;
//# sourceMappingURL=sign.component.js.map