
export const roomTemplate = `<div id="ovt-room">
    <ovt-gadgetsContainer [class.showed]="activeGadget" [ovt-address]="address" (ovt-activeOption)="showGadget($event)"  (ovt-file)="onLoadFile($event)"></ovt-gadgetsContainer>
    <div class="main">
        <div class="dashboard">
           <ovt-participant *ngIf="mainUser.userName" [id]="mainUser.userName" [ngClass]="{'mainParticipant':mainUser && !fileUrl, 'minimized': fileUrl}" [name]="mainUser.name" [userType]="mainUser.userType" [roomName]="name"></ovt-participant>
           <div class="ovt-file">
               <img class="btn" *ngIf="fileUrl && showCloseButton" src="app/components/room/img/close-icon.png" title="Cerrar" (click)=onCloseFile()>
               <object *ngIf="fileUrl" [data]="fileUrl" type="application/pdf" typemustmatch  (mouseover)="onMouseOverFile()">
                  <p>You don't have a PDF plugin, but you can <a href="myfile.pdf">download the PDF file.</a></p>
               </object>
            </div>
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
