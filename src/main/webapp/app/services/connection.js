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
//import { EventsEmitter } from './eventsEmitter'; 
var handler_service_1 = require('./handler.service');
console.log("Module Connection");
/**
* It allows the communication between the server and the components
*/
var Connection = (function () {
    //private _subscriptions: Object;
    function Connection(handler) {
        var _this = this;
        this.handler = handler;
        console.log("% Connection");
        this._ws = new WebSocket('ws://localhost:8080/ovt');
        // let eventsEmitter : EventsEmitter = ee;
        // this._subscriptions = eventsEmitter.subscriptions;
        this._ws.onmessage = function (message) { _this.handler.handle(message); };
        { }
        console.log(this._ws);
        console.log(this._ws.onmessage);
    }
    Object.defineProperty(Connection.prototype, "url", {
        get: function () {
            return this._ws.url;
        },
        enumerable: true,
        configurable: true
    });
    /*
    get subscriptions(): Object{
        return this._subscriptions;
    }
    */
    Connection.prototype.sendMessage = function (jsonMessage) {
        //console.log(`---------->  ${jsonMessage.id} ${new Date().toLocaleTimeString()}`);
        //console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
        var stringifyMessage = JSON.stringify(jsonMessage);
        this._ws.send(stringifyMessage);
        if (!jsonMessage.id.includes('receiveAddress')) {
            console.log("----------> The message " + jsonMessage.id + " has been send");
        }
    };
    Connection = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [handler_service_1.HandlerService])
    ], Connection);
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map