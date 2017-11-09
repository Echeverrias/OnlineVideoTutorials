import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from "@angular/common";

//import { ParticipantService } from './participant.service';

import { ParticipantComponent } from './participant.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
      ParticipantComponent,
      LoadingComponent
    ],
    
    exports: [ParticipantComponent]

})
export class ParticipantModule { }