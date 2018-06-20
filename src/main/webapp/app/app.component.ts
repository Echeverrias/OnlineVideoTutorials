import { Component, HostListener, ViewChild , AfterViewInit, EventEmitter} from '@angular/core';
import { Location } from '@angular/common';

import { UserOptionsComponent } from './components/userOptions/userOptions.component';

import { UserInfoMessage, IdMessage, Message, WSMessage } from './models/types';

import { HandlerService } from './core/handler.service';
import { ConnectionService } from './core/connection.service';
import { UserService } from './core/user.service';

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
       private eeDebug: EventEmitter<any>; //*

       @ViewChild(UserOptionsComponent)
       private userOptions: UserOptionsComponent;

       @HostListener('window:beforeunload', ['$event'])
       beforeunloadHandler(event) {
           console.log('$BEFOREUNLOAD EVENt');
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
       
       constructor(private handler: HandlerService, private location :Location, private connection: ConnectionService, private me: UserService) {
        console.log(`% AppComponent constructor`);
        console.log(this.userOptions);
        console.log(`/ AppComponent constructor`);


        this.eeDebug = new EventEmitter<Message>()
        .subscribe((data: WSMessage): void => { console.log(data), console.log(data.payload) });
        this.handler.attach("debug", this.eeDebug);
        this.connection.sendWSMessage("debug", "");
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
    



