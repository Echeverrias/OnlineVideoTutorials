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
var gadgetsContainer_html_1 = require('./gadgetsContainer.html');
var GadgetsContainerComponent = (function () {
    function GadgetsContainerComponent() {
        this.activeOption = new core_1.EventEmitter();
        this.imagePath = "app/components/gadgetsContainer/img/";
    }
    GadgetsContainerComponent.prototype.ngAfterViewInit = function () {
    };
    GadgetsContainerComponent.prototype.activateOption = function (option) {
        this.option = option;
        this.option ? this.activeOption.emit(true) : this.activeOption.emit(false);
    };
    __decorate([
        core_1.Output('ovt-activeOption'), 
        __metadata('design:type', Object)
    ], GadgetsContainerComponent.prototype, "activeOption", void 0);
    GadgetsContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-gadgetsContainer',
            template: gadgetsContainer_html_1.gadgetsContainerTemplate,
            styleUrls: ['gadgetsContainer.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], GadgetsContainerComponent);
    return GadgetsContainerComponent;
}());
exports.GadgetsContainerComponent = GadgetsContainerComponent;
//# sourceMappingURL=gadgetsContainer.component.js.map