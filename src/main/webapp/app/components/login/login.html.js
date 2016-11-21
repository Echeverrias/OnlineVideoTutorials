"use strict";
exports.loginTemplate = " <div id=\"ovt-login\" class=\"animate container\">\n    \n    <div class=\"ovt-header\">Login</div>\n    \n   \n        <form  class=\"ovt-container-col\" role=\"form\" #loginForm=\"ngForm\" (ngSubmit)=\"doLogin()\"  novalidate>\n\n            <div class=\"form-group\">\n                <label for=\"username\">User name</label>\n                <input id=\"userName\" class=\"form-control\" name=\"userName\" type=\"text\" [(ngModel)]=\"user.userName\" #userName=\"ngModel\" \n                    placeholder=\"Your user name\" required>\n                <div *ngIf=\"!userName.valid\" class=\"alert-danger alert\">Name is required</div>\n                <br>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"password\">Password</label>\n                <input id=\"password\" class=\"form-control\" name=\"password\" type=\"password\" [(ngModel)]=\"user.password\" #password=\"ngModel\" \n                    placeholder=\"Your password\" required>\n                <div *ngIf=\"!password.valid\" class=\"alert-danger alert\">Password is required</div>\n                <br>\n                <br>\n            </div>\n            <input type=\"submit\" name=\"commit\" value=\"Log in\" [disabled]=\"!loginForm.form.valid\" class=\"btn btn-block btn-info\"><br>\n\n        </form>\n       \n    \n</div>";
//# sourceMappingURL=login.html.js.map