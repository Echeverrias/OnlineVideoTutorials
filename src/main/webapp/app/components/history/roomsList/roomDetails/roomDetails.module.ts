import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { RoomDetailsComponent } from './roomDetails.component';



@NgModule({
    imports: [SharedModule],
    declarations: [
       RoomDetailsComponent
       ],
    exports: [RoomDetailsComponent]

})
export class RoomDetailsModule { }