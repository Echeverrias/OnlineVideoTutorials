"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPerfilTemplate = " <div id=\"ovt-edit-perfil\" class=\"animate container\">\n    \n     <div  class=\"ovt-sign ovt-edit-perfil\">        \n        <div class=\"ovt-header\">Editar Perfil</div>\n            <div class=\"ovt-container\">\n             <div class=\"ovt-container\">\n                    <div class=\"ovt-image\">\n                        <div class=\"ovt-user-icon big\">\n                             <img [src]=\"me.userImage | userImageSanitizer\" />\n                        </div>\n                        <button type=\"button\" (click)=\"fileInput.click()\">Elige una imagen</button> \n                        <input \n                          style=\"display: none\"\n                          type=\"file\"\n                          ngFileSelect\n                          [options]=\"uploadImageUserOptions\"\n                          (onUpload)=\"handleUpload($event)\"\n                          (beforeUpload)=\"beforeUpload($event)\"\n                          #fileInput>\n                     </div>   \n                    <div class=\"ovt-options\">\n                        <div class=\"ovt-text\"><p><strong>{{me.userName}}</strong></p></div>\n                    </div>\n\n                </div>   \n                <form role=\"form\" [formGroup]=\"editPerfilForm\" (ngSubmit)=\"doModifyPerfil()\"  novalidate>\n                  <div class=\"ovt-fields\">  \n                       \n                        <div class=\"form-group\">\n                            <label for=\"name\">Nombre</label>\n                            <div class=\"ovt-field\">\n                                <input id=\"name\" class=\"form-control\" name=\"name\" type=\"text\" formControlName=\"name\" \n                                    placeholder=\"Tu nombre\" required>\n                                <div class=\"ovt-display-alert\" *ngIf=\"editPerfilForm.controls.name.errors && checkFields\">       \n                                    <div *ngIf=\"editPerfilForm.controls.name.errors.required\" class=\"alert-danger alert\">El nombre es requerido</div>\n                                    <div *ngIf=\"editPerfilForm.controls.name.errors.minlength\" class=\"alert-danger alert\">El nombre debe tener como m\u00EDnimo {{editPerfilForm.controls.name.errors.minlength.requiredLength}}</div>\n                                </div>\n                            </div>\n                        </div>\n\n                         <div class=\"form-group\">\n                            <label for=\"surname\">Apellidos</label>\n                            <div class=\"ovt-field\">\n                                <input id=\"surname\" class=\"form-control\" name=\"surname\" type=\"text\" formControlName=\"surname\" \n                                    placeholder=\"Tus apellidos\" required>\n                                <div class=\"ovt-display-alert\" *ngIf=\"editPerfilForm.controls.surname.errors && checkFields\">       \n                                    <div *ngIf=\"editPerfilForm.controls.surname.errors.required\" class=\"alert-danger alert\">El apellido es requerido</div>\n                                    <div *ngIf=\"editPerfilForm.controls.surname.errors.minlength\" class=\"alert-danger alert\">El apellido debe tener como m\u00EDnimo {{editPerfilForm.controls.surname.errors.minlength.requiredLength}}</div>\n                                </div>    \n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"email\">Correo</label>\n                            <div class=\"ovt-field\">\n                                <input id=\"email\" class=\"form-control\" name=\"email\" type=\"email\" formControlName=\"email\" \n                                    placeholder=\"Tu direcci\u00F3n de correo electr\u00F3nico\" required>\n                                <div class=\"ovt-display-alert\" *ngIf=\"editPerfilForm.controls.email.errors && checkFields\">       \n                                    <div *ngIf=\"editPerfilForm.controls.email.errors.required\" class=\"alert-danger alert\">La direcci\u00F3n de correo electr\u00F3nico es requerido</div>\n                                    <div *ngIf=\"!editPerfilForm.controls.email.errors.required && editPerfilForm.controls.email.errors.emailPattern\" class=\"alert-danger alert\">La direcci\u00F3n de correo electr\u00F3nico no es v\u00E1lida</div>\n                                    <div *ngIf=\"editPerfilForm.controls.email.errors.emailTaken\" class=\"alert-danger alert\">El email ya est\u00E1 asociado a una cuenta</div>\n                                </div>    \n\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"password\">Nueva contrase\u00F1a</label>\n                            <div class=\"ovt-field\">\n                                <input id=\"password\" class=\"form-control\" name=\"password\" type=\"password\" formControlName=\"password\" \n                                    placeholder=\"Tu contrase\u00F1a\" required>\n                                <div class=\"ovt-display-alert\" *ngIf=\"editPerfilForm.controls.password.errors && checkFields\">       \n                                    <div *ngIf=\"editPerfilForm.controls.password.errors.minlength\" class=\"alert-danger alert\">La contrase\u00F1a debe tener como m\u00EDnimo {{editPerfilForm.controls.password.errors.minlength.requiredLength}}</div>\n                                </div>    \n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"confirmationPassword\">Repite la contrase\u00F1a</label>\n                            <div class=\"ovt-field\">\n                                <input id=\"confirmationPassword\" class=\"form-control\" name=\"confirmationPassword\" type=\"password\" formControlName=\"confirmationPassword\" \n                                    placeholder=\"Escribe de nuevo tu contrase\u00F1a\" required>\n                                <div class=\"ovt-display-alert\" *ngIf=\"editPerfilForm.errors && checkFields\">       \n                                    <div *ngIf=\"editPerfilForm.errors.checkPassword\" class=\"alert-danger alert\">Las contrase\u00F1a no coinciden</div>\n                                </div>    \n                            </div>\n                        </div>\n\n                         <div class=\"form-group\">\n                            <label for=\"userType\">Tipo de usuario</label>\n                            <div class=\"ovt-field\">\n                                <input id=\"userTypeTutor\" class=\"form-control ovt-radio\" name=\"userType\" type=\"radio\" formControlName=\"userType\" \n                                    value=\"tutor\" required><span>Tutor</span>\n                                <input id=\"userTypeStudent\" class=\"form-control ovt-radio\" name=\"userType\" type=\"radio\" formControlName=\"userType\" \n                                    value=\"student\" required><span>Student</span>\n                                <div class=\"ovt-display-alert\" *ngIf=\"editPerfilForm.controls.userType.errors && checkFields\">       \n                                    <div *ngIf=\"editPerfilForm.controls.userType.errors.required\" class=\"alert-danger alert\">El tipo de usuario es requerido</div>\n                                </div>    \n                            </div>\n                        </div>\n                    </div>   \n                     <div class=\"ovt-submit\" (mouseenter)=\"onGoingToProcess()\">\n                        <input type=\"submit\" name=\"commit\" value=\"Guardar\" [disabled]=\"!editPerfilForm.valid\" class=\"btn btn-block btn-info\" >\n                     </div>\n                </form>\n                <button class=\"btn btn-block btn-info\" (click)=\"onExitEditPerfil()\">Salir</button>\n            </div>    \n     <div>  \n    \n</div>";
//# sourceMappingURL=sign.html.js.map