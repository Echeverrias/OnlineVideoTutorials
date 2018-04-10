import { NgModule } from "@angular/core";
import { UserImageSanitizerPipe } from "./userFileSanitizer.pipe";
import { LimitToPipe } from "./limitTo.pipe";

@NgModule({
   
    declarations: [UserImageSanitizerPipe, LimitToPipe],
    exports: [UserImageSanitizerPipe, LimitToPipe]
  })
  export class PipesModule { }