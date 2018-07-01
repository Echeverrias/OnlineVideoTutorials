"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var download_directive_1 = require("./download.directive");
var size_directive_1 = require("./size.directive");
var stopPropagation_directive_1 = require("./stopPropagation.directive");
var attributes_directive_1 = require("./attributes.directive");
var commentaryAnchor_module_1 = require("./commentaryAnchor/commentaryAnchor.module");
var DirectivesModule = (function () {
    function DirectivesModule() {
    }
    return DirectivesModule;
}());
DirectivesModule = __decorate([
    core_1.NgModule({
        imports: [commentaryAnchor_module_1.CommentaryAnchorModule],
        declarations: [download_directive_1.DownloadDirective, stopPropagation_directive_1.StopPropagationDirective, size_directive_1.SizeDirective, attributes_directive_1.AttributesDirective],
        exports: [commentaryAnchor_module_1.CommentaryAnchorModule, download_directive_1.DownloadDirective, stopPropagation_directive_1.StopPropagationDirective, size_directive_1.SizeDirective, attributes_directive_1.AttributesDirective]
    })
], DirectivesModule);
exports.DirectivesModule = DirectivesModule;
//# sourceMappingURL=directives.module.js.map