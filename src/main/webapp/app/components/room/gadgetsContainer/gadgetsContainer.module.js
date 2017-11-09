"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var gadgetsContainer_component_1 = require("./gadgetsContainer.component");
var option_directive_1 = require("./option.directive");
var pdfLoader_component_1 = require("./pdfLoader/pdfLoader.component");
var note_component_1 = require("./note/note.component");
var ngx_uploader_1 = require("ngx-uploader");
var GadgetsContainerModule = (function () {
    function GadgetsContainerModule() {
    }
    return GadgetsContainerModule;
}());
GadgetsContainerModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, ngx_uploader_1.NgUploaderModule],
        declarations: [
            gadgetsContainer_component_1.GadgetsContainerComponent,
            pdfLoader_component_1.PdfLoaderComponent,
            note_component_1.NoteComponent,
            option_directive_1.OptionDirective,
        ],
        exports: [gadgetsContainer_component_1.GadgetsContainerComponent]
    })
], GadgetsContainerModule);
exports.GadgetsContainerModule = GadgetsContainerModule;
//# sourceMappingURL=gadgetsContainer.module.js.map