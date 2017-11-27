import { Component, HostListener, ViewChild , AfterViewInit} from '@angular/core';
import { Location } from '@angular/common';
import { ConnectionService } from './services/connection.service';
import { UserService } from './services/user.service';

import { UserOptionsComponent } from './components/userOptions/userOptions.component';

const validUserOptionsPath: string = 'rooms';  
const WS_MSG_ID_CLOSE_TAB: string = 'closeTab';

@Component({
    moduleId: module.id,
    selector: 'ovt-app',
    styleUrls: ["app.css", "participant.css"],
    template: `
        <div id="ovt-app" (click)="onClickApp()">
          <router-outlet></router-outlet>
          <ovt-user-options [ngClass]="{'ovt-user-options':true}" [hidden]="!(this.me.logged && displayUserOptions)"></ovt-user-options> 
       </div>`
})

export class AppComponent {
       
       @ViewChild(UserOptionsComponent)
       private userOptions: UserOptionsComponent;

       @HostListener('window:beforeunload', ['$event'])
       beforeunloadHandler(event) {
           console.log(event);
           if (! sessionStorage.getItem("downloadEvent")){
               console.log(this.me);
               console.log(this.me.userName);
               /*
               let jsonMessage = Object.assign(this.me.getMyInfo(), {id: "closeTab"});
               console.log(jsonMessage);
               this.connection.sendMessage(jsonMessage);
               */
               this.connection.sendWSMessage(WS_MSG_ID_CLOSE_TAB, this.me.getMyInfo());
               this.connection.destroy();
           }   

           sessionStorage.removeItem("downloadEvent");
       }
       
       constructor(private location :Location, private connection: ConnectionService, private me: UserService) {
        console.log(`% AppComponent constructor`);
        console.log(this.userOptions);
        console.log(`/ AppComponent constructor`);
     };

     ngAfterViewInit(){
         console.log('app - afterViewInit');
         console.log(this.userOptions);
     }

     displayUserOptions(): boolean{
         let currentUrl: string = this.location.prepareExternalUrl(this.location.path()); 
         return currentUrl.indexOf(validUserOptionsPath) >= 0;
     }

     onClickApp(){
         this.userOptions.onHideMenu();
     }
      
}
    



