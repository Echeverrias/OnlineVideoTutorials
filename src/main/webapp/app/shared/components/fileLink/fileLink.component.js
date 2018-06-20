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
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require("@angular/core");
var fileLink_html_1 = require("./fileLink.html");
var platform_browser_1 = require("@angular/platform-browser");
var FileLinkComponent = (function () {
    function FileLinkComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.loadFile = new core_1.EventEmitter();
    }
    FileLinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.validType = this.validTypes ?
            (this.validTypes instanceof Array ?
                (this.validTypes.some(function (mt) { return mt === _this.file.mimeType; }) ? true : false) :
                (this.validTypes[this.file.mimeType] ? this.validTypes[this.file.mimeType] : false)) : true;
    };
    FileLinkComponent.prototype.getExtension = function (fileName) {
        return fileName.split('.').pop();
    };
    FileLinkComponent.prototype.onLoadFile = function (event) {
        console.log('FileLinkComponent.onLoadFile');
        console.log('file: ', this.file);
        console.log('validTypes: ', this.validTypes);
        console.log('validType: ', this.validType);
        if (this.validType) {
            console.log("FileLinkComponent.onLoadFile", this.file);
            this.loadFile.emit(this.file.loadUrl);
        }
        event.stopPropagation();
        event.preventDefault();
        return false;
    };
    return FileLinkComponent;
}());
__decorate([
    core_1.Input("access-file"),
    __metadata("design:type", Object)
], FileLinkComponent.prototype, "file", void 0);
__decorate([
    core_1.Input("valid-types"),
    __metadata("design:type", Object)
], FileLinkComponent.prototype, "validTypes", void 0);
__decorate([
    core_1.Output("ovt-load-file"),
    __metadata("design:type", core_1.EventEmitter)
], FileLinkComponent.prototype, "loadFile", void 0);
FileLinkComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-links-file',
        styleUrls: ['fileLink.css'],
        template: fileLink_html_1.fileLinkTemplate
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], FileLinkComponent);
exports.FileLinkComponent = FileLinkComponent;
//# sourceMappingURL=fileLink.component.js.map