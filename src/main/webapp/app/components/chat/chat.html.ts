
export const chatTemplate = `<div class="messages">
	<ovt-chatMessage *ngFor="let message of messages" [sender]="message.sender" [message]="message.message" [date]="message.date"></ovt-chatMessage>
			</div>
<div class="mailbox">
					<input id="myMessage" [(ngModel)]="message" name="message"type="text" class="input-block-level" placeholder="Your message..." />
					<input id="sendMessage" (click)="sendMessage()" type="submit" class="btn btn-large btn-block btn-primary"
						value="Send message" />
				</div>`   


// [class]="user.usertType" 