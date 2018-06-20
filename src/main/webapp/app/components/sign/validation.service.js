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
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var sign_service_1 = require("./sign.service");
//import { UserFactory } from './../../models/userFactory';
//import { IdMessage } from './../../models/types';
var user_service_1 = require("../../core/user.service");
var ValidationService = (function () {
    function ValidationService(sign, me) {
        this.sign = sign;
        this.me = me;
        this._minPasswordLength = 8;
        this._minLength = 3;
        console.log("*SignService constructor");
    }
    Object.defineProperty(ValidationService.prototype, "minPasswordLength", {
        get: function () {
            return this._minPasswordLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationService.prototype, "minLength", {
        get: function () {
            return this._minLength;
        },
        enumerable: true,
        configurable: true
    });
    // SignUpForm and EditPerfilForm's validators
    ValidationService.prototype.confirmPassword = function (control) {
        return control.root && control.value === control.root.value['password'] ? null : {
            confirmPassword: true
        };
    };
    ValidationService.prototype.checkPassword = function (control) {
        var password = control.get('password');
        var confirmationPassword = control.get('confirmationPassword');
        if (!password || !confirmationPassword)
            return null;
        return password.value === confirmationPassword.value ? null : {
            checkPassword: true
        };
    };
    ValidationService.prototype.validateUserName = function (control) {
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    ValidationService.prototype.validateEmail = function (control) {
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    /**
    * It checks, when a new user is going to register, that the user name and the email don't exists in the data base.
    */
    ValidationService.prototype.checkField = function (value, field) {
        var _this = this;
        console.log("check" + field + ": " + value);
        return new Rx_1.Observable(function (obs) {
            console.log(" new Observable");
            var infoField = {
                field: field,
                value: value,
                userName: _this.me.userName
            };
            _this.sign.validateField(infoField)
                .subscribe(function (response) {
                obs.next(null);
                obs.complete();
            }, function (error) {
                var key;
                var message = error.json().message;
                if (message === "userName taken") {
                    key = 'userNameTaken';
                }
                else if (message === "email taken") {
                    key = 'emailTaken';
                }
                obs.next((_a = {}, _a[key] = true, _a));
                obs.complete();
                var _a;
            });
        });
    };
    // EditPerfilForm validator
    ValidationService.prototype.validateNewPasswordLength = function (control) {
        return (control.root && ((control.value.length == 0) || (control.value.length >= 8))) ? null : {
            validateNewPasswordLength: { actualLength: control.value.length, requiredLength: 8 }
        };
    };
    ValidationService.prototype.validateEmailPattern = function (control) {
        var emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
        return emailRegExp.test(control.value) ? null : {
            emailPattern: true
        };
    };
    return ValidationService;
}());
ValidationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [sign_service_1.SignService, user_service_1.UserService])
], ValidationService);
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map