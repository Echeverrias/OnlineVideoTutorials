"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var commentary_html_1 = require("./commentary.html");
var CommentaryComponent = (function () {
    function CommentaryComponent() {
        this.content = '';
    }
    CommentaryComponent.prototype.ngOnInit = function () {
        console.log('CommentaryComponent.content: ', this.content);
    };
    return CommentaryComponent;
}());
CommentaryComponent = __decorate([
    core_1.Component({
        selector: 'ovt-commentary',
        template: commentary_html_1.commentaryTemplate,
        styles: ["\n    :host {\n        background: grey;\n        padding: 0.2em;\n        border: solid 1px #444;\n        position: absolute;\n        font-size: 14px;\n        color: white;\n        width: max-content;\n    }\n  "]
    })
], CommentaryComponent);
exports.CommentaryComponent = CommentaryComponent;
//# sourceMappingURL=commentary.component.js.map