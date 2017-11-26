"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var gadgetsContainer_module_1 = require("./gadgetsContainer/gadgetsContainer.module");
var participant_module_1 = require("./participant/participant.module");
var chat_module_1 = require("./chat/chat.module");
var room_service_1 = require("./room.service");
var participants_service_1 = require("./participants.service");
var room_component_1 = require("./room.component");
var RoomModule = (function () {
    function RoomModule() {
    }
    return RoomModule;
}());
RoomModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            gadgetsContainer_module_1.GadgetsContainerModule,
            participant_module_1.ParticipantModule,
            chat_module_1.ChatModule
        ],
        declarations: [
            room_component_1.RoomComponent,
        ],
        providers: [room_service_1.RoomService, participants_service_1.ParticipantsService],
        exports: [room_component_1.RoomComponent]
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map