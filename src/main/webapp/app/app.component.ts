import { Component, HostListener} from '@angular/core';

import { Connection } from './services/connection';
import { MyService } from './services/myService';

@Component({
    moduleId: module.id,
    selector: 'ovt-app',
    styleUrls: ["app.css"],
    template: `
        <div id="ovt-app">
       <router-outlet></router-outlet>
       </div>`
})

export class AppComponent {
        
       @HostListener('window:beforeunload', ['$event'])
       beforeunloadHandler(event) {
           console.log(this.me);
           console.log(this.me.myUserName);
           let jsonMessage = {
               id: "closeTab",
               userName: this.me.myUserName,
               roomName: this.me.myRoomName
           };
           console.log(jsonMessage);
           this.connection.sendMessage(jsonMessage);
       }
       
       constructor(private connection: Connection, private me: MyService) {
        console.log(`% AppComponent constructor`);
        
        console.log(`/ AppComponent constructor`);
     };
      
}
    



