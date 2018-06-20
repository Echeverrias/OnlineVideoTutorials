import { NgModule } from '@angular/core';

import { RoomsListComponent } from './roomsList.component';
import { RoomDetailsModule } from './roomDetails/roomDetails.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
    RoomDetailsModule],
    declarations: [
       RoomsListComponent
   ],
    exports: [RoomsListComponent]

})
export class RoomsListModule { }
