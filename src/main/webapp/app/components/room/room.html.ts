
export const roomTemplate = `<div id="ovt-room">
    <ovt-gadgets-container [class.showed]="activeGadget" [ovt-address]="id" (ovt-activeOption)="showGadget($event)"  (ovt-file)="onLoadFile($event)"></ovt-gadgets-container>
    <div class="main">
        <div class="dashboard">
           <ovt-participant *ngIf="mainParticipant" [userName]="mainParticipant.userName" [ngClass]="{'main-participant':mainParticipant && !fileUrl, 'minimized': fileUrl}" [size]="fileUrl?'small':'large'" [name]="mainParticipant.name" [userType]="mainParticipant.userType" [roomId]="id"></ovt-participant>
           <div class="ovt-file" *ngIf="fileUrl">
               <img class="btn" *ngIf="showCloseButton" src="app/components/room/img/close-icon.png" title="Cerrar" (click)=onCloseFile()>
               <object [data]="fileUrl" type="application/pdf" typemustmatch  (mouseover)="onMouseOverFile()">
                  <p>You don't have a PDF plugin</p>
               </object>
            </div>
        </div>
        \n\
        <ovt-chat class="chat" [address]="id"></ovt-chat>
        \n\
    </div>
    <div class="secundary">
        <ovt-participant [userName]="participant.userName" [ngClass]="{'tutor':participant.isATutor(), 'student':participant.isAStudent()}" [name]="participant.name" [userType]="participant.userType" [roomId]="id" [size]="'small'" *ngFor="let participant of participants"></ovt-participant>
    </div>
    <button name="exitRoom" (click)="onExitOfRoom()">Salir</button>
</div>`
