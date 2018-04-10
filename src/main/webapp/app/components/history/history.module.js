"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pipes_module_1 = require("./../../pipes/pipes.module");
var directives_module_1 = require("./../../directives/directives.module");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var history_component_1 = require("./history.component");
var roomDetails_component_1 = require("./roomDetails/roomDetails.component");
var history_service_1 = require("./history.service");
var fileLink_component_1 = require("../share/fileLink/fileLink.component");
var historyRoutes = [
    { path: "history", component: history_component_1.HistoryComponent }
];
var HistoryModule = (function () {
    function HistoryModule() {
    }
    return HistoryModule;
}());
HistoryModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, router_1.RouterModule.forChild(historyRoutes), directives_module_1.DirectivesModule, pipes_module_1.PipesModule],
        declarations: [
            history_component_1.HistoryComponent,
            roomDetails_component_1.RoomDetailsComponent,
            fileLink_component_1.FileLinkComponent
        ],
        providers: [history_service_1.HistoryService],
        exports: [history_component_1.HistoryComponent]
    })
], HistoryModule);
exports.HistoryModule = HistoryModule;
//# sourceMappingURL=history.module.js.map