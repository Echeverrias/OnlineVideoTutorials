/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const waitingRoomTemplate = `<div id="ovt-waitingRoom" class="animate join"> 
    <div class="ovt-header ovt-full-name">Hola {{me.name}}</div>
        <div class="ovt-container">
            <!-- Tutor only-->
             <div *ngIf="me.amIATutor()" class="ovt-container-col ovt-create-room">
                <div>
                    <div class="ovt-inline">
                        <p>Escribe el nombre de la sala a crear: </p><input type="text" [(ngModel)]="roomName">
                    </div>
                    <div>
                        <button class="btn ovt-btn ovt-inline"(click)="onCreateRoom(roomName)">Crear</button>
                    </div>
                </div>
            </div>
            <!-- Tutor and student -->
            <div class="ovt-container-col ovt-available-rooms">
                <div *ngIf="me.amIAStudent()" class="header">    
                    <div class="ovt-subheader" *ngIf="availableRooms && availableRooms.length === 0">No hay salas disponibles</div>
                    <div class="ovt-subheader" *ngIf="availableRooms && availableRooms.length > 0">Salas disponibles:</div>
                </div>
                <div *ngIf="me.amIATutor() && availableRooms && availableRooms.length > 0" class="header">
                    <hr class="ovt-separator">
                    <div class="ovt-subheader">Tu reciente sala:</div>
                </div>
                <div class="ovt-rooms">
                    <ul>
                        <li class="ovt-room-selector" *ngFor="let room of availableRooms" (click)="onJoinRoom(room)"><span>{{room.name}}</span></li>
                    </ul>
                </div>   
            </div>
           
            <div class="ovt-out">
                <button class="btn ovt-btn ovt-inline" (click)="onSignOut()">Salir</button>
            </div>
        </div>        
 </div>` 