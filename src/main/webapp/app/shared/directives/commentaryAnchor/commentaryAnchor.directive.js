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
var commentary_component_1 = require("./commentary/commentary.component");
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    ;
    return Point;
}());
var CommentaryAnchorDirective = (function () {
    function CommentaryAnchorDirective(elementRef, viewContainer, componentFactoryResolver) {
        this.elementRef = elementRef;
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    CommentaryAnchorDirective.prototype.ngOnInit = function () {
        this.element = this.elementRef.nativeElement;
    };
    CommentaryAnchorDirective.prototype.ngOnDestroy = function () {
        this.hideCallout();
        //  super.onDestroy();
    };
    CommentaryAnchorDirective.prototype.showCallout = function (e) {
        console.log("Commentary CREATE");
        if (!this.calloutRef) {
            console.log("Commentary CREATE ON");
            this.calloutRef = this.createCallout(commentary_component_1.CommentaryComponent, this.content);
            var calloutEl = this.calloutRef.location.nativeElement;
            var targetPos = this.getTargetCalloutLocation(e, calloutEl);
            calloutEl.style.left = targetPos.x + 'px';
            calloutEl.style.top = targetPos.y + 'px';
        }
    };
    CommentaryAnchorDirective.prototype.hideCallout = function () {
        console.log("Commentary DESTROY");
        if (this.calloutRef) {
            this.calloutRef.destroy();
            this.calloutRef = null;
        }
    };
    CommentaryAnchorDirective.prototype.createCallout = function (calloutComponent, content) {
        this.viewContainer.clear();
        var calloutComponentFactory = this.componentFactoryResolver.resolveComponentFactory(commentary_component_1.CommentaryComponent);
        var calloutComponentRef = this.viewContainer.createComponent(calloutComponentFactory);
        calloutComponentRef.instance.content = content;
        return calloutComponentRef;
    };
    CommentaryAnchorDirective.prototype.getTargetCalloutLocation = function (e, calloutEl) {
        // let box: any= this.element.getBoundingClientRect();
        var coordinateX = (e.offsetX - (calloutEl.offsetWidth / 2));
        var coordinateY = (this.element.offsetTop - (calloutEl.offsetHeight * 4));
        return new Point(coordinateX, coordinateY);
    };
    return CommentaryAnchorDirective;
}());
__decorate([
    core_1.Input('ovt-commentary-anchor'),
    __metadata("design:type", String)
], CommentaryAnchorDirective.prototype, "content", void 0);
CommentaryAnchorDirective = __decorate([
    core_1.Directive({
        selector: '[ovt-commentary-anchor]',
        host: {
            '(mouseenter)': 'showCallout($event)',
            '(mouseleave)': 'hideCallout()'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver])
], CommentaryAnchorDirective);
exports.CommentaryAnchorDirective = CommentaryAnchorDirective;
//# sourceMappingURL=commentaryAnchor.directive.js.map