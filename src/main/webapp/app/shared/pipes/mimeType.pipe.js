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
var MimeTypePipe = (function () {
    function MimeTypePipe() {
    }
    MimeTypePipe.prototype.transform = function (resource) {
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
                typeFile = "application/pdf";
        }
        console.log("MimeTypePipe(" + resource + "):" + typeFile);
        return typeFile;
    };
    MimeTypePipe.prototype.getExtension = function (fileName) {
        try {
            return fileName.split('.').pop();
        }
        catch (e) {
            return '';
        }
    };
    return MimeTypePipe;
}());
MimeTypePipe = __decorate([
    core_1.Pipe({
        name: 'mimetype'
    }),
    __metadata("design:paramtypes", [])
], MimeTypePipe);
exports.MimeTypePipe = MimeTypePipe;
//# sourceMappingURL=mimeType.pipe.js.map