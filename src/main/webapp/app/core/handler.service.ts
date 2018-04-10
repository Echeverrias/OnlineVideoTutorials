import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { WSMessage } from '../models/types';

@Injectable()
export class HandlerService{

    private handlers: Map<string, Subject<any>>;

    constructor(){
        console.log("*HandlerService constructor");
        this.handlers = new Map<string, Subject<any>>();
    }

    attach(id: string, sub: Subject<any>):void{
        console.log(`HandlerService.attach ${id}`);
        this.handlers.set(id, sub);
    }

    detach(id: string): void{
        console.log(`HandlerService.detach ${id}`);
        this.handlers.delete(id);
    }

    handle(message: any): boolean{
        console.log("HandlerService.handle: ", message);
        let parsedMessage: WSMessage = JSON.parse(message.data);
        let idMessage: string = parsedMessage.id;
        console.log(`HandlerService.handler ${idMessage}`);
        console.log(`message`, message);
        
        let sub: Subject<any> = this.handlers.get(idMessage);
        try {
            console.log(`subscription{${idMessage}}.next(${parsedMessage.payload})`);
            sub.next(parsedMessage.payload);
            return true;
        }
        catch(e){
            console.log(`Can't find a handler for ${idMessage}`);
            console.log(`Handler keys:`);
            console.log(this.handlers.keys());
            return false;
        }    
    }
}