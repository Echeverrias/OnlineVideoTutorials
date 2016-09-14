"use strict";
exports.roomTemplate = "<h1>Room: {{name}}</h1>\n<p>I'm {{appService.myName}}</p>\n\n<h4>Participants:</h4>\n<participant [id]=\"user.userName\" [ngClass]=\"{'tutor':'tutor'===user.userType, 'student':'student'===user.userType}\" [name]=\"user.name\" [userType]=\"user.userType\" [roomName]=\"name\" *ngFor=\"let user of users\"></participant>\n<button (click)=\"onExitOfRoom()\">Exit</button>";
// [class]="user.usertType"  
//# sourceMappingURL=room.html.js.map