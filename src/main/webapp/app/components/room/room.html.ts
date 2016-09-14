
export const roomTemplate = `<h1>Room: {{name}}</h1>
<p>I'm {{appService.myName}}</p>

<h4>Participants:</h4>
<participant [id]="user.userName" [ngClass]="{'tutor':'tutor'===user.userType, 'student':'student'===user.userType}" [name]="user.name" [userType]="user.userType" [roomName]="name" *ngFor="let user of users"></participant>
<button name="exitRoom" (click)="onExitOfRoom()">Exit</button>`   


// [class]="user.usertType" 