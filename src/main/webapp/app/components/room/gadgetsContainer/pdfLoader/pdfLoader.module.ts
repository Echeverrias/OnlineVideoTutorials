import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from "@angular/common";

import { PdfLoaderComponent } from './pdfLoader.component';
import { PdfLoaderService } from './pdfLoader.service';
import { NgUploaderModule } from 'ngx-uploader';
import { DirectivesModule } from './../../../../directives/directives.module';


@NgModule({
    imports: [CommonModule, FormsModule, NgUploaderModule, DirectivesModule],
    declarations: [PdfLoaderComponent],
    exports: [PdfLoaderComponent]
})
export class PdfLoaderModule { }