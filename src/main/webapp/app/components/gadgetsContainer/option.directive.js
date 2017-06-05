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
var OptionDirective = (function () {
    function OptionDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.activate = new core_1.EventEmitter();
        console.log(this.el.nativeElement);
        this.element = el.nativeElement;
        this.isOn = false;
    }
    OptionDirective.prototype.ngAfterViewInit = function () {
        console.log("AfterViewinit");
        //this.renderer.setElementProperty(this.element, 'src', this.path + this.image);
        this.renderer.setElementStyle(this.element, 'background', "url(\"" + (this.imagePath + this.imageOff) + "\") no-repeat");
    };
    OptionDirective.prototype.ngOnChanges = function () {
        console.log("OnChanges");
        console.log(this.option);
        if (this.activeOption !== this.option) {
            console.log("Some option has change");
            this.isOn = false;
            console.log(this.element);
            //this.renderer.setElementProperty(this.element, 'src', this.path + this.image);
            this.renderer.setElementStyle(this.element, 'background', "url(\"" + (this.imagePath + this.imageOff) + "\") no-repeat");
        }
    };
    // Actives the gadget, makes the component visible
    OptionDirective.prototype.onClick = function () {
        this.stopAlert();
        var image;
        this.isOn = !this.isOn;
        this.isOn ? image = this.imageOff.replace('-off', '-on') : image = this.imageOff;
        //this.renderer.setElementProperty(this.element, 'src', imagePath);
        this.renderer.setElementStyle(this.element, 'background', "url(\"" + (this.imagePath + image) + "\") no-repeat");
        this.isOn ? this.activate.emit(this.option) : this.activate.emit(undefined);
    };
    OptionDirective.prototype.onMouseOver = function () {
        console.log("mouseover");
        this.renderer.setElementStyle(this.element, 'background', "url(\"" + (this.imagePath + this.imageOff.replace('off', 'on')) + "\") no-repeat");
    };
    OptionDirective.prototype.onMouseLeave = function () {
        if (this.activeOption !== this.option) {
            console.log("mouseleave");
            this.renderer.setElementStyle(this.element, 'background', "url(\"" + (this.imagePath + this.imageOff.replace('on', 'off')) + "\") no-repeat");
        }
    };
    OptionDirective.prototype.displayAlert = function (options) {
        console.log("OptionDirective.displayAlert");
        if (options.option === this.option) {
            this.intervalAlert = setInterval(this.changeIcon(), 1000);
        }
    };
    OptionDirective.prototype.stopAlert = function () {
        console.log("OptionDirective.stopAlert");
        clearInterval(this.intervalAlert);
        var image;
        this.isOn ? image = this.imageOff.replace('-off', '-on') : image = this.imageOff;
        //this.renderer.setElementProperty(this.element, 'src', imagePath);
        this.renderer.setElementStyle(this.element, 'background', "url(\"" + (this.imagePath + image) + "\") no-repeat");
    };
    OptionDirective.prototype.changeIcon = function () {
        var _this = this;
        console.log('OptionDirective.changeIcon()');
        var changeImage = function () {
            console.log('Changing the image');
            var backgroundStyle = _this.element.style.background;
            var image;
            if (backgroundStyle.includes(_this.imageOff)) {
                image = _this.imageOff.replace("-off", "-on");
            }
            else {
                image = _this.imageOff;
            }
            _this.renderer.setElementStyle(_this.element, 'background', "url(\"" + (_this.imagePath + image) + "\") no-repeat");
        };
        return changeImage;
    };
    return OptionDirective;
}());
__decorate([
    core_1.Input('ovt-option'),
    __metadata("design:type", String)
], OptionDirective.prototype, "option", void 0);
__decorate([
    core_1.Input('ovt-imagePath'),
    __metadata("design:type", String)
], OptionDirective.prototype, "imagePath", void 0);
__decorate([
    core_1.Input('ovt-image'),
    __metadata("design:type", String)
], OptionDirective.prototype, "imageOff", void 0);
__decorate([
    core_1.Input('ovt-deactivate'),
    __metadata("design:type", String)
], OptionDirective.prototype, "activeOption", void 0);
__decorate([
    core_1.Output('ovt-activate'),
    __metadata("design:type", Object)
], OptionDirective.prototype, "activate", void 0);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OptionDirective.prototype, "onClick", null);
__decorate([
    core_1.HostListener('mouseover'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OptionDirective.prototype, "onMouseOver", null);
__decorate([
    core_1.HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OptionDirective.prototype, "onMouseLeave", null);
OptionDirective = __decorate([
    core_1.Directive({
        selector: '[ovt-option]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], OptionDirective);
exports.OptionDirective = OptionDirective;
//# sourceMappingURL=option.directive.js.map