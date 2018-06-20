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
var AttributesDirective = (function () {
    function AttributesDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        console.log("AttributesDirective");
        console.log(el);
    }
    AttributesDirective.prototype.ngOnInit = function () {
        if (this.attributes) {
            for (var i in this.attributes) {
                try {
                    this.renderer.setElementAttribute(this.el.nativeElement, i, this.attributes[i]);
                    console.log("AttributesDirective: Renderer.setElementAttributes(" + i + ", " + this.attributes[i] + ")", this.el.nativeElement);
                }
                catch (e) {
                    console.log("Error: Renderer.setElementAttributes(" + i + ", " + this.attributes[i] + ")", e);
                }
            }
        }
    };
    return AttributesDirective;
}());
__decorate([
    core_1.Input('ovt-attributes'),
    __metadata("design:type", Object)
], AttributesDirective.prototype, "attributes", void 0);
AttributesDirective = __decorate([
    core_1.Directive({
        selector: "[ovt-attributes]"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], AttributesDirective);
exports.AttributesDirective = AttributesDirective;
//# sourceMappingURL=attributes.directive.js.map