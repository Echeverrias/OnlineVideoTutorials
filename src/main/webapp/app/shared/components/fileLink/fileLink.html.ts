export const fileLinkTemplate = `<div class="ovt-file-link">
    <button class="ovt-download-btn" title="Descargar">
        <a ovt-download class="ovt-download-link" [href]="file.downloadUrl"></a>
    </button>
    <span  [ngClass]="{'ovt-file-name': validType}" (click)="onLoadFile($event)" [title]="validType?'Cargar':'No se puede cargar el tipo de archivo'">{{file.name}}</span>
</div>
`