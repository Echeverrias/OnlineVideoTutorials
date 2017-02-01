import { Component, HostListener} from '@angular/core';

import { ConnectionService } from './services/connection.service';
import { UserService } from './services/user.service';

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
           console.log(event);
           if (! sessionStorage.getItem("downloadEvent")){
               console.log(this.me);
               console.log(this.me.myUserName);
               let jsonMessage = {
                   id: "closeTab",
                   userName: this.me.myUserName,
                   roomName: this.me.myRoomName
               };
               console.log(jsonMessage);
               this.connection.sendMessage(jsonMessage);
               this.connection.destroy();
           }   

           sessionStorage.removeItem("downloadEvent");
       }
       
       constructor(private connection: ConnectionService, private me: UserService) {
        console.log(`% AppComponent constructor`);
        
        console.log(`/ AppComponent constructor`);
     };
      
}
    



