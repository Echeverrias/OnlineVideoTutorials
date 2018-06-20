export const pdfLoaderTemplate = `<div class="ovt-pdfLoader">

<input 
       style="display:none" 
       type="file"
       ngFileSelect
       [options]="options"
       (onUpload)="handleUpload($event)"
       (beforeUpload)="beforeUpload($event)"
       #fileInput>
<button type="button" (click)="fileInput.click()">Comparte un archivo</button>      
<br>
<br>
<div class="ovt-files-list">
    <ul>
        <li class="file" *ngFor="let file of files">
        <!--
            <button download class="ovt-download-btn" title="Descargar" (click)="onDownload()">
                <a class="ovt-download-link" [href]="file.downloadUrl"></a>
            </button>
            <span  [ngClass]="{'ovt-pdf-file': getExtension(file.name)==='pdf'}" (click)="onSelectedFile(file.loadUrl)" [title]="getExtension(file.name)==='pdf'?'Cargar':'No se puede cargar el tipo de archivo'">{{file.name}}</span>
            -->
            <ovt-links-file [access-file]="file" [valid-types]="validMimeTypes" (ovt-load-file)="onSelectedFile($event)"></ovt-links-file>
        </li>
    </ul>
</div>
</div>` 