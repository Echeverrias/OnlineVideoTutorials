"use strict";
exports.participantComponentTemplate = "<div class=\"ovt-participant\">\n    <div class=\"video\"> \n        <video [ngClass]=\"setClasses()\" #video id=\"video-{{id}}\" autoplay></video>\n        <ovt-loading *ngIf=\"!video.src || loading\"></ovt-loading>\n        <div class=\"video-footer\">{{getFirstName()}}</div>\n    </div>\n</div>";
//# sourceMappingURL=participant.html.js.map