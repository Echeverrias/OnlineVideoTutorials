import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "./../../pipes/pipes.module";
import { DirectivesModule } from "./../../directives/directives.module";
import { ContentDisplayerComponent } from './contentDisplayer.component';

@NgModule({
    imports: [CommonModule,PipesModule, DirectivesModule],
    declarations: [ContentDisplayerComponent],
    exports: [ ContentDisplayerComponent]
  })
  export class ContentDisplayerModule { }