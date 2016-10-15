"use strict";
/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
exports.waitingRoomTemplate = "<div id=\"ovt-waitingRoom\" class=\"animate join\">\n      \n    <div class=\"ovt-header\">Welcome <span>{{appService.myName}}</span></div>\n    <div class=\"ovt-container-col\">\n        <div class=\"header\">    \n            <h4 *ngIf=\"allAvaibleRoomsNames && allAvaibleRoomsNames.length === 0\">There are no avaibles rooms yet</h4>\n            <h4 *ngIf=\"allAvaibleRoomsNames && allAvaibleRoomsNames.length > 0\">Select a room</h4>\n        </div>\n        <button class=\"btn ovt-btn\" *ngFor=\"let room of allAvaibleRoomsNames\" (click)=\"joinRoom(room)\">{{room}}</button><br><br>\n        <button class=\"btn ovt-btn\"(click)=\"onLogOut()\">Log out</button>\n    </div>\n</div>";
//# sourceMappingURL=waitingRoom.html.js.map