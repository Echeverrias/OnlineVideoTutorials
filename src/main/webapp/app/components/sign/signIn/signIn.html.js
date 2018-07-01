"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInTemplate = " <div id=\"ovt-sign-in\" class=\"animate container\">\n    <!-- SIGN IN -->\n    <div  class=\"ovt-sign ovt-signIn\">\n        <div class=\"ovt-header\">Bienvenido</div>\n        \n           <div class=\"ovt-container\">\n            <form  role=\"form\" [formGroup]=\"signInForm\" (ngSubmit)=\"doSignIn()\"  novalidate>\n                  \n                <div class=\"ovt-fields\">  \n                    <div class=\"form-group\">\n                        <label for=\"userName\">Nombre de usuario</label>\n                        <input id=\"userName\" class=\"form-control\" name=\"userName\" type=\"text\" formControlName=\"userName\" \n                            placeholder=\"Tu nombre de usuario\" required>\n                        <div class=\"ovt-display-alert\" *ngIf=\"signInForm.controls.userName.errors && checkFields\">       \n                            <div *ngIf=\"signInForm.controls.userName.errors.required\" class=\"alert-danger alert\">El nombre de usuario es requerido</div>\n                            <div *ngIf=\"signInForm.controls.userName.errors.minlength\" class=\"alert-danger alert\">El nombre de usuario debe tener como m\u00EDnimo {{signInForm.controls.userName.errors.minlength.requiredLength}}</div>\n                        </div> \n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"password\">Contrase\u00F1a</label>\n                        <input id=\"password\" class=\"form-control\" name=\"password\" type=\"password\" formControlName=\"password\" placeholder=\"Tu contrase\u00F1a\" required>\n                        <div class=\"ovt-display-alert\" *ngIf=\"signInForm.controls.password.errors && checkFields\">   \n                            <div *ngIf=\"signInForm.controls.password.errors.required\" class=\"alert-danger alert\">La contrase\u00F1a es requerida</div>\n                            <div *ngIf=\"signInForm.controls.password.errors.minlength\" class=\"alert-danger alert\">La contrase\u00F1a debe tener como m\u00EDnimo {{signInForm.controls.password.errors.minlength.requiredLength}} </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\"> \n                    <input id=\"remember-password\" name=\"rememberPassword\" formControlName=\"rememberPassword\" type=\"checkbox\" (change)=\"onToggleRememberPassword()\"> Recordar contrase\u00F1a   \n                </div>  \n                  <div class=\"ovt-submit\" (mouseenter)=\"onGoingToProcess()\">\n                    <input type=\"submit\" class=\"ovt-submit\" name=\"commit\" value=\"Entrar\" [disabled]=\"!signInForm.valid\" class=\"btn btn-block btn-info\"><br>\n                 </div>\n            </form>\n            <hr class=\"ovt-separator\">\n              <button class=\"btn btn-block btn-info\" (click)=\"onChangeToSignUp()\">Registrarse</button>\n         </div>     \n    </div>\n    \n</div>";
//# sourceMappingURL=signIn.html.js.map