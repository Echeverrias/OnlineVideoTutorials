import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignComponent } from './components/sign/sign.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';
import { RoomComponent } from './components/room/room.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/sign', pathMatch: 'full' },
    { path: 'sign', component: SignComponent },
    { path: 'editPerfil', component: SignComponent },
    { path: 'rooms', component: WaitingRoomComponent, canActivate:[AuthGuard] },
    { path: 'room/:roomName', component: RoomComponent , canActivate:[AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

