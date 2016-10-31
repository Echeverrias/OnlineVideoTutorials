import { Injectable, EventEmitter } from '@angular/core';

type ServerMessage = { id: string };

@Injectable()
export class HandlerService{

    private handlers: Map<string, EventEmitter>;

    constructor(){
        console.log("*HandlerService constructor");
        this.handlers = new Map<string, EventEmitter>();
    }

    attach(id: string, ee: EventEmitter):void{
        console.log(`HandlerService.attach ${id}`);
        this.handlers.set(id, ee);
    }

    detach(id: string): void{
        console.log(`HandlerService.detach ${id}`);
        this.handlers.delete(id);
    }

    handle(message: Object): boolean{
        let parsedMessage: ServerMessage = JSON.parse(message.data);
        let idMessage: string = parsedMessage.id;
        console.log(`HandlerService.handler ${idMessage}`);
        
        let ee: EventEmitter = this.handlers.get(idMessage);
        try {
            console.log(`ee${idMessage}.next`);
            ee.next(parsedMessage);
            return true;
        }
        catch(e){
            console.log(`Can't find a handler for ${idMessage}`);
            return false;
        }    
    }
}