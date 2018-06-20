import { NgModule } from '@angular/core';


import { GadgetsContainerModule } from './gadgetsContainer/gadgetsContainer.module';
import { ParticipantModule } from './participant/participant.module';
import { ChatModule } from './chat/chat.module';

import { RoomService } from './room.service';
import { ParticipantsService } from './participants.service';

import { RoomComponent } from './room.component';
import { SharedModule } from '../../shared/shared.module';
//b import { FormsModule }   from '@angular/forms';
//b import { CommonModule } from "@angular/common";
//b import { ChatComponent } from './chat/chat.component';
//b import { ChatMessageComponent } from './chat/chatMessage/chatMessage.component';



@NgModule({
    imports: [ 
        SharedModule,
        GadgetsContainerModule,
        ParticipantModule,
        ChatModule
    ],
    declarations: [
        RoomComponent,
    ],
    providers: [RoomService, ParticipantsService],
    exports: [RoomComponent]

})
export class RoomModule { }