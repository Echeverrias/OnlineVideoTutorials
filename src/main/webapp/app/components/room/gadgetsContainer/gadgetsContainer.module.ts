import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { GadgetsContainerComponent } from './gadgetsContainer.component';
import { OptionDirective } from './option.directive';
import { PdfLoaderModule } from './pdfLoader/pdfLoader.module';
import { NoteComponent } from './note/note.component';



@NgModule({
    imports: [CommonModule, PdfLoaderModule],
    declarations: [
        GadgetsContainerComponent,
        NoteComponent,
        OptionDirective
    ],
    exports: [GadgetsContainerComponent]

})
export class GadgetsContainerModule { }