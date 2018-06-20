
import { NgModule } from '@angular/core';
import { DownloadDirective } from './download.directive';
import { SizeDirective } from './size.directive';
import { StopPropagationDirective } from './stopPropagation.directive';
import { AttributesDirective } from './attributes.directive';

@NgModule({
    declarations: [DownloadDirective, StopPropagationDirective, SizeDirective, AttributesDirective],
    exports: [DownloadDirective, StopPropagationDirective, SizeDirective, AttributesDirective]
})

export class DirectivesModule { }