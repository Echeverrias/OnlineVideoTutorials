
export const roomTemplate = `<div id="ovt-room">
    <ovt-gadgets-container [class.showed]="activeGadget" [ovt-address]="address" (ovt-activeOption)="showGadget($event)"  (ovt-file)="onLoadFile($event)"></ovt-gadgets-container>
    <div class="main">
        <div class="dashboard">
           <ovt-participant *ngIf="mainUser.userName" [id]="mainUser.userName" [ngClass]="{'main-participant':mainUser && !fileUrl, 'minimized': fileUrl}" [size]="fileUrl?'small':'large'" [name]="mainUser.name" [userType]="mainUser.userType" [roomName]="name"></ovt-participant>
           <div class="ovt-file" *ngIf="fileUrl">
               <img class="btn" *ngIf="showCloseButton" src="app/components/room/img/close-icon.png" title="Cerrar" (click)=onCloseFile()>
               <object [data]="fileUrl" type="application/pdf" typemustmatch  (mouseover)="onMouseOverFile()">
                  <p>You don't have a PDF plugin, but you can <a href="myfile.pdf">download the PDF file.</a></p>
               </object>
            </div>
        </div>
        \n\
        <ovt-chat class="chat" [address]="address"></ovt-chat>
        \n\
    </div>
    <div class="secundary">
        <ovt-participant [id]="user.userName" [ngClass]="{'tutor':user.isATutor(), 'student':user.isAStudent()}" [name]="user.name" [userType]="user.userType" [roomName]="name" [size]="'small'" *ngFor="let user of users"></ovt-participant>
    </div>
    <button name="exitRoom" (click)="onExitOfRoom()">Salir</button>
</div>`
