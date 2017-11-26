import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from "@angular/common";

import { GadgetsContainerModule } from './gadgetsContainer/gadgetsContainer.module';
import { ParticipantModule } from './participant/participant.module';
import { ChatModule } from './chat/chat.module';

import { RoomService } from './room.service';
import { ParticipantsService } from './participants.service';

import { RoomComponent } from './room.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageComponent } from './chat/chatMessage/chatMessage.component';


@NgModule({
    imports: [ 
        CommonModule, 
        FormsModule, 
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