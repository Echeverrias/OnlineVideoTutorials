import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { GadgetsContainerComponent } from './gadgetsContainer.component';
import { OptionDirective } from './option.directive';
import { PdfLoaderComponent } from './../pdfLoader/pdfLoader.component';
import { NoteComponent } from './../note/note.component';




@NgModule({
    imports: [CommonModule],
    declarations: [
        GadgetsContainerComponent,
        PdfLoaderComponent,
        NoteComponent,
        OptionDirective
    ],
    exports: [ GadgetsContainerComponent ]

})
export class GadgetsContainerModule { }