import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContentDisplayerModule} from "./contentDisplayer/contentDisplayer.module";
import { PaginationComponent } from "./pagination/pagination.component";
import { FileLinkModule } from "./fileLink/fileLink.module";
import { SelectModule } from "./select/select.module";


@NgModule({
    imports: [ CommonModule, FileLinkModule, SelectModule, ContentDisplayerModule ],
    declarations: [  PaginationComponent],
    exports: [ContentDisplayerModule, PaginationComponent, FileLinkModule, SelectModule]
  })
  export class ComponentsModule { }
