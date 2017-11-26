/**
 * NO USAR
 * No tiene mucho sentido que el participante contenga a la room,
 * El UserService se encargará de asociar al usuario con la sala en al que está participando
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var ParticipantX = (function (_super) {
    __extends(ParticipantX, _super);
    function ParticipantX(userName, userType, name, surname, email, room) {
        var _this = _super.call(this, userName, userType, name, surname, email) || this;
        _this._room = room;
        return _this;
    }
    Object.defineProperty(ParticipantX.prototype, "room", {
        get: function () {
            return this._room;
        },
        set: function (room) {
            this._room = room;
        },
        enumerable: true,
        configurable: true
    });
    ParticipantX.prototype.set = function (participant) {
        _super.prototype.set.call(this, participant);
        this._room = participant.room;
    };
    ParticipantX.prototype.setToUndefined = function () {
        this.setToUndefined();
        this._room = null;
    };
    return ParticipantX;
}(user_1.User));
exports.ParticipantX = ParticipantX;
//# sourceMappingURL=participant.js.map