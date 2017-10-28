import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routing';
import { NgUploaderModule } from 'ngx-uploader';
import { GadgetsContainerModule } from './components/gadgetsContainer/gadgetsContainer.module';
import { HistoryModule } from './components/history/history.module';

import { AppComponent }  from './app.component';
import { SignComponent } from './components/sign/sign.component';
import { UserOptionsComponent } from './components/userOptions/userOptions.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';
import { RoomComponent } from './components/room/room.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chatMessage/chatMessage.component';

import { ConnectionService } from './services/connection.service';
import { UserService } from './services/user.service';
import { HandlerService } from './services/handler.service';
import { FileService } from './services/file.service';

import { AuthGuard } from './guards/auth.guard';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
   NgUploaderModule, 
    GadgetsContainerModule, 
    HistoryModule,
    routing, 
  ],
  declarations: [
    UserOptionsComponent,
    AppComponent,
    SignComponent,
    WaitingRoomComponent,
    RoomComponent,
    ParticipantComponent,
    LoadingComponent,
    ChatComponent,
    ChatMessageComponent,
  ],
  providers: [
      HandlerService,
      ConnectionService, 
      UserService,
      AuthGuard,
      FileService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/