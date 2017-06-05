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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connection_service_1 = require("./connection.service");
var user_service_1 = require("./user.service");
var hexColorGenerator_1 = require("./../models/hexColorGenerator");
var ChatService = (function () {
    function ChatService(connection, me) {
        this.connection = connection;
        this.me = me;
        this.chatEndPoint = "/chat";
        this.shippingAddress = this.chatEndPoint + "/noticeBoard";
        this.destinyAddress = this.chatEndPoint + "/mailBox";
        console.log("");
        console.log("% new ChatService");
        this.colorGenerator = new hexColorGenerator_1.HexColorGenerator();
        this.messages = [];
        this.participants = [];
    }
    ChatService.prototype.init = function (address) {
        this.destinyAddress = this.destinyAddress + "/" + address;
        this.shippingAddress = this.shippingAddress + "/" + address;
        this.stompClient = this.connection.stompOverWsClient;
        this.subscription = this.stompClient.subscribe(this.shippingAddress, this.getOnMessage());
    };
    ChatService.prototype.getMessages = function () {
        return this.messages;
    };
    ChatService.prototype.getOnMessage = function () {
        var _this = this;
        var onMessage = function (message) {
            console.log("Msg received: " + message);
            _this.publish(JSON.parse(message.body));
        };
        return onMessage;
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
        this.stompClient.send(this.destinyAddress, {}, JSON.stringify(msg));
    };
    ChatService.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.messages.length = 0;
    };
    return ChatService;
}());
ChatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [connection_service_1.ConnectionService, user_service_1.UserService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map