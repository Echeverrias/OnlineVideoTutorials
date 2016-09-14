"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_1 = require('./app');
var connection_1 = require('./services/connection');
var myService_1 = require('./services/myService');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [connection_1.Connection, myService_1.MyService, router_deprecated_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=main.js.map