"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var user_service_1 = require('../../services/user.service');
var userOptions_html_1 = require('./userOptions.html');
var sign_component_1 = require('../sign/sign.component');
var UserOptionsComponent = (function () {
    function UserOptionsComponent(router, sanitizer, me) {
        this.router = router;
        this.sanitizer = sanitizer;
        this.me = me;
        this.menuDisplayed = false;
        console.log(this.router);
    }
    UserOptionsComponent.prototype.onEditAccount = function () {
        this.onDisplayMenu();
        this.router.navigate(['/sign', { state: sign_component_1.SignStates.EditPerfil }]);
    };
    UserOptionsComponent.prototype.onSignOut = function () {
        console.log("");
        console.log("* <- UserOptions.onSignOut " + new Date().toLocaleTimeString());
        this.onDisplayMenu();
        this.router.navigate(['/sign']);
    };
    UserOptionsComponent.prototype.getUserImageUrl = function () {
        return this.sanitizer.bypassSecurityTrustResourceUrl("data:" + this.me.myUserImageMimeType + "; base64," + this.me.myUserImageContent);
    };
    UserOptionsComponent.prototype.onDisplayMenu = function () {
        this.menuDisplayed = !this.menuDisplayed;
    };
    UserOptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-user-options',
            styleUrls: ['userOptions.css'],
            template: userOptions_html_1.userOptionsTemplate
        }), 
        __metadata('design:paramtypes', [router_1.Router, platform_browser_1.DomSanitizer, user_service_1.UserService])
    ], UserOptionsComponent);
    return UserOptionsComponent;
}());
exports.UserOptionsComponent = UserOptionsComponent;
//# sourceMappingURL=userOptions.component.js.map