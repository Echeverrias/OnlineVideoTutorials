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
var connection_1 = require('./connection');
var ENDPOINT = "/chat";
var ChatService = (function () {
    function ChatService(connection) {
        this.connection = connection;
        this.subscription = "/ovt/chat/noticeBoard";
        this.destiny = "/ovt/chat/mailBox";
        console.log("");
        console.log("% new ChatService");
        this.wsUrl = connection.url;
        /*
        stompClient = Stomp.client(ws.url + "/chat");
        console.log("The stompClient is going to be connected");
        stompClient.connect({}, function(frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe(SUBSCRIPTION, function(greeting) {
                console.log("Msg received:");
                console.log(greeting);
                showGreeting(JSON.parse(greeting.body).content);
            });
        });
        */
    }
    ChatService.prototype.signIn = function (address, noticeBoard) {
        console.log("* ChatService.signIn");
        this.noticeBoard = noticeBoard;
        this.destiny = this.destiny + address;
        this.subscription = this.subscription + address;
        this.connect();
    };
    ChatService.prototype.connect = function () {
        var _this = this;
        console.log("* ChatService.connect");
        console.log("The stompClient is going to be connected");
        this.stompClient = Stomp.client(this.wsUrl + ENDPOINT);
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
        this.noticeBoard.publish(message);
    };
    ChatService.prototype.sendMessage = function (message) {
        this.stompClient.send(this.destiny, {}, JSON.stringify(message));
    };
    ChatService.prototype.disconnect = function () {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [connection_1.Connection])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map