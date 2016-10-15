/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
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
var myService_1 = require('../../services/myService');
var chat_service_1 = require('../../services/chat.service');
var hexColorGenerator_1 = require('./hexColorGenerator');
var chat_html_1 = require('./chat.html');
var ChatComponent = (function () {
    function ChatComponent(myService, chatService) {
        this.myService = myService;
        this.chatService = chatService;
        console.log("");
        console.log("% Chat constructor " + new Date().toLocaleTimeString());
        this.colorGenerator = new hexColorGenerator_1.HexColorGenerator();
        this.messages = [];
        this.participants = [];
        console.log("/ Chat constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    ChatComponent.prototype.ngOnInit = function () {
    };
    ChatComponent.prototype.ngAfterViewInit = function () {
        console.log("* Chat.AfterViewInit " + new Date().toLocaleTimeString());
        this.chatService.signIn(this.address, this);
    };
    ChatComponent.prototype.publish = function (message) {
        this.addColor(message);
        this.messages.push(message);
    };
    ChatComponent.prototype.addColor = function (message) {
        if (!this.participants[message.sender]) {
            this.participants[message.sender] = this.colorGenerator.getAColor();
        }
        message.color = this.participants[message.sender];
    };
    ChatComponent.prototype.sendMessage = function () {
        var myUserName = this.myService.myUserName;
        if (this.message) {
            var message = {
                sender: myUserName,
                message: this.message,
                date: new Date().toLocaleTimeString()
            };
            this.chatService.sendMessage(message);
            this.message = null;
        }
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        console.log("* Chat.OnDestroy " + new Date().toLocaleTimeString());
        this.chatService.disconnect();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChatComponent.prototype, "address", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-chat',
            styleUrls: ["../../../assets/styles/main.css", "chat.css"],
            template: chat_html_1.chatTemplate,
            providers: [chat_service_1.ChatService]
        }), 
        __metadata('design:paramtypes', [myService_1.MyService, chat_service_1.ChatService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map