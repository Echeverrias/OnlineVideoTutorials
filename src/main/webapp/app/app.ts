/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Component, HostListener} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES,ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Connection } from './services/connection';
import { MyService } from './services/myService';

import { LoginComponent } from './components/login/loginComponent';
import { RoomComponent } from './components/room/roomComponent';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoomComponent';



@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, LoginComponent],
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
export class AppComponent {
        
       @HostListener('window:beforeunload', ['$event'])
       beforeunloadHandler(event) {
           let jsonMessage = {
               id: "closeTab"
           };

           this.connection.sendMessage(jsonMessage);
       }
       
       constructor(private connection: Connection) {
        console.log(`% AppComponent constructor`);
        
        console.log(`/ AppComponent constructor`);
     }
      
      

    
     
    
}
    



