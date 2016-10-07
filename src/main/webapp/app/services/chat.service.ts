import { Injectable } from '@angular/core';

import { Connection } from './connection';
import { INoticeBoard } from './../components/chat/noticeBoard';
import { ChatMessage } from './../components/chatMessage/chatMessage';


const ENDPOINT: string = "/chat";

@Injectable()
export class ChatService{


    private wsUrl: string;
    private noticeBoard: INoticeBoard;
    private address: string;
    private stompClient: any;
    private subscription: string = "/ovt/chat/noticeBoard"; 
    private destiny: string = "/ovt/chat/mailBox"; 


    constructor(private connection: Connection){
        console.log("");
        console.log("% new ChatService");
        this.wsUrl = connection.url;
        /*
        stompClient = Stomp.client(ws.url + "/chat");
        console.log("The stompClient is going to be connected");
        stompClient.connect({}, function(frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe(SUBSCRIPTION, function(greeting) {
                console.log("Msg received:");
                console.log(greeting);
                showGreeting(JSON.parse(greeting.body).content);
            });
        });
        */
    }

    public signIn(address: string, noticeBoard: INoticeBoard): void{
        console.log("* ChatService.signIn");
        this.noticeBoard = noticeBoard;
        this.destiny = this.destiny + address;
        this.subscription = this.subscription + address;
        this.connect();
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

    private publish(message: ChatMessage){
        this.noticeBoard.publish(message);
    }

    public sendMessage(message: ChatMessage) {
        this.stompClient.send(this.destiny, {}, JSON.stringify(message));

    }

    public disconnect(){

        if (this.stompClient !== null){
            this.stompClient.disconnect();
        }
    }


}
