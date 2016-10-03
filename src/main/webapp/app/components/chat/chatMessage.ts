/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


export type ChatMessage = { sender: string, message: string, date: string };

export interface IMessage {
    sender: string;
    message: string;
    date: string;
}

 /*
}
import { IMessage } from './message.ts'

export class ChatMessage implements IMessage{
    
    public sender: string;
    public message: string;
    public date: string;
    
    constructor (message: Object){

        this.sender = message.sender;
        this.message = message.message;
        this.date = message.date; // change
    }
  */  
    /*
    constructor(message: IMessage) {
      
      console.log("");
      console.log(`% ChatMessage constructor ${new Date().toLocaleTimeString()}`);
      
      this._sender = message.sender;
      this._message = message.message;
      this._date = message.date; // new Date().toLocaleTimeString()
      
    }

    public get sender(): string{
        return this._sender;
    }

    public get message(): string{
        return this._message;
    }
    
    public get date(): string{
        return this._date.toString();
    }

    public toString(): string{
        return`sender: ${this.sender}, message: ${this.message}, date: ${this.date}`;
    }
    
     
}
*/