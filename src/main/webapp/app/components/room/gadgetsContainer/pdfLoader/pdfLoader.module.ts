import { NgModule } from '@angular/core';


import { PdfLoaderComponent } from './pdfLoader.component';
import { PdfLoaderService } from './pdfLoader.service';
import { NgUploaderModule } from 'ngx-uploader';
import { SharedModule } from './../../../../shared/shared.module';
//b import { DirectivesModule } from './../../../../directives/directives.module';
//b import { FormsModule }   from '@angular/forms';
//b import { CommonModule } from "@angular/common";


@NgModule({
    imports: [NgUploaderModule, SharedModule],
    declarations: [PdfLoaderComponent],
    exports: [PdfLoaderComponent]
})
export class PdfLoaderModule { }