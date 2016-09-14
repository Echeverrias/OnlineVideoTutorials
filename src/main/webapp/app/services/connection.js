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
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require('@angular/core');
var eventsEmitter_1 = require('./eventsEmitter');
console.log("Module Connection");
/**
* It allows the communication between the server and the components
*/
var Connection = (function () {
    function Connection() {
        console.log("% Connection");
        this._ws = new WebSocket('ws://localhost:8080/ovt');
        var eventsEmitter = new eventsEmitter_1.EventsEmitter();
        this._subscriptions = eventsEmitter.subscriptions;
        this._ws.onmessage = eventsEmitter.serverListener;
        console.log(this._ws);
        console.log(this._ws.onmessage);
    }
    Object.defineProperty(Connection.prototype, "subscriptions", {
        get: function () {
            return this._subscriptions;
        },
        enumerable: true,
        configurable: true
    });
    Connection.prototype.sendMessage = function (jsonMessage) {
        console.log("---------->  " + jsonMessage.id + " " + new Date().toLocaleTimeString());
        console.log("-> message: " + JSON.stringify(jsonMessage));
        var stringifyMessage = JSON.stringify(jsonMessage);
        this._ws.send(stringifyMessage);
        console.log("The message has been send");
    };
    Connection = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Connection);
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map