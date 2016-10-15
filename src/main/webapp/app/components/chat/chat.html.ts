
export const chatTemplate = `<div id="ovt-chat">
<div #messagesBox class="messages" [scrollTop]="messagesBox.scrollHeight">
	<ovt-chatMessage *ngFor="let message of messages" [sender]="message.sender" [message]="message.message" [date]="message.date" [color]="message.color"></ovt-chatMessage>
			</div>
<div class="mailbox">
					<textarea id="myMessage" [(ngModel)]="message" name="message"type="text" class="input-block-level" placeholder="Your message..."></textarea>
					<input id="sendMessage" (click)="sendMessage()" type="submit" class="btn btn-large btn-block btn-primary"
						value="Send" />
				</div>
                </div>`   
