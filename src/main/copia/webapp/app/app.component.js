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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var connection_service_1 = require("./services/connection.service");
var user_service_1 = require("./services/user.service");
var userOptions_component_1 = require("./components/userOptions/userOptions.component");
var validUserOptionsPath = 'rooms';
var AppComponent = (function () {
    function AppComponent(location, connection, me) {
        this.location = location;
        this.connection = connection;
        this.me = me;
        console.log("% AppComponent constructor");
        console.log(this.userOptions);
        console.log("/ AppComponent constructor");
    }
    AppComponent.prototype.beforeunloadHandler = function (event) {
        console.log(event);
        if (!sessionStorage.getItem("downloadEvent")) {
            console.log(this.me);
            console.log(this.me.userName);
            var jsonMessage = Object.assign(this.me.getMyInfo(), { id: "closeTab" });
            console.log(jsonMessage);
            this.connection.sendMessage(jsonMessage);
            this.connection.destroy();
        }
        sessionStorage.removeItem("downloadEvent");
    };
    ;
    AppComponent.prototype.ngAfterViewInit = function () {
        console.log('app - afterViewInit');
        console.log(this.userOptions);
    };
    AppComponent.prototype.displayUserOptions = function () {
        var currentUrl = this.location.prepareExternalUrl(this.location.path());
        return currentUrl.indexOf(validUserOptionsPath) >= 0;
    };
    AppComponent.prototype.onClickApp = function () {
        this.userOptions.onHideMenu();
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild(userOptions_component_1.UserOptionsComponent),
    __metadata("design:type", userOptions_component_1.UserOptionsComponent)
], AppComponent.prototype, "userOptions", void 0);
__decorate([
    core_1.HostListener('window:beforeunload', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "beforeunloadHandler", null);
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-app',
        styleUrls: ["app.css", "participant.css"],
        template: "\n        <div id=\"ovt-app\" (click)=\"onClickApp()\">\n          <router-outlet></router-outlet>\n          <ovt-user-options [ngClass]=\"{'ovt-user-options':true}\" [hidden]=\"!(this.me.logged && displayUserOptions)\"></ovt-user-options> \n       </div>"
    }),
    __metadata("design:paramtypes", [common_1.Location, connection_service_1.ConnectionService, user_service_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map