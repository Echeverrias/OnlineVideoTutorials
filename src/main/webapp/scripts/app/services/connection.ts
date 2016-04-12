/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {Injectable} from 'angular2/core'; 
import {EventsEmitter} from './eventsEmitter.ts'; 

console.log("Module Connection");

/**
* It allows the communication between the server and the components
*/
@Injectable()
export class Connection {
    
    
    private _ws: WebSocket;
    private _subscriptions: Object;
   
    constructor(){
        console.log(`% Connection`);
        
        this._ws = new WebSocket('ws://localhost:8080/ovt');
        
        EventsEmitter eventsEmitter = new EventsEmitter();
        this._subscriptions = eventsEmitter.subscriptions;
        this._ws.onmessage = eventsEmitter.serverListener;
        
        console.log(this._ws);
        console.log(this._ws.onmessage);
    }
    
    get subscriptions(): Object{
        return this._subscriptions;
    }
    
    sendMessage(jsonMessage){
        console.log(`---------->  ${jsonMessage.id} ${new Date().toLocaleTimeString()}`);
        console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
            
        let stringifyMessage = JSON.stringify(jsonMessage);
        this._ws.send(stringifyMessage);
            
        console.log("The message has been send");
    }
    
   
    
    
}     