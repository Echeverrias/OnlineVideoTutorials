import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from "@angular/common";

import { GadgetsContainerComponent } from './gadgetsContainer.component';
import { OptionDirective } from './option.directive';
import { PdfLoaderComponent } from './pdfLoader/pdfLoader.component';
import { NoteComponent } from './note/note.component';
import { NgUploaderModule } from 'ngx-uploader';


@NgModule({
    imports: [CommonModule, FormsModule, NgUploaderModule],
    declarations: [
        GadgetsContainerComponent,
        PdfLoaderComponent,
        NoteComponent,
        OptionDirective,
    ],
    exports: [ GadgetsContainerComponent ]

})
export class GadgetsContainerModule { }