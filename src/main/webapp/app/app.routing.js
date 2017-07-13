"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var sign_component_1 = require("./components/sign/sign.component");
var waitingRoom_component_1 = require("./components/waitingRoom/waitingRoom.component");
var room_component_1 = require("./components/room/room.component");
var auth_guard_1 = require("./guards/auth.guard");
var appRoutes = [
    { path: '', redirectTo: '/sign', pathMatch: 'full' },
    { path: 'sign', component: sign_component_1.SignComponent },
    { path: 'editPerfil', component: sign_component_1.SignComponent },
    { path: 'rooms', component: waitingRoom_component_1.WaitingRoomComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'room/:roomName', component: room_component_1.RoomComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '/sign' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
