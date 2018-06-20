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
var Observable_1 = require("rxjs/Observable");
var user_service_1 = require("./user.service");
var LAST_USER_NAME_KEY = 'ovtLastUserName';
var REMEMBER_PASSWORD_KEY = 'ovtRememberPassword';
var encrypt = function (value, token) {
    var newValue = value.split('').map(function (c) { return c.charCodeAt(0) + token; });
    return newValue.join('.');
};
var decrypt = function (value, token) {
    var newValue = value.split('.').map(function (c) { return String.fromCharCode(Number(c) - token); });
    return newValue.join('');
};
var AuthService = (function () {
    function AuthService(me) {
        this.me = me;
        this.auth_token = '';
        this._rememberPassword = localStorage.getItem(REMEMBER_PASSWORD_KEY) === 'true';
        this._encrypt = function (encryptFunction, token) {
            var cache = {};
            return function (value) {
                if (cache[value]) {
                    return cache[value];
                }
                else {
                    var out = encryptFunction(value, token);
                    cache[value] = out;
                    return out;
                }
            };
        };
        this._decrypt = function (encryptFunction, token) {
            var cache = {};
            return function (value) {
                if (cache[value]) {
                    return cache[value];
                }
                else {
                    var out = encryptFunction(value, token);
                    cache[value] = out;
                    return out;
                }
            };
        };
        console.log('Auth.Service');
        console.log('Auth.Service.rememberedUserName', this.rememberedUserName);
        this.setEncrypTionToken(this.rememberedUserName);
    }
    AuthService.prototype.authenticate = function (userName, password) {
        this.auth_token = userName;
        return new Observable_1.Observable();
    };
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.auth_token && this.auth_token.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "rememberPassword", {
        get: function () {
            return this._rememberPassword;
        },
        set: function (rememberPassword) {
            this._rememberPassword = rememberPassword;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.registerUser = function (user) {
        if (user) {
            console.log('AuthService.registerUser()', user);
            this.me.registerMe(user);
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.login = function (user) {
        console.log('AuthService.login()', user);
        this.authenticate(user.userName, user.password);
        this.setEncrypTionToken(user.userName);
        this.setDefaultStorage(user);
        if (this._rememberPassword) {
            this.saveCredentials(user.userName, user.password);
        }
        else {
            this.cleanCredentials(user.userName);
        }
    };
    AuthService.prototype.setDefaultStorage = function (user) {
        localStorage.setItem(REMEMBER_PASSWORD_KEY, this._rememberPassword ? "true" : "false");
        localStorage.setItem(LAST_USER_NAME_KEY, user.userName);
        sessionStorage.setItem(this.ec(user.userName), this.ec(user.password));
    };
    AuthService.prototype.updateUserLogin = function (user) {
        if (this._rememberPassword) {
            this.saveCredentials(this.ec(user.userName), this.ec(user.password));
        }
    };
    AuthService.prototype.setEncrypTionToken = function (seed) {
        var count = seed.split('')
            .reduce(function (a, c) { return a + c.charCodeAt(0); }, 0);
        this.encryption_token = Math.floor(count / 2);
        this.ec = this._encrypt(encrypt, this.encryption_token);
        this.de = this._encrypt(decrypt, this.encryption_token);
        console.log('this.ec', this.ec);
    };
    AuthService.prototype.encrypt = function (value) {
        var _this = this;
        var newValue = value.split('').map(function (c) { return c.charCodeAt(0) + _this.encryption_token; });
        return newValue.join('.');
    };
    AuthService.prototype.decrypt = function (value) {
        var _this = this;
        var newValue = value.split('.').map(function (c) { return String.fromCharCode(Number(c) - _this.encryption_token); });
        return newValue.join('');
    };
    AuthService.prototype.theUserIsLogged = function () {
        console.log('AuthService.theUserIsLogged: ', this.auth_token && this.auth_token.length > 0),
            console.log('AuthService..auth_token: ', this.auth_token);
        return (this.auth_token && this.auth_token.length > 0);
    };
    Object.defineProperty(AuthService.prototype, "loggedUser", {
        get: function () {
            return this.me.getMe();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "rememberedUserName", {
        get: function () {
            return localStorage.getItem(LAST_USER_NAME_KEY) || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "rememberedPassword", {
        get: function () {
            var userName = localStorage.getItem(LAST_USER_NAME_KEY);
            return localStorage.getItem(this.ec(userName)) || '';
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.getPassword = function (userName) {
        var pass = localStorage.getItem(this.ec(userName));
        if (!pass) {
            pass = sessionStorage.getItem(this.ec(userName));
        }
        ;
        console.log("Auth.service.getPassword(" + userName + "): " + pass, this.ec(userName));
        return pass ? this.decrypt(pass) : "";
    };
    AuthService.prototype.saveCredentials = function (userName, password) {
        console.log("AuthService.saveCredentials(" + userName + ", " + password + ")");
        localStorage.setItem(this.ec(userName), this.ec(password));
    };
    AuthService.prototype.cleanCredentials = function (userName) {
        localStorage.setItem(this.ec(userName), "");
    };
    AuthService.prototype.logout = function () {
        if (this.me && this.me.userName) {
            this.me.deleteMe();
            this.initStorage();
            // Reset login status
            //localStorage.removeItem('ovtUser'); // No porque puede ser que le haya dado a recordar contraseña
        }
    };
    AuthService.prototype.initStorage = function () {
        //  sessionStorage.setItem(localStorage.getItem(LAST_USER_NAME_KEY), undefined),
        this.rememberPassword = localStorage.getItem(REMEMBER_PASSWORD_KEY) === 'true';
        this.auth_token = '';
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map