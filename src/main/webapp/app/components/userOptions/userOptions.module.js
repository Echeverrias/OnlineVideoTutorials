"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var userOptions_component_1 = require("./userOptions.component");
var shared_module_1 = require("../../shared/shared.module");
var sign_module_1 = require("../sign/sign.module");
var UserOptionsModule = (function () {
    function UserOptionsModule() {
    }
    return UserOptionsModule;
}());
UserOptionsModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, sign_module_1.SignModule],
        declarations: [userOptions_component_1.UserOptionsComponent],
        exports: [userOptions_component_1.UserOptionsComponent]
    })
], UserOptionsModule);
exports.UserOptionsModule = UserOptionsModule;
//# sourceMappingURL=userOptions.module.js.map