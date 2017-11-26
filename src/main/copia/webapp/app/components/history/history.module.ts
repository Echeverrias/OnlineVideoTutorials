import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HistoryComponent } from './history.component';
import { RoomDetailsComponent } from './roomDetails/roomDetails.component';
import { HistoryService } from './history.service';

const historyRoutes: Routes = [
    {path:"history", component: HistoryComponent}
] 

@NgModule({
    imports: [CommonModule, RouterModule.forChild(historyRoutes)],
    declarations: [
       HistoryComponent,
       RoomDetailsComponent
    ],
    providers: [HistoryService],
    exports: [HistoryComponent]

})
export class HistoryModule { }