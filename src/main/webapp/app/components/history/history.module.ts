import { PipesModule } from './../../pipes/pipes.module';
import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HistoryComponent } from './history.component';
import { RoomDetailsComponent } from './roomDetails/roomDetails.component';
import { HistoryService } from './history.service';
import { FileLinkComponent } from '../share/fileLink/fileLink.component';

const historyRoutes: Routes = [
    {path:"history", component: HistoryComponent}
] 

@NgModule({
    imports: [CommonModule, RouterModule.forChild(historyRoutes), DirectivesModule,  PipesModule],
    declarations: [
       HistoryComponent,
       RoomDetailsComponent,
       FileLinkComponent
   ],
    providers: [HistoryService],
    exports: [HistoryComponent]

})
export class HistoryModule { }