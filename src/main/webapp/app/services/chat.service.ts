import { Injectable } from '@angular/core';

import { Connection } from './connection';
import { ChatMessage } from '../models/types';

import { MyService } from './myService';

import { HexColorGenerator } from './../models/hexColorGenerator';

const ENDPOINT: string = "/chat";

@Injectable()
export class ChatService{
    
    private colorGenerator: HexColorGenerator;
    private messages: ChatMessage[];
    private participants: any[]; 

    private wsUrl: string;
    private stompClient: any;
    private subscription: string = "/ovt/chat/noticeBoard/"; 
    private destiny: string = "/ovt/chat/mailBox/"; 


    constructor(private connection: Connection, private me: MyService) {
        console.log("");
        console.log("% new ChatService");
        this.wsUrl = this.connection.url;
        this.colorGenerator = new HexColorGenerator();
        this.messages = [];
        this.participants = []; 
    }

    init(address: string): void{
        this.destiny = this.destiny + address;
        this.subscription = this.subscription + address;
        this.connect();
    }

    getMessages(): ChatMessage[] {
        return this.messages;
    }

    private connect(){
        console.log("* ChatService.connect");
        console.log("The stompClient is going to be connected");
        this.stompClient = Stomp.client(this.wsUrl + ENDPOINT);
        console.log(this.stompClient);
        console.log("The stompClient has been created");
        this.stompClient.connect({}, (frame) => {
            console.log(`Connected: ${frame}`);
            this.stompClient.subscribe(this.subscription, (message) => {
                console.log(`Msg received: ${message}`);
                this.publish(JSON.parse(message.body));
            });
        });

    }

    public publish(message: ChatMessage): void {
        this.addColor(message);
        this.messages.push(message);
    }

    private addColor(message: ChatMessage): void {
        if (!this.participants[message.sender]) {
            this.participants[message.sender] = this.colorGenerator.getAColor();
        }
        message.color = this.participants[message.sender];
    }

   public sendMessage(message: string) {
       let myUserName = this.me.myUserName;
       let msg: ChatMessage = {
            sender: myUserName,
            message: message,
            date: new Date().toLocaleTimeString(),
            color: undefined
        };
        this.stompClient.send(this.destiny, {}, JSON.stringify(msg));

    }

    private disconnect(): void{

        if (this.stompClient !== null){
            this.stompClient.disconnect();
        }
    }

    destroy(): void{
        this.disconnect();
        this.messages.length = 0;
    }

}
