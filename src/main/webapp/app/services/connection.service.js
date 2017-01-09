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
var handler_service_1 = require('./handler.service');
console.log("Module Connection");
/**
* It allows the communication between the server and the components
*/
var ConnectionService = (function () {
    function ConnectionService(handler) {
        var _this = this;
        this.handler = handler;
        this._wsEndPoint = "ws";
        this._stompEndPoint = "/stomp";
        console.log("% Connection");
        this._rootServer = document.location.host + document.location.pathname;
        this._ws = new WebSocket("ws://" + this._rootServer + this._wsEndPoint);
        this._ws.onmessage = function (message) { _this.handler.handle(message); };
        this._stompClient = Stomp.client(this.stompOverWsUrl);
        this._stompClient.connect({}, function (frame) {
            console.log("Connected succesfully: " + frame);
        });
        console.log(this.stompClient);
        console.log(this._ws);
        console.log(this._ws.onmessage);
    }
    Object.defineProperty(ConnectionService.prototype, "stompOverWsClient", {
        get: function () {
            return this._stompClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionService.prototype, "wsUrl", {
        get: function () {
            return this._ws.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionService.prototype, "stompOverWsUrl", {
        get: function () {
            return this._ws.url + this._stompEndPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionService.prototype, "rootServer", {
        get: function () {
            return this._rootServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionService.prototype, "urlServer", {
        get: function () {
            return document.location.protocol + "//" + this._rootServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionService.prototype, "wsEndPoint", {
        get: function () {
            return "/" + this._wsEndPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionService.prototype, "stompOverWsEndPoint", {
        get: function () {
            return "/" + this._wsEndPoint + this._stompEndPoint;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionService.prototype.sendMessage = function (jsonMessage) {
        //console.log(`---------->  ${jsonMessage.id} ${new Date().toLocaleTimeString()}`);
        //console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
        var stringifyMessage = JSON.stringify(jsonMessage);
        this._ws.send(stringifyMessage);
        if (!jsonMessage.id.includes('receiveAddress')) {
            console.log("----------> The message " + jsonMessage.id + " has been send");
        }
    };
    ConnectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [handler_service_1.HandlerService])
    ], ConnectionService);
    return ConnectionService;
}());
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map