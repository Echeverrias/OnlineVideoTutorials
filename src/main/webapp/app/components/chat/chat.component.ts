/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';

import { ChatMessageComponent } from '../chatMessage/chatMessage.component';

import { MyService } from '../../services/myService';
import { ChatService } from '../../services/chat.service';

import { INoticeBoard } from './noticeBoard';
import { ChatMessage } from '../chatMessage/chatMessage';
import { HexColorGenerator } from './hexColorGenerator';

import { chatTemplate } from './chat.html'


@Component({
    moduleId: module.id,
    selector: 'ovt-chat',
    styleUrls: ["../../../assets/styles/main.css", "chat.css"],
    template: chatTemplate,
    providers: [ChatService]
  })

export class ChatComponent implements OnInit, AfterViewInit, OnDestroy, INoticeBoard{
    
    @Input() address: string;

    private message: string;
    private messages: ChatMessage[];
    private participants: string[];
    private colorGenerator: HexColorGenerator;
    private onParticipantLessSubscription: Object;
    private onParticipantInRoomSubscription: Object;
    private onVideoResponseSubscription: Object;
    private onIceCandidateSubscription: Object;
   
    

    constructor(private myService: MyService, private chatService: ChatService ) {
      
      console.log("");
      console.log(`% Chat constructor ${new Date().toLocaleTimeString()}`);
      
      this.colorGenerator = new HexColorGenerator();
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
          this.participants[message.sender] = this.colorGenerator.getAColor();
      }
      message.color = this.participants[message.sender];  
    }

    public sendMessage(): void{
        let myUserName = this.myService.myUserName;

        if (this.message) {
            let message: ChatMessage = {
                sender: myUserName,
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