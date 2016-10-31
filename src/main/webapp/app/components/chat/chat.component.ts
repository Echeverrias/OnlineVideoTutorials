/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChatMessageComponent } from '../chatMessage/chatMessage.component';

import { ChatService } from '../../services/chat.service';

import { ChatMessage } from '../chatMessage/chatMessage';

import { chatTemplate } from './chat.html'


@Component({
    moduleId: module.id,
    selector: 'ovt-chat',
    styleUrls: ["chat.css"],
    template: chatTemplate,
    providers: [ChatService]
  })

export class ChatComponent implements OnInit, OnDestroy{
    
    @Input() address: string;

    private message: string;
    private messages: ChatMessage[];
    
    
    constructor(private chat: ChatService ) {
      
      console.log("");
      console.log(`% Chat constructor ${new Date().toLocaleTimeString()}`);
      console.log(`/ Chat constructor ${new Date().toLocaleTimeString()}`);
      console.log("");
    }
    
    ngOnInit(){
        this.chat.init(this.address); 
        this.messages = this.chat.getMessages();    
    }

    public sendMessage(): void{
        if (this.message) {
            this.chat.sendMessage(this.message);
            this.message = null;
        }  
    }
    
    ngOnDestroy(){
      console.log(`* Chat.OnDestroy ${new Date().toLocaleTimeString()}`);
      
      this.chat.destroy();    
    }
   
}