import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing } from './app.routing';

import { AppComponent }  from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';
import { RoomComponent } from './components/room/room.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chatMessage/chatMessage.component';

import { Connection } from './services/connection';
import { MyService } from './services/myService';
import { HandlerService } from './services/handler.service';
import { LoginService } from './services/login.service';
import { EventsEmitter } from './services/eventsEmitter'; 

import { AuthGuard } from './guards/auth.guard';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    WaitingRoomComponent,
    RoomComponent,
    ParticipantComponent,
    ChatComponent,
    ChatMessageComponent
  ],
  providers: [
      HandlerService,
      EventsEmitter,
      Connection, 
      MyService,
      AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/