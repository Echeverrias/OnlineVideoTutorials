"use strict";
var UserFile2 = (function () {
    function UserFile2(name) {
        if (arguments.length == 1) {
            this._name = name;
            var index = this._name.lastIndexOf('.');
            if (index >= 0) {
                this._type = this._name.substring(index + 1, this._name.length);
            }
        }
    }
    Object.defineProperty(UserFile2.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFile2.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFile2.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (content) {
            this._content = content;
        },
        enumerable: true,
        configurable: true
    });
    UserFile2.prototype.toString = function () {
        return "Name: " + this._name + ", Type: " + this._type;
    };
    return UserFile2;
}());
exports.UserFile2 = UserFile2;
//# sourceMappingURL=userFile2.js.map