"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = (function () {
    function Room(room) {
        if (room) {
            this.setDataRoom(room);
        }
    }
    ;
    Object.defineProperty(Room.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "tutor", {
        get: function () {
            return this._tutor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "createdAt", {
        get: function () {
            return new Date(this._createdAt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "participantsHistory", {
        get: function () {
            return this._participantsHistory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "filesHistory", {
        get: function () {
            return this._filesHistory;
        },
        enumerable: true,
        configurable: true
    });
    Room.prototype.setDataRoom = function (room) {
        this._name = room.name;
        this._tutor = room.tutor;
        this._createdAt = new Date(room.createdAt);
        this._participantsHistory = room.participantsHistory.slice(0);
        this._filesHistory = room.filesHistory.slice(0);
    };
    Room.prototype.getCreatedAtTimeStamp = function () {
        return this.getCreatedAtDate() + " " + this.getCreatedAtTime();
    };
    Room.prototype.getCreatedAtDate = function () {
        return this._createdAt.toLocaleDateString().replace(/\//g, '-');
    };
    Room.prototype.getCreatedAtTime = function () {
        var hours = this._createdAt.getHours();
        var minutes = this._createdAt.getMinutes();
        var seconds = this._createdAt.getSeconds();
        return hours + ":" + minutes + ":" + seconds;
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.js.map