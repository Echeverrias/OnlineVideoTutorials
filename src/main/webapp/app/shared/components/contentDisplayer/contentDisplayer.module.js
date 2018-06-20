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
var pipes_module_1 = require("./../../pipes/pipes.module");
var directives_module_1 = require("./../../directives/directives.module");
var contentDisplayer_component_1 = require("./contentDisplayer.component");
var ContentDisplayerModule = (function () {
    function ContentDisplayerModule() {
    }
    return ContentDisplayerModule;
}());
ContentDisplayerModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, pipes_module_1.PipesModule, directives_module_1.DirectivesModule],
        declarations: [contentDisplayer_component_1.ContentDisplayerComponent],
        exports: [contentDisplayer_component_1.ContentDisplayerComponent]
    })
], ContentDisplayerModule);
exports.ContentDisplayerModule = ContentDisplayerModule;
//# sourceMappingURL=contentDisplayer.module.js.map