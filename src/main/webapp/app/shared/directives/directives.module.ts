
import { NgModule } from '@angular/core';
import { DownloadDirective } from './download.directive';
import { SizeDirective } from './size.directive';
import { StopPropagationDirective } from './stopPropagation.directive';
import { AttributesDirective } from './attributes.directive';
import { CommentaryAnchorModule } from './commentaryAnchor/commentaryAnchor.module';

@NgModule({
    imports: [CommentaryAnchorModule],
    declarations: [DownloadDirective, StopPropagationDirective, SizeDirective, AttributesDirective],
    exports: [CommentaryAnchorModule, DownloadDirective, StopPropagationDirective, SizeDirective, AttributesDirective]
})

export class DirectivesModule { }
