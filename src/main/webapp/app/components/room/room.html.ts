
export const roomTemplate = `<div id="ovt-room">
<div class="main">
    <div class="dashboard">
        <ovt-participant *ngIf="mainUser.userName" [id]="mainUser.userName" [ngClass]="{'mainParticipant':mainUser}" [name]="mainUser.name" [userType]="mainUser.userType" [roomName]="name"></ovt-participant>
        <div><!--ovt-file--></div>
    </div>
    \n\
    <ovt-chat class="chat" [address]="address"></ovt-chat>
    \n\
</div>
<div class="secundary">
    <ovt-participant [id]="user.userName" [ngClass]="{'tutor':user.isATutor(), 'student':user.isAStudent()}" [name]="user.name" [userType]="user.userType" [roomName]="name" *ngFor="let user of users"></ovt-participant>
</div>
<button name="exitRoom" (click)="onExitOfRoom()">Exit</button>
</div>`
