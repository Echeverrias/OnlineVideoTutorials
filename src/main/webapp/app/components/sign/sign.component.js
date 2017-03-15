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
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var Rx_1 = require('rxjs/Rx');
var sign_service_1 = require('../../services/sign.service');
var user_service_1 = require('../../services/user.service');
var file_service_1 = require('../../services/file.service');
var sign_html_1 = require('./sign.html');
(function (SignStates) {
    SignStates[SignStates["SignIn"] = 0] = "SignIn";
    SignStates[SignStates["SignUp"] = 1] = "SignUp";
    SignStates[SignStates["EditPerfil"] = 2] = "EditPerfil";
})(exports.SignStates || (exports.SignStates = {}));
var SignStates = exports.SignStates;
;
var SignComponent = (function () {
    function SignComponent(router, route, sanitizer, formBuilder, sign, me, file) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.formBuilder = formBuilder;
        this.sign = sign;
        this.me = me;
        this.file = file;
        console.log("% Sign constructor ");
        this.userImage$ = new Rx_1.Subject();
        //this.user = { userName: "", password: "", name: "", surname: "", email: "", userType: "" };
        this.sizeLimit = this.file.sizeLimit;
        console.log('ROUTE:');
        console.log(route);
        this.route.params
            .forEach(function (param) {
            console.log('forEach');
            console.log(param);
            if (param['state']) {
                _this.state = +param['state'];
            }
        });
        //Only the url for edit the perfil has a parameter    
        if (!this.state) {
            this.state = SignStates.SignIn;
        }
        console.log("STATE: ", this.state);
        console.log("/ Sign constructor " + new Date().toLocaleTimeString());
    }
    SignComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ME');
        console.log(this.me);
        console.log(this.me.getMe());
        if (this.state === SignStates.SignIn) {
            this.sign.init();
            this.rememberPassword = localStorage.getItem('rememberPassword') === 'true';
            this.signInForm = this.formBuilder.group({
                userName: [localStorage.getItem('ovtLastUserName'), forms_1.Validators.required],
                password: [localStorage.getItem(localStorage.getItem('ovtLastUserName')), forms_1.Validators.required],
                rememberPassword: [false]
            });
            this.signUpForm = this.formBuilder.group({
                userName: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)], this.validateUserName.bind(this)],
                password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
                confirmPassword: ["", [forms_1.Validators.required, this.confirmPassword.bind(this)]],
                name: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                surname: ["", [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                email: ["", [forms_1.Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: ["", forms_1.Validators.required]
            });
        }
        else if (this.state === SignStates.EditPerfil) {
            this.editPerfilForm = this.formBuilder.group({
                password: ["", [forms_1.Validators.required, this.validateNewPassword.bind(this)]],
                confirmPassword: ["", [forms_1.Validators.required, this.confirmNewPassword.bind(this)]],
                name: [this.me.myName, [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                surname: [this.me.mySurname, [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                email: [this.me.myEmail, [forms_1.Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: [this.me.myUserType, forms_1.Validators.required]
            });
            this.uploadImageUserOptions = {
                url: this.file.getUploadUserImageUrl(this.me.myUserName)
            };
            this.userImage$.subscribe(function (userImage) { _this.setMeUserImage(userImage), console.log(userImage); }, function (error) { return console.log(error); }, function () { return console.log('complete'); });
        }
        console.log(this.uploadImageUserOptions); //%
        console.log(this.me); //%
    };
    SignComponent.prototype.validateEmailPattern = function (control) {
        var emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
        emailRegExp.test(control.value) ? console.log("valid email") : console.log("invalid email");
        return emailRegExp.test(control.value) ? null : {
            validEmail: true
        };
    };
    SignComponent.prototype.validateUserName = function (control) {
        console.log("validateUserName");
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    SignComponent.prototype.validateEmail = function (control) {
        console.log("validateEmail");
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    SignComponent.prototype.confirmPassword = function (control) {
        return this.signUpForm && control.value === this.signUpForm.value['password'] ? null : {
            confirmPassword: true
        };
    };
    SignComponent.prototype.validateNewPassword = function (control) {
        return (this.editPerfilForm && ((control.value === "") || (control.value.length >= 8))) ? null : {
            validateNewPassword: true
        };
    };
    SignComponent.prototype.confirmNewPassword = function (control) {
        return this.editPerfilForm && control.value === this.editPerfilForm.value['password'] ? null : {
            confirmNewPassword: true
        };
    };
    // It checks, when a new user is going to register, that the user name and the email don't exists in the data base. 
    SignComponent.prototype.checkField = function (value, field) {
        var _this = this;
        console.log("check" + field + ": " + value);
        return new Rx_1.Observable(function (obs) {
            console.log(" new Observable");
            var infoField = {
                field: field,
                value: value,
                userName: _this.me.myUserName
            };
            _this.sign.validateField(infoField)
                .subscribe(function (data) {
                obs.next(null);
                obs.complete();
            }, function (error) {
                var key;
                var message = error.json().message;
                if (message === "userName taken") {
                    key = 'validUserName';
                }
                else if (message === "email taken") {
                    key = 'validEmail';
                }
                obs.next((_a = {}, _a[key] = true, _a));
                obs.complete();
                var _a;
            });
        });
    };
    SignComponent.prototype.onChangeToSignUp = function () {
        console.log("onChangeToSignUp()");
        this.state = SignStates.SignUp;
        this.checkFields = false;
    };
    // If some field form is incorrect a message will show 
    SignComponent.prototype.onGoingToClick = function () {
        console.log("onGoingToClick");
        console.log(this.user);
        this.checkFields = true;
        console.log("checkFields: " + this.checkFields);
    };
    SignComponent.prototype.doSignUp = function () {
        var _this = this;
        console.log(this.signUpForm);
        console.log(this.signUpForm.controls);
        this.sign.registerNewUser(this.signUpForm.value).subscribe(function (success) {
            if (success) {
                _this.authorizeUser(_this.signUpForm.value);
                _this.router.navigate(['/rooms']);
            }
        }, function (error) {
            console.log("ERROR");
            alert(error.json().message);
            console.error(error.json().message);
        }, function () { });
    };
    SignComponent.prototype.doModifyPerfil = function () {
        var _this = this;
        console.log(this.editPerfilForm);
        console.log(this.editPerfilForm.controls);
        this.sign.modifyPerfilUser(this.editPerfilForm.value).subscribe(function (success) {
            if (success) {
                _this.router.navigate(['/rooms']);
            }
        }, function (error) {
            console.log("ERROR");
            alert(error.json().message);
            console.error(error.json().message);
        }, function () { });
    };
    SignComponent.prototype.doSignIn = function () {
        var _this = this;
        console.log("");
        console.log("* Sign.doSignIn " + new Date().toLocaleTimeString());
        this.sign.validateUser(this.signInForm.value).subscribe(function (validUser) {
            console.log("VALID USER");
            console.log(validUser);
            console.log(_this.signInForm);
            console.log(_this.signInForm.controls);
            _this.authorizeUser(_this.signInForm.value);
            _this.router.navigate(['/rooms']);
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
    SignComponent.prototype.onReturnToSignIn = function () {
        this.state = SignStates.SignIn;
        this.checkFields = false;
    };
    SignComponent.prototype.authorizeUser = function (user) {
        localStorage.setItem('ovtUser', JSON.stringify(this.me.getMe()));
        localStorage.setItem('ovtLastUserName', user.userName);
        if (this.rememberPassword) {
            localStorage.setItem(user.userName, user.password);
            localStorage.setItem('rememberPassword', "true");
        }
        else {
            localStorage.setItem(user.userName, "");
            localStorage.setItem('rememberPassword', undefined);
        }
    };
    SignComponent.prototype.beforeUpload = function (uploadingFile) {
        console.log(uploadingFile);
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('El archivo no puede pesar más de 2 MB');
        }
    };
    SignComponent.prototype.handleUpload = function (data) {
        console.log("HANDLE UPLOAD");
        console.log("handleUpload - data:", data);
        console.log("handleUpload - data.status:", data.status);
        console.log("handleUpload - data.status === 200?:", data.status === 200);
        if (data && data.status) {
            if (data.status === 200) {
                console.log("Next");
                this.userImage$.next(JSON.parse(data.response));
            }
            else {
                console.log("Error");
                this.userImage$.error("ERROR");
            }
        }
    };
    SignComponent.prototype.setMeUserImage = function (userImage) {
        this.me.myUserImage = userImage;
    };
    SignComponent.prototype.getUserImageUrl = function () {
        return this.sanitizer.bypassSecurityTrustResourceUrl("data:" + this.me.myUserImageMimeType + "; base64," + this.me.myUserImageContent);
    };
    SignComponent.prototype.isSignInState = function () {
        return this.state === SignStates.SignIn;
    };
    SignComponent.prototype.isSignUpState = function () {
        return this.state === SignStates.SignUp;
    };
    SignComponent.prototype.isEditPerfilState = function () {
        return this.state === SignStates.EditPerfil;
    };
    SignComponent.prototype.onExitEditPerfil = function () {
        this.router.navigate(['/rooms']);
    };
    SignComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ovt-sign',
            styleUrls: ["sign.css"],
            template: sign_html_1.signTemplate,
            providers: [sign_service_1.SignService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, platform_browser_1.DomSanitizer, forms_1.FormBuilder, sign_service_1.SignService, user_service_1.UserService, file_service_1.FileService])
    ], SignComponent);
    return SignComponent;
}());
exports.SignComponent = SignComponent;
//# sourceMappingURL=sign.component.js.map