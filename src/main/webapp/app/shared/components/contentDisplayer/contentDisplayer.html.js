"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentDisplayerTemplate = "<div class=\"ovt-content-displayer\">\n<div class=\"displayer-container\">\n  <img class=\"btn\" [ngClass]=\"{validtype: validMimeType, novalidtype: !validMimeType}\" *ngIf=\"showCloseButton\" src=\"app/shared/components/contentDisplayer/img/close-icon.png\" title=\"Cerrar\" (click)=onCloseFile($event)>\n  <div class=\"object\" [ngSwitch]=\"mimeType\" (mouseover)=\"onMouseOverFile()\">\n    <object  *ngSwitchCase=\"'application/pdf'\" type=\"application/pdf\" [data]=\"fileUrl | safe: 'resourceUrl'\">\n      <p>No se ha podido cargar el archivo</p>\n    </object>\n    <object  class=\"text\" *ngSwitchCase=\"'text/plain'\" type=\"text/plain\" [data]=\"fileUrl | safe: 'resourceUrl'\">\n      <p>No se ha podido cargar el archivo</p>\n    </object>\n    <object class=\"image\" *ngSwitchCase=\"'image/jpeg'\" type=\"image/jpeg\" [data]=\"fileUrl | safe: 'resourceUrl'\">\n      <p>No se ha podido cargar el archivo</p>\n    </object>\n    <p class=\"no-valid-type\" *ngSwitchDefault>No se ha podido cargar el archivo</p>\n  </div>\n</div>\n</div>";
/**
  `<div class="ovt-content-displayer">
<div *ngIf="saveFileUrl && typeFile">
<img class="btn" *ngIf="showCloseButton" src="app/shared/components/contentDisplayer/img/close-icon.png" title="Cerrar" (click)=onCloseFile($event)>
<object *ngIf="typeFile == 'application/pdf'" [data]="saveFileUrl" type="application/pdf" (mouseover)="onMouseOverFile()">
   <p>You don't have a PDF plugin</p>
</object>



</div>
</div>`
 */ 
//# sourceMappingURL=contentDisplayer.html.js.map