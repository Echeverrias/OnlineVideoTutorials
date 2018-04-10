export const fileLinkTemplate = `<div class="ovt-file-link">
    <button download class="ovt-download-btn" title="Descargar" (click)="onDownload()">
        <a class="ovt-download-link" [href]="file.downloadUrl"></a>
    </button>
    <span  [ngClass]="{'ovt-file-name': getExtension(file.name)==='pdf'}" [title]="getExtension(file.name)==='pdf'?'Cargar':'No se puede cargar el tipo de archivo'">{{file.name}}</span>
</div>
`