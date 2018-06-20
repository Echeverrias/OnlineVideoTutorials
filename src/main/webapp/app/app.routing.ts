import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SignInComponent } from './components/sign/signIn/signIn.component';
import { SignUpComponent } from './components/sign/signUp/signUp.component';
import { EditPerfilComponent } from './components/sign/editPerfil/editPerfil.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';
import { RoomComponent } from './components/room/room.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/signIn', pathMatch: 'full' },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'editPerfil', component: EditPerfilComponent },
    { path: 'rooms', component: WaitingRoomComponent, canActivate:[AuthGuard] },
    { path: 'rooms/:roomId', component: RoomComponent , canActivate:[AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '/signIn' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

