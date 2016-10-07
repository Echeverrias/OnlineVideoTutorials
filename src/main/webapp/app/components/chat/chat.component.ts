/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, AfterViewInit, Input, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { ChatService } from '../../services/chat.service';
import { MyService } from '../../services/myService';
import { INoticeBoard } from './noticeBoard';
import { ChatMessageComponent } from '../chatMessage/chatMessage.component';
import { ChatMessage } from '../chatMessage/chatMessage';

import { chatTemplate } from './chat.html'


@Component({
    moduleId: module.id,
    selector: 'ovt-chat',
    directives: [CORE_DIRECTIVES, ChatMessageComponent],
    providers: [ChatService],
    styleUrls: ["../../../assets/styles/main.css", "chat.css"],
    template: chatTemplate
})

export class ChatComponent implements OnInit, AfterViewInit, OnDestroy, INoticeBoard{
    
    @Input() address: string;

    private message: string;
    private messages: ChatMessage[];
    private participants: string[];
    private onParticipantLessSubscription: Object;
    private onParticipantInRoomSubscription: Object;
    private onVideoResponseSubscription: Object;
    private onIceCandidateSubscription: Object;
   
    

    constructor(private chatService: ChatService, private myService: MyService) {
      
      console.log("");
      console.log(`% Chat constructor ${new Date().toLocaleTimeString()}`);
      
      
      this.messages = [];
      this.participants = [];

      console.log(`/ Chat constructor ${new Date().toLocaleTimeString()}`);
      console.log("");
    }
    
    ngOnInit(){
         
    }

    ngAfterViewInit(){
       console.log(`* Chat.AfterViewInit ${new Date().toLocaleTimeString()}`);
        this.chatService.signIn(this.address, this);
        
    }

    public publish(message: ChatMessage): void{
        this.addColor(message);
        this.messages.push(message);
    }

    private addColor(message: ChatMessage): void {
      if (!this.participants[message.sender]){
          this.participants[message.sender] = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
      message.color = this.participants[message.sender];  
    }

    public sendMessage(): void{
        if (this.message) {
            let message: ChatMessage = {
                sender: this.myService.myUserName,
                message: this.message,
                date: new Date().toLocaleTimeString()
            };

            this.chatService.sendMessage(message);
            this.message = null;
        }
    }
    
    ngOnDestroy(){
      console.log(`* Chat.OnDestroy ${new Date().toLocaleTimeString()}`);
      
      this.chatService.disconnect();    
    }
   
}