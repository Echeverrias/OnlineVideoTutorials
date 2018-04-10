/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TUTOR = "tutor";
var STUDENT = "student";
var User = (function () {
    function User(userName, userType, name, surname, email) {
        this._userName = "";
        this._name = "";
        this._surname = "";
        this._email = "";
        this._userType = ""; // 'tutor' or 'student'
        console.log("");
        console.log("% User " + new Date().toLocaleTimeString());
        if (arguments.length == 3) {
            console.log("username: " + userName + ", userType: " + userType + ", name: " + name);
            this._userName = userName;
            this._userType = userType;
            this._name = name;
            this._surname = "";
            this._email = "";
        }
        else if (arguments.length == 5) {
            console.log("username: " + userName + ", userType: " + userType + ", name: " + name);
            this._userName = userName;
            this._userType = userType;
            this._name = name;
            this._surname = surname;
            this._email = email;
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
        set: function (userName) {
            this._userName = userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "surname", {
        get: function () {
            return this._surname;
        },
        set: function (surname) {
            this._surname = surname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userType", {
        get: function () {
            return this._userType;
        },
        set: function (userType) {
            this._userType = userType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            this._email = email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userImage", {
        get: function () {
            return this._userImage;
        },
        set: function (userImage) {
            this._userImage = userImage;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.json = function () {
        return {
            userName: this._userName,
            name: this._name,
            surname: this._surname,
            userType: this._userType,
            email: this._email
        };
    };
    User.prototype.set = function (user) {
        console.log('User.set');
        console.log(user);
        this._userName = user.userName;
        this._userType = user.userType;
        this._name = user.name;
        this._surname = user.surname;
        this._email = user.email;
        this._userImage = user.userImage;
    };
    User.prototype.setToUndefined = function () {
        this._userName = "";
        this._userType = "";
        this._name = "";
        this._surname = "";
        this._email = "";
        this._userImage = null;
    };
    User.prototype.isATutor = function () {
        return this._userType === TUTOR;
    };
    User.prototype.isAStudent = function () {
        return this._userType === STUDENT;
    };
    User.prototype.exist = function () {
        console.log("exist");
        if (this._userName) {
            return true;
        }
        else {
            return false;
        }
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map