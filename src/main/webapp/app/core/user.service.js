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
var room_1 = require("../models/room");
/**
 * It allows to share information through all the components.
 */
var UserService = (function () {
    function UserService() {
        console.log("% MyService");
        this._me = new user_1.User();
        this._currentRoom = new room_1.Room();
        this._lastRoom = new room_1.Room();
    }
    UserService.prototype.getMe = function () {
        return this._me && this._me.json();
    };
    UserService.prototype.getMyCurrentRoom = function () {
        return this._currentRoom && this._currentRoom.json();
    };
    UserService.prototype.getMyLastRoom = function () {
        return this._lastRoom && this._lastRoom.json();
    };
    UserService.prototype.getMyInfo = function () {
        var myProperties = Object.assign(this.getMe(), { room: this.getMyCurrentRoom() });
        return myProperties;
    };
    UserService.prototype.registerMe = function (user) {
        console.log('+++++ USER.REGISTERME ++++++++++++'); //%
        console.log(user);
        this._me.set(user);
        this.logged = true;
        console.log("* MyService.me: " + this._me + " ");
    };
    Object.defineProperty(UserService.prototype, "userName", {
        get: function () {
            return this._me.userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "userType", {
        get: function () {
            return this._me.userType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "name", {
        get: function () {
            return this._me.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "surname", {
        get: function () {
            return this._me.surname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "email", {
        get: function () {
            return this._me.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "userImage", {
        get: function () {
            return this._me.userImage;
        },
        set: function (userImage) {
            this._me.userImage = userImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "userImageMimeType", {
        get: function () {
            return this._me.userImage && this._me.userImage.mimeType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "userImageContent", {
        get: function () {
            return this._me.userImage && this._me.userImage.content;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.registerCurrentRoom = function (room) {
        this._currentRoom.setDataRoom(room);
    };
    UserService.prototype.isThereACurrentRoom = function () {
        return this._currentRoom && this._currentRoom.id > 0;
    };
    Object.defineProperty(UserService.prototype, "currentRoomName", {
        get: function () {
            return this._currentRoom.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "currentRoomId", {
        get: function () {
            return this._currentRoom.id;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.deleteMyCurrentRoom = function () {
        this.registerLastRoom(this._currentRoom.json());
        this._currentRoom.setToUndefined();
    };
    UserService.prototype.registerLastRoom = function (room) {
        this._lastRoom.setDataRoom(room);
    };
    UserService.prototype.isThereALastRoom = function () {
        return this._lastRoom && this._lastRoom.id > 0;
    };
    Object.defineProperty(UserService.prototype, "lastRoomName", {
        get: function () {
            return this._lastRoom.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "lastRoomId", {
        get: function () {
            return this._lastRoom.id;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.amIATutor = function () {
        return this._me.isATutor();
    };
    UserService.prototype.amIAStudent = function () {
        return this._me.isAStudent();
    };
    UserService.prototype.amILogged = function () {
        return this.logged;
    };
    UserService.prototype.amIInARoom = function () {
        return this._currentRoom === null;
    };
    UserService.prototype.deleteMe = function () {
        console.log('+++++ USER.DELETE    ME ++++++++++++'); //%
        this._me.setToUndefined();
        this._currentRoom.setToUndefined();
        this._lastRoom.setToUndefined();
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