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
var option_directive_1 = require('./option.directive');
var GadgetsContainerComponent = (function () {
    function GadgetsContainerComponent() {
        this.imagePath = "app/components/gadgetsContainer/img/";
        this.activeOption = new core_1.EventEmitter();
        this.sharedFile = new core_1.EventEmitter();
    }
    GadgetsContainerComponent.prototype.ngAfterViewInit = function () {
    };
    GadgetsContainerComponent.prototype.activateOption = function (option) {
        console.log(option);
        this.option = option;
        this.option ? this.activeOption.emit(true) : this.activeOption.emit(false);
    };
    GadgetsContainerComponent.prototype.onSelectedFile = function (file) {
        console.log("GadgetsContainerComponent.onSelectedFile(" + file + ")");
        this.sharedFile.emit(file);
        this.od.stopAlert();
    };
    GadgetsContainerComponent.prototype.displayNewFileAlert = function (fileName) {
        console.log("displayNewFile: " + fileName);
        var state = (this.option === 'pdfLoader') ? 'on' : 'off';
        this.od.displayAlert({
            option: 'pdfLoader',
            initialState: state,
            data: fileName
        });
    };
    __decorate([
        core_1.ViewChild(option_directive_1.OptionDirective), 
        __metadata('design:type', option_directive_1.OptionDirective)
    ], GadgetsContainerComponent.prototype, "od", void 0);
    __decorate([
        core_1.Input("ovt-address"), 
        __metadata('design:type', String)
    ], GadgetsContainerComponent.prototype, "address", void 0);
    __decorate([
        core_1.Output('ovt-activeOption'), 
        __metadata('design:type', core_1.EventEmitter)
    ], GadgetsContainerComponent.prototype, "activeOption", void 0);
    __decorate([
        core_1.Output('ovt-file'), 
        __metadata('design:type', core_1.EventEmitter)
    ], GadgetsContainerComponent.prototype, "sharedFile", void 0);
    GadgetsContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-gadgets-container',
            template: gadgetsContainer_html_1.gadgetsContainerTemplate,
            styleUrls: ['gadgetsContainer.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], GadgetsContainerComponent);
    return GadgetsContainerComponent;
}());
exports.GadgetsContainerComponent = GadgetsContainerComponent;
//# sourceMappingURL=gadgetsContainer.component.js.map