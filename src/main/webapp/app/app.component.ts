import { Component, HostListener} from '@angular/core';
import { Connection } from './services/connection';

@Component({
    selector: 'app',
    styleUrls: ["assets/styles/kurento.css", "assets/styles/main.css"],
    template: `
        
        Online Video Tutorials<br>
       <router-outlet></router-outlet>`
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
    



