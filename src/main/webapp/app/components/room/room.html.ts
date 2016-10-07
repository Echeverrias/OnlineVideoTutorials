
export const roomTemplate = `<p>Room: {{name}}</p>
<p>I'm {{appService.myName}}</p>

<participant [id]="user.userName" [ngClass]="{'tutor':'tutor'===user.userType, 'student':'student'===user.userType}" [name]="user.name" [userType]="user.userType" [roomName]="name" *ngFor="let user of users"></participant>
\n\
<ovt-chat [address]="address"></ovt-chat>
\n\
<button name="exitRoom" (click)="onExitOfRoom()">Exit</button>`
