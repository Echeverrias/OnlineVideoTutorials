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
var platform_browser_1 = require("@angular/platform-browser");
var Rx_1 = require("rxjs/Rx");
var sign_service_1 = require("./sign.service");
var user_service_1 = require("../../services/user.service");
var file_service_1 = require("../../services/file.service");
var sign_html_1 = require("./sign.html");
var SignStates;
(function (SignStates) {
    SignStates[SignStates["SignIn"] = 0] = "SignIn";
    SignStates[SignStates["SignUp"] = 1] = "SignUp";
    SignStates[SignStates["EditPerfil"] = 2] = "EditPerfil";
})(SignStates = exports.SignStates || (exports.SignStates = {}));
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
        this.minPasswordLength = 8;
        this.minLength = 3;
        console.log("% Sign constructor ");
        this.userImage$ = new Rx_1.Subject();
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
            this.initStorage();
            this.signInForm = this.formBuilder.group({
                userName: [localStorage.getItem('ovtLastUserName'), forms_1.Validators.required],
                password: [localStorage.getItem(localStorage.getItem('ovtLastUserName')), forms_1.Validators.required],
                rememberPassword: [false]
            });
            this.signUpForm = this.formBuilder.group({
                userName: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.minLength)], this.validateUserName.bind(this)],
                password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.minPasswordLength)]],
                confirmationPassword: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.minPasswordLength), this.confirmPassword.bind(this)]],
                name: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.minLength)]],
                surname: ["", [forms_1.Validators.required, forms_1.Validators.minLength(this.minLength)]],
                email: ["", [forms_1.Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: ["", forms_1.Validators.required],
            }, { validator: this.checkPassword });
            this.signUpForm.controls['password'].valueChanges.subscribe(function (value) { setTimeout(function () { return _this.signUpForm.controls['confirmationPassword'].updateValueAndValidity(); }, 200); });
        }
        else if (this.state === SignStates.EditPerfil) {
            this.editPerfilForm = this.formBuilder.group({
                password: [sessionStorage.getItem(this.me.userName), [forms_1.Validators.minLength(this.minPasswordLength)]],
                confirmationPassword: [sessionStorage.getItem(this.me.userName), [forms_1.Validators.minLength(this.minPasswordLength), this.confirmPassword.bind(this)]],
                name: [this.me.name, [forms_1.Validators.required, forms_1.Validators.minLength(this.minLength)]],
                surname: [this.me.surname, [forms_1.Validators.required, forms_1.Validators.minLength(this.minLength)]],
                email: [this.me.email, [forms_1.Validators.required, this.validateEmailPattern], this.validateEmail.bind(this)],
                userType: [this.me.userType, forms_1.Validators.required]
            }, { validator: this.checkPassword });
            this.editPerfilForm.controls['password'].valueChanges.subscribe(function (value) { setTimeout(function () { return _this.editPerfilForm.controls['confirmationPassword'].updateValueAndValidity(); }, 200); });
            this.uploadImageUserOptions = {
                url: this.file.getUploadUserImageUrl(this.me.userName)
            };
            this.userImage$.subscribe(function (userImage) { _this.setMeUserImage(userImage), console.log(userImage); }, function (error) { return console.log(error); }, function () { return console.log('complete'); });
        }
    };
    SignComponent.prototype.initStorage = function () {
        sessionStorage.setItem(localStorage.getItem('ovtLastUserName'), undefined),
            this.rememberPassword = localStorage.getItem('rememberPassword') === 'true';
    };
    // SignUpForm and EditPerfilForm's validators
    SignComponent.prototype.confirmPassword = function (control) {
        return control.root && control.value === control.root.value['password'] ? null : {
            confirmPassword: true
        };
    };
    SignComponent.prototype.checkPassword = function (control) {
        var password = control.get('password');
        var confirmationPassword = control.get('confirmationPassword');
        if (!password || !confirmationPassword)
            return null;
        return password.value === confirmationPassword.value ? null : {
            checkPassword: true
        };
    };
    SignComponent.prototype.validateUserName = function (control) {
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    SignComponent.prototype.validateEmail = function (control) {
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    };
    /**
    * It checks, when a new user is going to register, that the user name and the email don't exists in the data base.
    */ SignComponent.prototype.checkField = function (value, field) {
        var _this = this;
        console.log("check" + field + ": " + value);
        return new Rx_1.Observable(function (obs) {
            console.log(" new Observable");
            var infoField = {
                field: field,
                value: value,
                userName: _this.me.userName
            };
            _this.sign.validateField(infoField)
                .subscribe(function (response) {
                obs.next(null);
                obs.complete();
            }, function (error) {
                var key;
                var message = error.json().message;
                if (message === "userName taken") {
                    key = 'userNameTaken';
                }
                else if (message === "email taken") {
                    key = 'emailTaken';
                }
                obs.next((_a = {}, _a[key] = true, _a));
                obs.complete();
                var _a;
            });
        });
    };
    // EditPerfilForm validator
    SignComponent.prototype.validateNewPasswordLength = function (control) {
        return (control.root && ((control.value.length == 0) || (control.value.length >= 8))) ? null : {
            validateNewPasswordLength: { actualLength: control.value.length, requiredLength: 8 }
        };
    };
    SignComponent.prototype.validateEmailPattern = function (control) {
        var emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
        return emailRegExp.test(control.value) ? null : {
            emailPattern: true
        };
    };
    SignComponent.prototype.onChangeToSignUp = function () {
        console.log("onChangeToSignUp()");
        console.log(this.signUpForm); //%
        this.state = SignStates.SignUp;
        this.checkFields = false;
    };
    /**
     * If some field form is incorrect a message will show.
     */
    SignComponent.prototype.onGoingToProcess = function () {
        if (this.signUpForm) {
            console.log(this.signUpForm);
        }
        if (this.editPerfilForm) {
            console.log(this.editPerfilForm);
        }
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
        sessionStorage.setItem(user.userName, user.password);
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
        this.me.userImage = userImage;
    };
    SignComponent.prototype.getUserImageUrl = function () {
        return this.sanitizer.bypassSecurityTrustResourceUrl("data:" + this.me.userImageMimeType + "; base64," + this.me.userImageContent);
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
    return SignComponent;
}());
SignComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-sign',
        styleUrls: ["sign.css"],
        template: sign_html_1.signTemplate,
        providers: [sign_service_1.SignService],
        host: {
            class: 'ovt-sign-selector'
        }
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, platform_browser_1.DomSanitizer, forms_1.FormBuilder, sign_service_1.SignService, user_service_1.UserService, file_service_1.FileService])
], SignComponent);
exports.SignComponent = SignComponent;
//# sourceMappingURL=sign.component.js.map