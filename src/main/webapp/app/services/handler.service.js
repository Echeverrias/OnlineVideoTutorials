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
var HandlerService = (function () {
    function HandlerService() {
        console.log("*HandlerService constructor");
        this.handlers = new Map();
    }
    HandlerService.prototype.attach = function (id, ee) {
        console.log("HandlerService.attach " + id);
        this.handlers.set(id, ee);
    };
    HandlerService.prototype.detach = function (id) {
        console.log("HandlerService.detach " + id);
        this.handlers.delete(id);
    };
    HandlerService.prototype.handle = function (message) {
        console.log("HandlerService.handle: ", message);
        var parsedMessage = JSON.parse(message.data);
        var idMessage = parsedMessage.id;
        console.log("HandlerService.handler " + idMessage);
        console.log("message", message);
        var ee = this.handlers.get(idMessage);
        try {
            console.log("ee" + idMessage + ".next");
            ee.next(parsedMessage);
            return true;
        }
        catch (e) {
            console.log("Can't find a handler for " + idMessage);
            return false;
        }
    };
    return HandlerService;
}());
HandlerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HandlerService);
exports.HandlerService = HandlerService;
//# sourceMappingURL=handler.service.js.map