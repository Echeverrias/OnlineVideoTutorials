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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chat_service_1 = require("./chat.service");
var user_service_1 = require("./../../../core/user.service");
var chat_html_1 = require("./chat.html");
var ChatComponent = (function () {
    function ChatComponent(chat, me) {
        this.chat = chat;
        this.me = me;
        console.log("");
        console.log("% Chat constructor " + new Date().toLocaleTimeString());
        console.log("this.me: ", this.me);
        console.log("this.me.getMe(): ", this.me.getMe());
        console.log("this.me.getMyInfo(): ", this.me.getMyInfo());
        console.log("/ Chat constructor " + new Date().toLocaleTimeString());
        console.log("");
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.chat.init(this.address);
        this.messages = this.chat.getMessages();
    };
    ChatComponent.prototype.sendMessage = function () {
        if (this.message) {
            console.log("this.me.getMe(): ", this.me.getMe());
            this.chat.sendMessage(this.me.getMe(), this.message);
            this.message = null;
        }
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        console.log("* Chat.OnDestroy " + new Date().toLocaleTimeString());
        this.chat.destroy();
    };
    return ChatComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ChatComponent.prototype, "address", void 0);
ChatComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-chat',
        styleUrls: ["chat.css"],
        template: chat_html_1.chatTemplate,
        providers: [chat_service_1.ChatService]
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService, user_service_1.UserService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map