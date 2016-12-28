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
    
    private _endpoint: string = "ws";
    private _rootServer: string;
    private _ws: WebSocket;
    
    constructor(private handler: HandlerService){
        console.log(`% Connection`);
        
        this._rootServer = document.location.host + document.location.pathname;
        this._ws = new WebSocket(`ws://${this._rootServer}${this._endpoint}`);
        
        this._ws.onmessage = (message: any): void => { this.handler.handle(message) };
       
        console.log(this._ws);
        console.log(this._ws.onmessage);
    }
    
    get url():string{
        return this._ws.url; 
    }
    
    get rootServer(): string{
        return this._rootServer;
    }

    get urlServer(): string{
        return `${document.location.protocol}//${this._rootServer}`;
    }
    
    get endpoint(): string{
        return `/${this._endpoint}`;
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
    
   
    
    
}     