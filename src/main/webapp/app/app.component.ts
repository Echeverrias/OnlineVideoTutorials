import { Component, HostListener} from '@angular/core';
import { Connection } from './services/connection';

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
    



