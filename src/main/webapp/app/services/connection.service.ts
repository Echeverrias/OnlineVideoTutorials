/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import { Injectable } from '@angular/core'; 

import { HandlerService } from './handler.service';

import { Message } from './../models/types';

console.log("Module Connection");


/**
* It allows the communication between the server and the components
*/
@Injectable()
export class ConnectionService {
    
    private _wsEndPoint: string = "ws";
    private _stompEndPoint: string = "/stomp";
    private _rootServer: string;
    private _ws: WebSocket;
    private _stompClient: any;
    
    constructor(private handler: HandlerService){
        console.log(`% Connection`);
        
        this._rootServer = document.location.host + document.location.pathname;
        this._ws = new WebSocket(`ws://${this._rootServer}${this._wsEndPoint}`);
        this._ws.onmessage = (message: any): void => { this.handler.handle(message) };
        this._stompClient = Stomp.client(this.stompOverWsUrl);
        this._stompClient.connect({}, (frame) => {
            console.log(`Connected succesfully: ${frame}`);
        });

        console.log(this._stompClient);
    
        console.log(this._ws);
        console.log(this._ws.onmessage);
    }

    get stompOverWsClient(): any{
        return this._stompClient;
    }

    get wsUrl():string{
        return this._ws.url; 
    }

    get stompOverWsUrl(): string {
        return this._ws.url + this._stompEndPoint;
    }
    
    get rootServer(): string{
        return this._rootServer;
    }

    get urlServer(): string{
        return `${document.location.protocol}//${this._rootServer}`;
    }
    
    get wsEndPoint(): string{
        return `/${this._wsEndPoint}`;
    }

    get stompOverWsEndPoint(): string{
        return `/${this._wsEndPoint}${this._stompEndPoint}`;
    }
    
    sendMessage(jsonMessage: Message){
        //console.log(`---------->  ${jsonMessage.id} ${new Date().toLocaleTimeString()}`);
        //console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
            
        let stringifyMessage = JSON.stringify(jsonMessage);
        this._ws.send(stringifyMessage);
        
        if (!jsonMessage.id.includes('receiveAddress')){
            console.log( `----------> The message ${jsonMessage.id} has been send`);
        }
    }

    destroy(): void {
        this._stompClient.disconnect();
    }
    
   
    
    
}     