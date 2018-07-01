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
var sign_service_1 = require("../sign.service");
var validation_service_1 = require("../validation.service");
var user_service_1 = require("../../../core/user.service");
var file_service_1 = require("../../../core/file.service");
var auth_service_1 = require("../../../core/auth.service");
var sign_html_1 = require("./sign.html");
var EditPerfilComponent = (function () {
    function EditPerfilComponent(router, sanitizer, validation, formBuilder, sign, me, file, auth) {
        this.router = router;
        this.sanitizer = sanitizer;
        this.validation = validation;
        this.formBuilder = formBuilder;
        this.sign = sign;
        this.me = me;
        this.file = file;
        this.auth = auth;
        console.log("% Edit Perfil constructor ");
        this.userImage$ = new Rx_1.Subject();
        this.sizeLimit = this.file.sizeLimit;
        console.log("/ Edit Perfil constructor " + new Date().toLocaleTimeString());
    }
    EditPerfilComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ME');
        console.log(this.me);
        console.log(this.me.getMe());
        this.editPerfilForm = this.formBuilder.group({
            password: [this.auth.getPassword(this.me.userName), [forms_1.Validators.minLength(this.validation.minPasswordLength)]],
            confirmationPassword: [this.auth.getPassword(this.me.userName), [forms_1.Validators.minLength(this.validation.minPasswordLength), this.validation.confirmPassword.bind(this.validation)]],
            name: [this.me.name, [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minLength)]],
            surname: [this.me.surname, [forms_1.Validators.required, forms_1.Validators.minLength(this.validation.minLength)]],
            email: [this.me.email, [forms_1.Validators.required, this.validation.validateEmailPattern], this.validation.validateEmail.bind(this.validation)],
            userType: [this.me.userType, forms_1.Validators.required]
        }, { validator: this.validation.checkPassword });
        this.editPerfilForm.controls['password'].valueChanges.subscribe(function (value) { setTimeout(function () { return _this.editPerfilForm.controls['confirmationPassword'].updateValueAndValidity(); }, 200); });
        this.uploadImageUserOptions = {
            url: this.file.getUploadUserImageUrl(this.me.userName)
        };
        this.userImage$.subscribe(function (userImage) { _this.setMeUserImage(userImage), console.log(userImage); }, function (error) { return console.log(error); }, function () { return console.log('complete'); });
    };
    /**
     * If some field form is incorrect a message will show.
     */
    EditPerfilComponent.prototype.onGoingToProcess = function () {
        this.checkFields = true;
        console.log("checkFields: " + this.checkFields);
    };
    EditPerfilComponent.prototype.doModifyPerfil = function () {
        var _this = this;
        console.log(this.editPerfilForm);
        console.log(this.editPerfilForm.controls);
        console.log(this.editPerfilForm.value);
        this.sign.modifyPerfilUser(this.editPerfilForm.value).subscribe(function (user) {
            if (_this.auth.registerUser(user)) {
                _this.auth.updateUserLogin(_this.editPerfilForm.value);
                _this.router.navigate(['/rooms']);
            }
        }, function (error) {
            console.log("ERROR");
            alert(error.json().message);
            console.error(error.json().message);
        }, function () { });
    };
    EditPerfilComponent.prototype.beforeUpload = function (uploadingFile) {
        console.log(uploadingFile);
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('El archivo no puede pesar más de 2 MB');
        }
    };
    EditPerfilComponent.prototype.handleUpload = function (data) {
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
    EditPerfilComponent.prototype.setMeUserImage = function (userImage) {
        this.me.userImage = userImage;
    };
    EditPerfilComponent.prototype.getUserImageUrl = function () {
        return this.sanitizer.bypassSecurityTrustResourceUrl("data:" + this.me.userImageMimeType + "; base64," + this.me.userImageContent);
    };
    EditPerfilComponent.prototype.onExitEditPerfil = function () {
        this.router.navigate(['/rooms']);
    };
    return EditPerfilComponent;
}());
EditPerfilComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-edit-perfil',
        styleUrls: ["edit-perfil.css"],
        template: sign_html_1.editPerfilTemplate,
        providers: [],
        host: {
            class: 'ovt-sign-selector'
        }
    }),
    __metadata("design:paramtypes", [router_1.Router, platform_browser_1.DomSanitizer, validation_service_1.ValidationService, forms_1.FormBuilder, sign_service_1.SignService, user_service_1.UserService, file_service_1.FileService, auth_service_1.AuthService])
], EditPerfilComponent);
exports.EditPerfilComponent = EditPerfilComponent;
//# sourceMappingURL=editPerfil.component.js.map