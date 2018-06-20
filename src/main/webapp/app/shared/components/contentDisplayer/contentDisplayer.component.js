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
var platform_browser_1 = require("@angular/platform-browser");
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require("@angular/core");
var contentDisplayer_html_1 = require("./contentDisplayer.html");
var ContentDisplayerComponent = ContentDisplayerComponent_1 = (function () {
    //private saveFileUrl: SafeResourceUrl
    function ContentDisplayerComponent(sanitizer) {
        this.sanitizer = sanitizer;
        console.log('ContentDisplayerComponent.constructor');
        this.eeClose = new core_1.EventEmitter();
        console.log('fileUrl: ', this.fileUrl);
    }
    ContentDisplayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ContentDisplayerComponent.onInit()');
        console.log('fileUrl: ', this.fileUrl);
        //   console.log('type: ', this.type);
        //  this.typeFile = this.type;
        this.mimeType = this.getMimeType(this.fileUrl);
        this.validMimeType = ContentDisplayerComponent_1._validMimeTypes.some(function (mt) { return mt === _this.mimeType; });
        this.showCloseButton = false;
        // this.saveFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl);
        //this.typeFile=this.getTypeFile(this.fileUrl);
    };
    /*
        private getTypeFile (fileUrl:string): string{
            console.log("ContentDisplayerComponent.getTypeFile(fileUrl)", fileUrl);
            let extension: string = "";
            let typeFile: string;
            switch(extension){
                case "pdf":
                typeFile="application/pdf";
                    break;
                default:
                typeFile="application/pdf";
            }
            console.log(`return ${typeFile}`);
            return typeFile;
         }
    */
    ContentDisplayerComponent.getValidMimeTypes = function () {
        return ContentDisplayerComponent_1._validMimeTypes.slice();
    };
    ContentDisplayerComponent.prototype.getMimeType = function (resource) {
        var extension = this.getExtension(resource);
        var typeFile;
        switch (extension) {
            case "pdf":
                typeFile = "application/pdf";
                break;
            case "txt":
                typeFile = "text/plain";
                break;
            case "doc":
                typeFile = "application/msword";
                break;
            case "odt":
                typeFile = "application/vnd.oasis.opendocument.text";
                break;
            case "jpeg":
            case "jpg":
                typeFile = "image/jpeg";
                break;
            case "ppt":
                typeFile = "application/vnd.ms-powerpoint";
                break;
            default:
                typeFile = "";
        }
        console.log("MimeTypePipe(" + resource + "):" + typeFile);
        return typeFile;
    };
    ContentDisplayerComponent.prototype.getExtension = function (fileName) {
        try {
            return fileName.split('.').pop();
        }
        catch (e) {
            return '';
        }
    };
    ContentDisplayerComponent.prototype.onLoadFile = function (fileUrl) {
        console.log("RoomComponent.onLoadFile(" + fileUrl + ")");
    };
    ContentDisplayerComponent.prototype.onMouseOverFile = function () {
        console.log("onMouseOverFile");
        this.showCloseButton = true;
    };
    ContentDisplayerComponent.prototype.onCloseFile = function (event) {
        // this.saveFileUrl = undefined;
        this.fileUrl = undefined;
        this.showCloseButton = false;
        this.eeClose.emit(true);
        event.stopPropagation();
        return false;
    };
    return ContentDisplayerComponent;
}());
ContentDisplayerComponent._validMimeTypes = [
    "application/pdf", "text/plain", "image/jpeg"
];
__decorate([
    core_1.Input("ovt-file-url"),
    __metadata("design:type", String)
], ContentDisplayerComponent.prototype, "fileUrl", void 0);
__decorate([
    core_1.Output("ovt-close"),
    __metadata("design:type", core_1.EventEmitter)
], ContentDisplayerComponent.prototype, "eeClose", void 0);
ContentDisplayerComponent = ContentDisplayerComponent_1 = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-content-displayer',
        styleUrls: ['contentDisplayer.css'],
        template: contentDisplayer_html_1.contentDisplayerTemplate
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], ContentDisplayerComponent);
exports.ContentDisplayerComponent = ContentDisplayerComponent;
var ContentDisplayerComponent_1;
//# sourceMappingURL=contentDisplayer.component.js.map