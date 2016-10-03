"use strict";
exports.roomTemplate = "<p>Room: {{name}}</p>\n<p>I'm {{appService.myName}}</p>\n\n<participant [id]=\"user.userName\" [ngClass]=\"{'tutor':'tutor'===user.userType, 'student':'student'===user.userType}\" [name]=\"user.name\" [userType]=\"user.userType\" [roomName]=\"name\" *ngFor=\"let user of users\"></participant>\n\n<ovt-chat [address]=\"address\"></ovt-chat>\n<button name=\"exitRoom\" (click)=\"onExitOfRoom()\">Exit</button>";
// [class]="user.usertType"  
//# sourceMappingURL=room.html.js.map