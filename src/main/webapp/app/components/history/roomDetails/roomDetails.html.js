"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
exports.roomDetailsTemplate = "<div class=\"ovt-room-details\" class=\"animate join\"> \n    <div>Tutor: {{room.tutor}}</div>\n    <div>\n        <div class=\"ovt-selectable\" (click)=\"showOrHideParticipants()\">Participantes: {{room.participantsHistory.length}}</div>\n        <ul *ngIf=\"participantsSelected\">\n            <li *ngFor=\"let participant of room.participantsHistory\">{{participant.userName}}</li>\n        </ul>\n    </div>\n    <div>\n    <div class=\"ovt-selectable\" (click)=\"showOrHideFiles($event)\">Archivos: {{room.filesHistory.length}}</div>\n        <ul *ngIf=\"filesSelected\">\n            <li *ngFor=\"let file of room.filesHistory\">{{file.name}}</li>\n        </ul>\n    </div>\n</div>";
//# sourceMappingURL=roomDetails.html.js.map