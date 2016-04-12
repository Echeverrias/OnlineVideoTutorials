/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,ROUTER_PROVIDERS} from 'angular2/router';

import {Connection} from './services/connection.ts';
import {MyService} from './services/myService.ts';

import {LoginComponent} from './components/login/loginComponent.ts';
import {RoomComponent} from './components/room/roomComponent.ts';
import {WaitingRoomComponent} from './components/waitingRoom/waitingRoomComponent.ts';



@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ["assets/styles/kurento.css", "assets/styles/main.css"],
    template: `
        
        Online Video Tutorials<br>
        <router-outlet></router-outlet>
       
    `
})
@RouteConfig([
    {path:'/login', name:'Login', component:LoginComponent, useAsDefault:true},
    {path:'/rooms', name:'WaitingRoom', component:WaitingRoomComponent},
    {path:'/room/:roomName', name:'Room', component:RoomComponent},
])
class AppComponent {
    
   
       constructor() {
        console.log(`% AppComponent constructor`);
        
        console.log(`/ AppComponent constructor`);
     }
     
    
}
    
bootstrap(AppComponent,[Connection, MyService, ROUTER_PROVIDERS]);


