/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChatMessageComponent } from './chatMessage/chatMessage.component';

import { ChatService } from './chat.service';
import { UserService } from './../../../services/user.service';

import { ChatMessage } from './chatMessage/chatMessage.types';

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
    
    
    constructor(private chat: ChatService, private me: UserService ) {
      
      console.log("");
      console.log(`% Chat constructor ${new Date().toLocaleTimeString()}`);
      console.log("this.me: ", this.me)
      console.log("this.me.getMe(): ", this.me.getMe());
      console.log("this.me.getMyInfo(): ", this.me.getMyInfo());
      console.log(`/ Chat constructor ${new Date().toLocaleTimeString()}`);
      console.log("");
    }
    
    ngOnInit(){
        this.chat.init(this.address); 
        this.messages = this.chat.getMessages();    
    }

    public sendMessage(): void{
        if (this.message) {
            console.log("this.me.getMe(): ",this.me.getMe());
            this.chat.sendMessage(this.me.getMe(), this.message);
            this.message = null;
        }  
    }
    
    ngOnDestroy(){
      console.log(`* Chat.OnDestroy ${new Date().toLocaleTimeString()}`);
      
      this.chat.destroy();    
    }
   
}