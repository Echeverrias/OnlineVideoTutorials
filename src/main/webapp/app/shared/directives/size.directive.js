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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SizeDirective = (function () {
    function SizeDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        console.log("SizeDirective");
        console.log(el);
    }
    SizeDirective.prototype.ngOnInit = function () {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.size.width);
        this.renderer.setElementStyle(this.el.nativeElement, 'height', this.size.height);
    };
    return SizeDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SizeDirective.prototype, "size", void 0);
SizeDirective = __decorate([
    core_1.Directive({
        selector: "[ovt-size]"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], SizeDirective);
exports.SizeDirective = SizeDirective;
//# sourceMappingURL=size.directive.js.map