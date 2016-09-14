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
/**
 * It allows to share information through all the components
 */
var MyService = (function () {
    function MyService() {
        console.log("% MyService");
    }
    MyService.prototype.getMe = function () {
        return this._me;
    };
    MyService.prototype.addMe = function (user) {
        this._me = user;
        console.log("* MyService.me: " + this._me + " ");
    };
    Object.defineProperty(MyService.prototype, "myUserName", {
        get: function () {
            return this._me.userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyService.prototype, "myUserType", {
        get: function () {
            return this._me.userType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyService.prototype, "myName", {
        get: function () {
            return this._me.name;
        },
        enumerable: true,
        configurable: true
    });
    MyService.prototype.amATutor = function () {
        return this._me.isATutor();
    };
    MyService.prototype.amAStudent = function () {
        return this._me.isAStudent();
    };
    MyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyService);
    return MyService;
}());
exports.MyService = MyService;
//# sourceMappingURL=myService.js.map