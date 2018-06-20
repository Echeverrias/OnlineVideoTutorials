import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "./../../directives/directives.module";
import { FileLinkComponent } from './fileLink.component';

@NgModule({
    imports: [CommonModule, DirectivesModule],
    declarations: [FileLinkComponent],
    exports: [ FileLinkComponent]
  })
  export class FileLinkModule { }