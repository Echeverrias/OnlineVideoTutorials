/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {Component, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

import {Connection} from '../components/connection/connection.ts';
import {User} from '../components/user/user.ts';
import {Participants} from '../components/participants/participants.ts';

import {Login} from '../components/login/login.ts';
import {Room} from '../components/room/room.ts';
import {WaitingRoom} from '../components/waitingRoom/waitingRoom.ts';



@Component({
    selector: 'app',
    directives: [CORE_DIRECTIVES, Login, Room, WaitingRoom],
    styleUrls: ["assets/styles/kurento.css"],
    template: `
        Online Video Tutorials<br>\n

        <login [hidden]="!loginVisibility" (login-checked)="onLoginChecked($event)" (all-avaible-rooms-names)="onSetAvaibleRoomsNames($event)"></login>\n\
        <room [room-name]="roomNameChosen" [hidden]="!roomVisibility" (exit)="onShowComponent($event)"></room>\n\
        <waitingRoom [hidden]="!waitingRoomVisibility" [all-avaible-rooms-names]="avaibleRoomsNames" (room-chosen)="onRoomChosen($event)" (go-to-state)="onShowComponent($event)"></waitingRoom>

        <p [hidden]="!errorVisibility"> Error <p>
    `
})
class AppComponent {
    
    private avaibleRoomsNames: string[];
    private roomNameChosen: string;
    
    private roomVisibility: boolean;
    private waitingRoomVisibility: boolean;
    private loginVisibility: boolean;
    private errorVisibility: boolean;  
    
    // Event listeners
    
    private showComponent: Object;
    
    
    
   
    constructor(private connection: Connection, private participants: Participants) {
        console.log(`% AppComponent constructor`);
        
        this.avaibleRoomsNames = [];
        this.loginVisibility = true;
        this.roomVisibility = false;
        this.waitingRoomVisibility = false;
        this.errorVisibility= false;  
        
        this.showComponent = connection.events.subscribeToShowComponent(this, this.onShowComponent)
        console.log(`/ AppComponent constructor`);
     }
    
    onLoginChecked(message: Object){
        this.roomNameChosen = message.roomName;
        this.onShowComponent(message.component);
    } 
    
    onSetAvaibleRoomsNames(roomsNames: string []){
        this.avaibleRoomsNames = roomsNames;
    } 
    
    onRoomChosen(roomName: string){
        this.roomNameChosen = roomName;
    }
    
    onShowComponent(component: string): void{
        console.log(`<- App.onShowComponent - component: ${component}`);
        this.roomVisibility = false;
        this.waitingRoomVisibility = false;
        this.loginVisibility = false;
        this.errorVisibility = false;
        eval(`this.${component}Visibility = true`);
        console.log(`this.${component}Visibility: ${eval(`this.${component}Visibility = true`)}`)
    }
    
    
    
    
    
    
    
   
    
   
}
    
bootstrap(AppComponent,[Connection, Participants]);


