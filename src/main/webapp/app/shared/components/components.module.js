"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var contentDisplayer_module_1 = require("./contentDisplayer/contentDisplayer.module");
var pagination_component_1 = require("./pagination/pagination.component");
var fileLink_module_1 = require("./fileLink/fileLink.module");
var select_module_1 = require("./select/select.module");
var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, fileLink_module_1.FileLinkModule, select_module_1.SelectModule, contentDisplayer_module_1.ContentDisplayerModule],
        declarations: [pagination_component_1.PaginationComponent],
        exports: [contentDisplayer_module_1.ContentDisplayerModule, pagination_component_1.PaginationComponent, fileLink_module_1.FileLinkModule, select_module_1.SelectModule]
    })
], ComponentsModule);
exports.ComponentsModule = ComponentsModule;
//# sourceMappingURL=components.module.js.map