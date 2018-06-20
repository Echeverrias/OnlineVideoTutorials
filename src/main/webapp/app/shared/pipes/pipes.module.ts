import { NgModule } from "@angular/core";
import { UserImageSanitizerPipe } from "./userFileSanitizer.pipe";
import { LimitToPipe } from "./limitTo.pipe";
import { SafePipe } from "./safe.pipe";
import { MimeTypePipe } from "./mimeType.pipe";

@NgModule({
   
    declarations: [UserImageSanitizerPipe, LimitToPipe, SafePipe, MimeTypePipe ],
    exports: [UserImageSanitizerPipe, LimitToPipe, SafePipe, MimeTypePipe ]
  })
  export class PipesModule { }