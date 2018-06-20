"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var signIn_component_1 = require("./components/sign/signIn/signIn.component");
var signUp_component_1 = require("./components/sign/signUp/signUp.component");
var editPerfil_component_1 = require("./components/sign/editPerfil/editPerfil.component");
var waitingRoom_component_1 = require("./components/waitingRoom/waitingRoom.component");
var room_component_1 = require("./components/room/room.component");
var auth_guard_1 = require("./guards/auth.guard");
var appRoutes = [
    { path: '', redirectTo: '/signIn', pathMatch: 'full' },
    { path: 'signIn', component: signIn_component_1.SignInComponent },
    { path: 'signUp', component: signUp_component_1.SignUpComponent },
    { path: 'editPerfil', component: editPerfil_component_1.EditPerfilComponent },
    { path: 'rooms', component: waitingRoom_component_1.WaitingRoomComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'rooms/:roomId', component: room_component_1.RoomComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '/signIn' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map