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
var core_1 = require('@angular/core');
var connection_service_1 = require('./connection.service');
var user_service_1 = require('./user.service');
var hexColorGenerator_1 = require('./../models/hexColorGenerator');
var ChatService = (function () {
    function ChatService(connection, me) {
        this.connection = connection;
        this.me = me;
        this.endpoint = "/chat";
        this.subscription = "/noticeBoard/";
        this.destiny = "/mailBox/";
        console.log("");
        console.log("% new ChatService");
        this.wsUrl = this.connection.url;
        this.colorGenerator = new hexColorGenerator_1.HexColorGenerator();
        this.messages = [];
        this.participants = [];
    }
    ChatService.prototype.init = function (address) {
        this.destiny = this.destiny + address;
        this.subscription = this.subscription + address;
        this.connect();
    };
    ChatService.prototype.getMessages = function () {
        return this.messages;
    };
    ChatService.prototype.connect = function () {
        var _this = this;
        console.log("* ChatService.connect");
        console.log("The stompClient is going to be connected");
        this.stompClient = Stomp.client(this.wsUrl + this.endpoint);
        console.log(this.stompClient);
        console.log("The stompClient has been created");
        this.stompClient.connect({}, function (frame) {
            console.log("Connected: " + frame);
            _this.stompClient.subscribe(_this.subscription, function (message) {
                console.log("Msg received: " + message);
                _this.publish(JSON.parse(message.body));
            });
        });
    };
    ChatService.prototype.publish = function (message) {
        this.addColor(message);
        this.messages.push(message);
    };
    ChatService.prototype.addColor = function (message) {
        if (!this.participants[message.sender]) {
            this.participants[message.sender] = this.colorGenerator.getAColor();
        }
        message.color = this.participants[message.sender];
    };
    ChatService.prototype.sendMessage = function (message) {
        var myUserName = this.me.myUserName;
        var msg = {
            sender: myUserName,
            message: message,
            date: new Date().toLocaleTimeString(),
            color: undefined
        };
        this.stompClient.send(this.destiny, {}, JSON.stringify(msg));
    };
    ChatService.prototype.disconnect = function () {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    };
    ChatService.prototype.destroy = function () {
        this.disconnect();
        this.messages.length = 0;
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [connection_service_1.ConnectionService, user_service_1.UserService])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map