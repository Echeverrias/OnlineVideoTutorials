import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routing';
import { NgUploaderModule } from 'ngx-uploader';

import { CoreModule } from './core/core.module';
import { RoomModule } from './components/room/room.module';
import { HistoryModule } from './components/history/history.module';
import { PipesModule } from './pipes/pipes.module';

import { AppComponent }  from './app.component';
import { SignComponent } from './components/sign/sign.component';
import { UserOptionsComponent } from './components/userOptions/userOptions.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';

import { AuthGuard } from './guards/auth.guard';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgUploaderModule, 
    CoreModule,
    RoomModule,
    HistoryModule,
    PipesModule,
    routing, 
  ],
  declarations: [
    UserOptionsComponent,
    AppComponent,
    SignComponent,
    WaitingRoomComponent,
  ],
  providers: [
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