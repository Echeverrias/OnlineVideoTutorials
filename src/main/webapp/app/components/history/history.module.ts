import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";


import { HistoryComponent } from './history.component';
import { RoomsListModule } from './roomsList/roomsList.module';
import { HistoryService } from './history.service';
import { SharedModule } from '../../shared/shared.module';


const historyRoutes: Routes = [
    {path:"history", component: HistoryComponent}
] 

@NgModule({
    imports: [
        RouterModule.forChild(historyRoutes), 
        SharedModule,
    RoomsListModule],
    declarations: [
       HistoryComponent
    ],
    providers: [HistoryService],
    exports: [HistoryComponent]

})
export class HistoryModule { }
