"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileLinkTemplate = "<div class=\"ovt-file-link\">\n    <button download class=\"ovt-download-btn\" title=\"Descargar\" (click)=\"onDownload()\">\n        <a class=\"ovt-download-link\" [href]=\"file.downloadUrl\"></a>\n    </button>\n    <span  [ngClass]=\"{'ovt-file-name': getExtension(file.name)==='pdf'}\" [title]=\"getExtension(file.name)==='pdf'?'Cargar':'No se puede cargar el tipo de archivo'\">{{file.name}}</span>\n</div>\n";
//# sourceMappingURL=fileLink.html.js.map