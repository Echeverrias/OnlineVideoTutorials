/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, AfterViewInit, Input, ViewChildren, OnDestroy, QueryList } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { ChatService } from '../../services/chat.service';
import { MyService } from '../../services/myService';
import { INoticeBoard } from './noticeBoard';
import { ChatMessageComponent } from './chatMessage.component';
import { ChatMessage } from './chatMessage';

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
    
    @ViewChildren(ChatMessageComponent) chatMessages: QueryList<ChatMessageComponent>;
    @Input() address: string;

    private name: string;
    private message: string;

    private messages: ChatMessage[];
    
    private onParticipantLessSubscription: Object;
    private onParticipantInRoomSubscription: Object;
    private onVideoResponseSubscription: Object;
    private onIceCandidateSubscription: Object;
    

    constructor(private chatService: ChatService, private myService: MyService) {
      
      console.log("");
      console.log(`% Chat constructor ${new Date().toLocaleTimeString()}`);
      
      
      this.messages = [];

      
     
      console.log(`/ Chat constructor ${new Date().toLocaleTimeString()}`);
      console.log("");
    }
    
    ngOnInit(){
         
    }

    ngAfterViewInit(){
       console.log(`* Chat.AfterViewInit ${new Date().toLocaleTimeString()}`);
        this.chatService.signIn(this.address, this);
    }

    public publish(message: ChatMessage){
        this.messages.push(message);
    }

    public sendMessage(){
        let message : ChatMessage = {
            sender: this.myService.myUserName,
            message: this.message,
            date: new Date().toLocaleTimeString()
        };

      this.chatService.sendMessage(message);
    }
    
    ngOnDestroy(){
      console.log(`* Chat.OnDestroy ${new Date().toLocaleTimeString()}`);
      
      this.chatService.disconnect();    
    }
   
}