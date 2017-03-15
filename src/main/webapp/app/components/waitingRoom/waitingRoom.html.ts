/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const waitingRoomTemplate = `<div id="ovt-waitingRoom" class="animate join"> 
    <div class="ovt-header ovt-full-name">Hola {{me.myName}}</div>
        <div class="ovt-container">
            <!-- Tutor only-->
             <div *ngIf="me.amATutor()" class="ovt-container-col ovt-create-room">
                <div>
                    <div class="ovt-inline">
                        Escribe el nombre de la sala a crear: <input type="text" [(ngModel)]="roomName">
                    </div>
                    <div>
                        <button class="btn ovt-btn ovt-inline"(click)="onCreateRoom()">Crear</button>
                    </div>
                </div>
            </div>
            <!-- Tutor and student -->
            <div class="ovt-container-col ovt-available-rooms">
                <div *ngIf="me.amAStudent()" class="header">    
                    <div class="ovt-subheader" *ngIf="availableRoomsNames && availableRoomsNames.length === 0">No hay salas disponibles</div>
                    <div class="ovt-subheader" *ngIf="availableRoomsNames && availableRoomsNames.length > 0">Salas disponibles:</div>
                </div>
                <div *ngIf="me.amATutor() && availableRoomsNames && availableRoomsNames.length > 0" class="header">
                    <hr class="ovt-separator">
                    <div class="ovt-subheader">Tus salas creadas:</div>
                </div>
                <div class="ovt-rooms">
                    <ul>
                        <li class="ovt-room-selector" *ngFor="let room of availableRoomsNames" (click)="onJoinRoom(room)"><span>{{room}}</span></li>
                    </ul>
                </div>   
            </div>
           
            <div class="ovt-out">
                <button class="btn ovt-btn ovt-inline" (click)="onSignOut()">Salir</button>
            </div>
        </div>        
 </div>` 