export const contentDisplayerTemplate = `<div class="ovt-content-displayer">
<div class="displayer-container">
  <img class="btn" [ngClass]="{validtype: validMimeType, novalidtype: !validMimeType}" *ngIf="showCloseButton" src="app/shared/components/contentDisplayer/img/close-icon.png" title="Cerrar" (click)=onCloseFile($event)>
  <div class="object" [ngSwitch]="mimeType" (mouseover)="onMouseOverFile()">
    <object  *ngSwitchCase="'application/pdf'" type="application/pdf" [data]="fileUrl | safe: 'resourceUrl'">
      <p>No se ha podido cargar el archivo</p>
    </object>
    <object  class="text" *ngSwitchCase="'text/plain'" type="text/plain" [data]="fileUrl | safe: 'resourceUrl'">
      <p>No se ha podido cargar el archivo</p>
    </object>
    <object class="image" *ngSwitchCase="'image/jpeg'" type="image/jpeg" [data]="fileUrl | safe: 'resourceUrl'">
      <p>No se ha podido cargar el archivo</p>
    </object>
    <p class="no-valid-type" *ngSwitchDefault>No se ha podido cargar el archivo</p>
  </div>
</div>
</div>`

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