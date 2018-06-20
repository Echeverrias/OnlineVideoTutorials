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
var validation_service_1 = require("../validation.service");
var signUp_html_1 = require("./signUp.html");
var SignUpComponent = (function () {
    function SignUpComponent(router, validation, formBuilder, sign, auth) {
        this.router = router;
        this.validation = validation;
        this.formBuilder = formBuilder;
        this.sign = sign;
        this.auth = auth;
        console.log("% SignUp constructor ");
        console.log("/ SignUp constructor " + new Date().toLocaleTimeString());
    }
    SignUpComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ME');
        console.log(this.auth.loggedUser);
        this.signUpForm = this.formBuilder.group({
            userName: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minLength)], this.validation.validateUserName.bind(this.validation)],
            password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minPasswordLength)]],
            confirmationPassword: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minPasswordLength), this.validation.confirmPassword.bind(this.validation)]],
            name: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minLength)]],
            surname: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minLength)]],
            email: ["", [forms_1.Validators.required, this.validation.validateEmailPattern], this.validation.validateEmail.bind(this.validation)],
            userType: ["", forms_1.Validators.required],
        }, { validator: this.validation.checkPassword });
        this.signUpForm.controls['password'].valueChanges.subscribe(function (value) { setTimeout(function () { return _this.signUpForm.controls['confirmationPassword'].updateValueAndValidity(); }, 200); });
    };
    /**
     * If some field form is incorrect a message will show.
     */
    SignUpComponent.prototype.onGoingToProcess = function () {
        this.checkFields = true;
        console.log("checkFields: " + this.checkFields);
    };
    SignUpComponent.prototype.onReturnToSignIn = function () {
        this.router.navigate(['/signIn']);
    };
    SignUpComponent.prototype.doSignUp = function () {
        var _this = this;
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);
        this.sign.registerNewUser(this.signUpForm.value).subscribe(function (user) {
            if (_this.auth.registerUser(user)) {
                _this.auth.login(_this.signUpForm.value);
                _this.router.navigate(['/rooms']);
                _this.sign.login(_this.auth.loggedUser);
            }
        }, function (error) {
            console.log("ERROR");
            alert(error.json().message);
            console.error(error.json().message);
        }, function () { });
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-sign-up',
        styleUrls: ["signUp.css"],
        template: signUp_html_1.signUpTemplate,
        providers: [],
        host: {
            class: 'ovt-sign-selector'
        }
    }),
    __metadata("design:paramtypes", [router_1.Router, validation_service_1.ValidationService, forms_1.FormBuilder, sign_service_1.SignService, auth_service_1.AuthService])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signUp.component.js.map