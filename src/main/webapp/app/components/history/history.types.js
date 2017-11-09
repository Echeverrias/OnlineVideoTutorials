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
var room_1 = require("./../..//models/room");
var RoomHistory = (function (_super) {
    __extends(RoomHistory, _super);
    function RoomHistory(room) {
        var _this = _super.call(this) || this;
        _this.setDataRoomHistory(room);
        return _this;
    }
    Object.defineProperty(RoomHistory.prototype, "participantsHistory", {
        get: function () {
            return this._participantsHistory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomHistory.prototype, "filesHistory", {
        get: function () {
            return this._filesHistory;
        },
        enumerable: true,
        configurable: true
    });
    RoomHistory.prototype.setDataRoomHistory = function (room) {
        this.setDataRoom(room);
        this._participantsHistory = room.participantsHistory.slice(0);
        this._filesHistory = room.filesHistory.slice(0);
    };
    return RoomHistory;
}(room_1.Room));
exports.RoomHistory = RoomHistory;
//# sourceMappingURL=history.types.js.map