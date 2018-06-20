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
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var sign_service_1 = require("../sign.service");
var auth_service_1 = require("../../../core/auth.service");
var signIn_html_1 = require("./signIn.html");
var SignInComponent = (function () {
    function SignInComponent(router, formBuilder, sign, auth) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.sign = sign;
        this.auth = auth;
        console.log("% Sign constructor ");
    }
    SignInComponent.prototype.ngOnInit = function () {
        console.log('SigIn.OnInit');
        console.log('ME');
        console.log('LoguedUser: ', this.auth.loggedUser);
        console.log("userName:" + this.auth.rememberedUserName + ", password:" + this.auth.getPassword(this.auth.rememberedUserName));
        this.init();
        this.signInForm = this.formBuilder.group({
            userName: [this.auth.rememberedUserName, forms_1.Validators.required],
            password: [this.auth.getPassword(this.auth.rememberedUserName), forms_1.Validators.required],
            rememberPassword: [this.auth.rememberPassword]
        });
    };
    SignInComponent.prototype.init = function () {
        if (this.auth.theUserIsLogged()) {
            this.sign.logout(this.auth.loggedUser);
        }
        this.auth.logout();
    };
    SignInComponent.prototype.onToggleRememberPassword = function () {
        this.auth.rememberPassword = this.signInForm.value.rememberPassword;
        console.log(this.signInForm.value.rememberPassword);
        console.log("SignInComponent.remeberPassword: " + this.auth.rememberPassword);
    };
    /**
     * If some field form is incorrect a message will show.
     */
    SignInComponent.prototype.onGoingToProcess = function () {
        this.checkFields = true;
        console.log("checkFields: " + this.checkFields);
    };
    SignInComponent.prototype.onChangeToSignUp = function () {
        console.log("onChangeToSignUp()");
        this.router.navigate(['/signUp']);
    };
    SignInComponent.prototype.doSignIn = function () {
        var _this = this;
        console.log("");
        console.log("* Sign.doSignIn " + new Date().toLocaleTimeString());
        this.sign.validateUser(this.signInForm.value).subscribe(function (user) {
            console.log("VALID USER");
            console.log(user);
            console.log(_this.signInForm);
            console.log(_this.signInForm.controls);
            if (_this.auth.registerUser(user)) {
                _this.auth.login(_this.signInForm.value);
                _this.router.navigate(['/rooms']);
                _this.sign.login(_this.auth.loggedUser);
            }
        }, function (error) {
            alert("El nombre de usuario o la contraseña son incorrectos");
            console.log("ERROR");
            console.log("error: " + error);
            console.log(error);
            console.error("Invalid user name or password");
        }, function () { });
        console.log("/ sign.doSignIn " + new Date().toLocaleTimeString());
        console.log("");
    };
    return SignInComponent;
}());
SignInComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-sign-in',
        styleUrls: ["signIn.css"],
        template: signIn_html_1.signInTemplate,
        providers: [],
        host: {
            class: 'ovt-sign-selector'
        }
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, sign_service_1.SignService, auth_service_1.AuthService])
], SignInComponent);
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signIn.component.js.map