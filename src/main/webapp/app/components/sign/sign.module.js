"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_uploader_1 = require("ngx-uploader");
var shared_module_1 = require("../../shared/shared.module");
var signUp_component_1 = require("./signUp/signUp.component");
var signIn_component_1 = require("./signIn/signIn.component");
var editPerfil_component_1 = require("./editPerfil/editPerfil.component");
var validation_service_1 = require("./validation.service");
var sign_service_1 = require("./sign.service");
var SignModule = (function () {
    function SignModule() {
    }
    return SignModule;
}());
SignModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, ngx_uploader_1.NgUploaderModule],
        declarations: [signIn_component_1.SignInComponent, signUp_component_1.SignUpComponent, editPerfil_component_1.EditPerfilComponent],
        providers: [validation_service_1.ValidationService, sign_service_1.SignService],
        exports: [signIn_component_1.SignInComponent, signUp_component_1.SignUpComponent, editPerfil_component_1.EditPerfilComponent]
    })
], SignModule);
exports.SignModule = SignModule;
//# sourceMappingURL=sign.module.js.map