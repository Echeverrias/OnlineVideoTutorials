"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var ngx_uploader_1 = require("ngx-uploader");
var shared_module_1 = require("./shared/shared.module");
var core_module_1 = require("./core/core.module");
var sign_module_1 = require("./components/sign/sign.module");
var userOptions_module_1 = require("./components/userOptions/userOptions.module");
var room_module_1 = require("./components/room/room.module");
var history_module_1 = require("./components/history/history.module");
var app_component_1 = require("./app.component");
var waitingRoom_component_1 = require("./components/waitingRoom/waitingRoom.component");
var auth_guard_1 = require("./guards/auth.guard");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            ngx_uploader_1.NgUploaderModule,
            core_module_1.CoreModule,
            shared_module_1.SharedModule,
            userOptions_module_1.UserOptionsModule,
            room_module_1.RoomModule,
            history_module_1.HistoryModule,
            sign_module_1.SignModule,
            app_routing_1.routing,
        ],
        declarations: [
            app_component_1.AppComponent,
            waitingRoom_component_1.WaitingRoomComponent,
        ],
        providers: [
            auth_guard_1.AuthGuard
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=app.module.js.map