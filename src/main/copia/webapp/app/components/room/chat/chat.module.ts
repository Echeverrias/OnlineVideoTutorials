import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from "@angular/common";


import { ChatService } from './chat.service';

import { ChatComponent } from './chat.component';
import { ChatMessageComponent } from './chatMessage/chatMessage.component';


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
      ChatComponent,
      ChatMessageComponent
    ],
    providers: [ChatService],
    exports: [ChatComponent]

})
export class ChatModule { }