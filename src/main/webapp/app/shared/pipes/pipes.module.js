"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var userFileSanitizer_pipe_1 = require("./userFileSanitizer.pipe");
var limitTo_pipe_1 = require("./limitTo.pipe");
var safe_pipe_1 = require("./safe.pipe");
var mimeType_pipe_1 = require("./mimeType.pipe");
var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    core_1.NgModule({
        declarations: [userFileSanitizer_pipe_1.UserImageSanitizerPipe, limitTo_pipe_1.LimitToPipe, safe_pipe_1.SafePipe, mimeType_pipe_1.MimeTypePipe],
        exports: [userFileSanitizer_pipe_1.UserImageSanitizerPipe, limitTo_pipe_1.LimitToPipe, safe_pipe_1.SafePipe, mimeType_pipe_1.MimeTypePipe]
    })
], PipesModule);
exports.PipesModule = PipesModule;
//# sourceMappingURL=pipes.module.js.map