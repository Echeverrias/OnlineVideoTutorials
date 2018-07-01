import { NgModule } from '@angular/core';
import { CommentaryAnchorDirective } from './commentaryAnchor.directive';
import { CommentaryComponent } from './commentary/commentary.component';


@NgModule({
  declarations: [CommentaryAnchorDirective , CommentaryComponent],
  entryComponents: [ CommentaryComponent ],
  exports: [CommentaryAnchorDirective ]
})
export class CommentaryAnchorModule { }
