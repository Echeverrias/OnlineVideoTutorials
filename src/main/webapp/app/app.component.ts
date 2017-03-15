import { Component, HostListener} from '@angular/core';
import { Location } from '@angular/common';
import { ConnectionService } from './services/connection.service';
import { UserService } from './services/user.service';

const validUserOptionsPath: string = 'rooms';  

@Component({
    moduleId: module.id,
    selector: 'ovt-app',
    styleUrls: ["app.css", "participant.css"],
    template: `
        <div id="ovt-app">
          <router-outlet></router-outlet>
          <ovt-user-options [ngClass]="{'ovt-user-options':true}" *ngIf="this.me.logged && displayUserOptions"></ovt-user-options> 
       </div>`
})

export class AppComponent {
       
       

       @HostListener('window:beforeunload', ['$event'])
       beforeunloadHandler(event) {
           console.log(event);
           if (! sessionStorage.getItem("downloadEvent")){
               console.log(this.me);
               console.log(this.me.myUserName);
               let jsonMessage = Object.assign(this.me.getMyInfo(), {id: "closeTab"});
               console.log(jsonMessage);
               this.connection.sendMessage(jsonMessage);
               this.connection.destroy();
           }   

           sessionStorage.removeItem("downloadEvent");
       }
       
       constructor(private location :Location, private connection: ConnectionService, private me: UserService) {
        console.log(`% AppComponent constructor`);
        
        console.log(`/ AppComponent constructor`);
     };

     displayUserOptions(): boolean{
         let currentUrl: string = this.location.prepareExternalUrl(this.location.path()); 
         return currentUrl.indexOf(validUserOptionsPath) >= 0;
     }
      
}
    



