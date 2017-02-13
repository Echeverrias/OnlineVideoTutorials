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
var forms_1 = require('@angular/forms');
var Rx_1 = require('rxjs/Rx');
var sign_service_1 = require('../../services/sign.service');
var user_service_1 = require('../../services/user.service');
var sign_html_1 = require('./sign.html');
var SignComponent = (function () {
    function SignComponent(router, formBuilder, sign, me) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.sign = sign;
        this.me = me;
        console.log("% Sign constructor ");
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.signIn = true;
        console.log("/ Sign constructor " + new Date().toLocaleTimeString());
    }
    SignComponent.prototype.ngOnInit = function () {
        this.signInForm = this.formBuilder.group({
            userName: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]]
        });
        this.signUpForm = this.formBuilder.group({
            userName: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)], this.validateUserName.bind(this)],
            password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            confirmPassword: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3), this.confirmPassword.bind(this)]],
            name: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            surname: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            email: ["", [forms_1.Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
            userType: ["", forms_1.Validators.required]
        });
        this.sign.init();
        this.user.userName = this.sign.getLastUserName();
    };
    SignComponent.prototype.validateEmailPattern = function (control) {
        //let emailRegExp = /^[a-zA-Z0-9!#$%&*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-]{2,4}$/
        var emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
        emailRegExp.test(control.value) ? console.log("valid email") : console.log("invalid email");
        return emailRegExp.test(control.value) ? null : {
            validEmail: true
        };
    };
    SignComponent.prototype.validateUserName = function (control) {
        console.log("validateUserName");
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    SignComponent.prototype.validateEmail = function (control) {
        console.log("validateEmail");
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    SignComponent.prototype.checkField = function (value, field) {
        var _this = this;
        console.log("check" + field + ": " + value);
        return new Rx_1.Observable(function (obs) {
            console.log(" new Observable");
            _this.sign.validateField(value, field)
                .subscribe(function (data) {
                obs.next(null);
                obs.complete();
            }, function (error) {
                var key;
                var message = error.json().message;
                if (message === "userName taken") {
                    key = 'validUserName';
                }
                else if (message === "email taken") {
                    key = 'validEmail';
                }
                obs.next((_a = {}, _a[key] = true, _a));
                obs.complete();
                var _a;
            });
        });
    };
    SignComponent.prototype.confirmPassword = function (control) {
        return this.signUpForm && control.value === this.signUpForm.value['password'] ? null : {
            confirmPassword: true
        };
    };
    SignComponent.prototype.onChangeToSignUp = function () {
        console.log("onChangeToSignUp()");
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.signIn = false;
        this.checkFields = false;
    };
    SignComponent.prototype.onGoingToClick = function () {
        console.log("onGoingToClick");
        console.log(this.user);
        this.checkFields = true;
        console.log("checkFields: " + this.checkFields);
        console.log(this.signInForm);
        console.log(this.signInForm.controls);
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);
    };
    SignComponent.prototype.doSignUp = function () {
        var _this = this;
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);
        this.sign.registerNewUser(this.signUpForm.value).subscribe(function (success) {
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
        this.sign.validateUser(this.signInForm.value).subscribe(function (validUser) {
            console.log("VALID USER");
            console.log(validUser);
            if (validUser.isATutor()) {
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
    SignComponent.prototype.onReturnToSignIn = function () {
        this.signIn = true;
        this.checkFields = false;
        this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
    };
    SignComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-sign',
            styleUrls: ["sign.css"],
            template: sign_html_1.signTemplate,
            providers: [sign_service_1.SignService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, sign_service_1.SignService, user_service_1.UserService])
    ], SignComponent);
    return SignComponent;
}());
exports.SignComponent = SignComponent;
//# sourceMappingURL=sign.component.js.map