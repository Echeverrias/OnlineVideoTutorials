"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomTemplate = "<div id=\"ovt-room\">\n    <ovt-gadgets-container [class.showed]=\"activeGadget\" [ovt-address]=\"address\" (ovt-activeOption)=\"showGadget($event)\"  (ovt-file)=\"onLoadFile($event)\"></ovt-gadgets-container>\n    <div class=\"main\">\n        <div class=\"dashboard\">\n           <ovt-participant *ngIf=\"mainUser.userName\" [id]=\"mainUser.userName\" [ngClass]=\"{'main-participant':mainUser && !fileUrl, 'minimized': fileUrl}\" [size]=\"fileUrl?'small':'large'\" [name]=\"mainUser.name\" [userType]=\"mainUser.userType\" [roomName]=\"name\"></ovt-participant>\n           <div class=\"ovt-file\" *ngIf=\"fileUrl\">\n               <img class=\"btn\" *ngIf=\"showCloseButton\" src=\"app/components/room/img/close-icon.png\" title=\"Cerrar\" (click)=onCloseFile()>\n               <object [data]=\"fileUrl\" type=\"application/pdf\" typemustmatch  (mouseover)=\"onMouseOverFile()\">\n                  <p>You don't have a PDF plugin, but you can <a href=\"myfile.pdf\">download the PDF file.</a></p>\n               </object>\n            </div>\n        </div>\n        \n        <ovt-chat class=\"chat\" [address]=\"address\"></ovt-chat>\n        \n    </div>\n    <div class=\"secundary\">\n        <ovt-participant [id]=\"user.userName\" [ngClass]=\"{'tutor':user.isATutor(), 'student':user.isAStudent()}\" [name]=\"user.name\" [userType]=\"user.userType\" [roomName]=\"name\" [size]=\"'small'\" *ngFor=\"let user of users\"></ovt-participant>\n    </div>\n    <button name=\"exitRoom\" (click)=\"onExitOfRoom()\">Salir</button>\n</div>";
//# sourceMappingURL=room.html.js.map