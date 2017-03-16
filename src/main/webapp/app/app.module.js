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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_1 = require('./app.routing');
var ngx_uploader_1 = require('ngx-uploader');
var gadgetsContainer_module_1 = require('./components/gadgetsContainer/gadgetsContainer.module');
var app_component_1 = require('./app.component');
var sign_component_1 = require('./components/sign/sign.component');
var userOptions_component_1 = require('./components/userOptions/userOptions.component');
var waitingRoom_component_1 = require('./components/waitingRoom/waitingRoom.component');
var room_component_1 = require('./components/room/room.component');
var participant_component_1 = require('./components/participant/participant.component');
var loading_component_1 = require('./components/loading/loading.component');
var chat_component_1 = require('./components/chat/chat.component');
var chatMessage_component_1 = require('./components/chatMessage/chatMessage.component');
var connection_service_1 = require('./services/connection.service');
var user_service_1 = require('./services/user.service');
var handler_service_1 = require('./services/handler.service');
var file_service_1 = require('./services/file.service');
var auth_guard_1 = require('./guards/auth.guard');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
                ngx_uploader_1.NgUploaderModule,
                gadgetsContainer_module_1.GadgetsContainerModule
            ],
            declarations: [
                app_component_1.AppComponent,
                sign_component_1.SignComponent,
                userOptions_component_1.UserOptionsComponent,
                waitingRoom_component_1.WaitingRoomComponent,
                room_component_1.RoomComponent,
                participant_component_1.ParticipantComponent,
                loading_component_1.LoadingComponent,
                chat_component_1.ChatComponent,
                chatMessage_component_1.ChatMessageComponent,
            ],
            providers: [
                handler_service_1.HandlerService,
                connection_service_1.ConnectionService,
                user_service_1.UserService,
                auth_guard_1.AuthGuard,
                file_service_1.FileService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=app.module.js.map