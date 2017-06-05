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
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require("@angular/core");
var user_1 = require("../models/user");
/**
 * It allows to share information through all the components.
 */
var UserService = (function () {
    function UserService() {
        this._myRoomName = "";
        console.log("% MyService");
        this._me = new user_1.User();
    }
    UserService.prototype.getMe = function () {
        return this._me;
    };
    UserService.prototype.getMyInfo = function () {
        var myProperties = {
            userName: this._me.userName,
            userType: this._me.userType,
            name: this._me.name,
            surname: this._me.surname,
            email: this._me.email,
            roomName: this._myRoomName
        };
        return myProperties;
    };
    UserService.prototype.registerMe = function (user) {
        console.log('+++++ USER.REGISTERME ++++++++++++'); //%
        console.log(user);
        this._me.userName = user.userName;
        this._me.userType = user.userType;
        this._me.name = user.name;
        this._me.surname = user.surname;
        this._me.email = user.email;
        this._me.userImage = user.userImage;
        this.logged = true;
        console.log("* MyService.me: " + this._me + " ");
    };
    Object.defineProperty(UserService.prototype, "myUserName", {
        get: function () {
            return this._me.userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myUserType", {
        get: function () {
            return this._me.userType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myName", {
        get: function () {
            return this._me.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "mySurname", {
        get: function () {
            return this._me.surname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myEmail", {
        get: function () {
            return this._me.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myUserImageMimeType", {
        get: function () {
            return this._me.userImage && this._me.userImage.mimeType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myUserImageContent", {
        get: function () {
            return this._me.userImage && this._me.userImage.content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myRoomName", {
        get: function () {
            return this._myRoomName;
        },
        set: function (roomName) {
            this._myRoomName = roomName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "myUserImage", {
        set: function (userImage) {
            this._me.userImage = userImage;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.deleteMyRoomName = function () {
        this._myRoomName = "";
    };
    UserService.prototype.amATutor = function () {
        return this._me.isATutor();
    };
    UserService.prototype.amAStudent = function () {
        return this._me.isAStudent();
    };
    UserService.prototype.amLogged = function () {
        return this.logged;
    };
    UserService.prototype.deleteMe = function () {
        console.log('+++++ USER.DELETE    ME ++++++++++++'); //%
        this._me.setToUndefined();
        this._myRoomName = "";
        this.logged = false;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map