import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AppComponent} from './app';
import {Connection} from './services/connection';
import {MyService} from './services/myService';
bootstrap(AppComponent,[Connection, MyService, ROUTER_PROVIDERS]);

