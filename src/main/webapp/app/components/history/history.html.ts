/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const historyTemplate = `<div id="ovt-history" class="animate join"> 
    <div class="ovt-header ovt-full-name">Historial</div>
        <div class="ovt-container">
            <div class="ovt-container-col">
                <div class="header">    
                    <div class="ovt-subheader" *ngIf="rooms && rooms.length === 0">No has participado en ninguna tutoría todavía</div>
                    <div class="ovt-subheader" *ngIf="rooms && rooms.length > 0">Tutorías en las que has participado</div>
                    <div>Mostrar
                        <select #roomsNumber>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="-1">Todas</option>
                        </select>
                </div>
                </div>
                <div class="ovt-rooms">
             
                    <ul>
                        <li  *ngFor="let room of rooms | limitTo:roomsNumber.value">
                        <!--
                        <div class="ovt-selectable" [class.selectedRoom]="selectedRoom==room" [detailsSelected]="selectedRoom==room" (click)="onSelectedRoom(room)">{{room.name}} ({{room.getCreatedAtTimeStamp()}})
                            <ovt-room-details *ngIf="selectedRoom == room" [room]="room"></ovt-room-details>
                        </div>
                        -->
                        
                        <ovt-room-details [ngClass]="'ovt-room-details'" [detailsSelected]="selectedRoom==room" (click)="onSelectedRoom(room, event)" [room]="room"></ovt-room-details>
 
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ovt-out">
                <button class="btn ovt-btn ovt-inline" (click)="onReturn()">Volver</button>
            </div>
        </div>        
 </div>` 