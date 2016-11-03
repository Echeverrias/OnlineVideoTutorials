/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
"use strict";
var TUTOR = "tutor";
var STUDENT = "student";
var User = (function () {
    function User(userName, userType, name) {
        this._userName = null;
        this._name = null;
        this._userType = null; // 'tutor' or 'student'
        console.log("");
        console.log("% User " + new Date().toLocaleTimeString());
        if (arguments.length == 3) {
            console.log("username: " + userName + ", userType: " + userType + ", name: " + name);
            this._userName = userName;
            this._userType = userType;
            this._name = name;
        }
        console.log("/ User " + new Date().toLocaleTimeString());
        console.log("");
    }
    Object.defineProperty(User, "tutorType", {
        get: function () {
            return TUTOR;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User, "studentType", {
        get: function () {
            return STUDENT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userType", {
        get: function () {
            return this._userType;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.set = function (user) {
        this._userName = user.userName;
        this._userType = user.userType;
        this._name = user.name;
    };
    User.prototype.setToUndefined = function () {
        this._userName = null;
        this._userType = null;
        this._name = null;
    };
    User.prototype.isATutor = function () {
        return this._userType === User.tutorType;
    };
    User.prototype.isAStudent = function () {
        return this._userType === User.studentType;
    };
    User.prototype.exist = function () {
        return this._userName != null;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map