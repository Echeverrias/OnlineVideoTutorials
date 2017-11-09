"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = (function () {
    function Room(name, tutor) {
        this._id = -1;
        this._name = "";
        this._tutor = "";
        if (arguments.length == 1) {
            this._name = name;
        }
        else if (arguments.length == 2) {
            this._name = name;
            this._tutor = tutor;
        }
    }
    ;
    Object.defineProperty(Room.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
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
    Room.prototype.json = function () {
        return {
            id: this._id,
            name: this._name,
            tutor: this._tutor,
            createdAt: new Date(this._createdAt)
        };
    };
    Room.prototype.setDataRoom = function (room) {
        this._id = room.id;
        this._name = room.name;
        this._tutor = room.tutor;
        this._createdAt = new Date(room.createdAt);
    };
    Room.prototype.setToUndefined = function () {
        this._id = -1;
        this._name = "";
        this._tutor = "";
        this._createdAt = null;
    };
    Room.prototype.getCreatedAtTimeStamp = function () {
        return this._createdAt && this.getCreatedAtDate() + " " + this.getCreatedAtTime();
    };
    Room.prototype.getCreatedAtDate = function () {
        var date = this._createdAt;
        if (date) {
            date = new Date(date).toLocaleDateString().replace(/\//g, '-');
        }
        return date;
    };
    Room.prototype.getCreatedAtTime = function () {
        var time = this._createdAt;
        if (time) {
            time = new Date(time);
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            time = hours + ":" + minutes + ":" + seconds;
        }
        return time;
    };
    Room.prototype.exist = function () {
        return this._id && this.id > 0;
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.js.map