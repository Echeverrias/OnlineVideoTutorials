/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const historyTemplate = `<div id="ovt-history" class="animate join"> 
    <div class="ovt-header ovt-full-name">Historial</div>
        <div class="ovt-container">
            <div class="ovt-container-col">
             <!--   <ovt-content-displayer *ngIf="someFileUrl" [ovt-file-url]="someFileUrl" (ovt-close)="onCloseContentDisplayer($event)"></ovt-content-displayer> -->
                <div class="header">    
                <div class="ovt-subheader" *ngIf="loadingRooms">Cargando historial... </div>
                <div class="ovt-subheader" *ngIf="!loadingRooms && totalRooms === 0">No has participado en ninguna tutoría todavía</div>
                <div class="ovt-subheader" *ngIf="!loadingRooms && totalRooms > 0">Tutorías en las que has participado</div>
                    <!--
                    <div class="rooms-per-page" [class.ovt-hide]="!rooms || rooms.length === 0">Mostrar
                        <select #roomsNumber (change)="onRoomsPerPage(roomsNumber.value)">
                            <option [value]="initialRoomsPerPage">{{initialRoomsPerPage}}</option>
                            <option [value]="initialRoomsPerPage + 5">{{initialRoomsPerPage + 5}}</option>
                            <option [value]="initialRoomsPerPage + 10">{{initialRoomsPerPage + 10}}</option>
                            <option *ngIf="rooms" [value]="rooms.length">Todas</option>
                        </select>
                    </div>
                    -->
                    <div class="rooms-per-page" [class.ovt-hide]="loadingRooms || totalRooms <= initialRoomsPerPage">
                        <ovt-select [options]="options" 
                            [name]="rooms-per-page"
                            (selectChange)="onRoomsPerPage($event)">Mostrar: 
                        </ovt-select>
                    </div>
            </div>
              <!--
                <div class="ovt-content-displayer">
                    <ovt-content-displayer *ngIf="fileUrl" [className]="'ovt-content-displayer'" [ovt-file-url]="fileUrl" [ovt-type]="'application/pdf'" (ovt-close)="onCloseContentDisplayer()"></ovt-content-displayer> 
                </div>
                -->
                <div class="ovt-rooms">
                    <ovt-rooms-list [rooms]="showedRooms"></ovt-rooms-list>
                </div>    
                    <!--
                    <ul>
                        <li  *ngFor="let room of showedRooms">
                        --><!--
                        <div class="ovt-selectable" [class.selectedRoom]="selectedRoom==room" [detailsSelected]="selectedRoom==room" (click)="onSelectedRoom(room)">{{room.name}} ({{room.getCreatedAtTimeStamp()}})
                            <ovt-room-details *ngIf="selectedRoom == room" [room]="room"></ovt-room-details>
                        </div>
                        --><!--
                        
                        <ovt-room-details [ngClass]="'ovt-room-details'" [detailsSelected]="selectedRoom==room" (click)="onSelectedRoom(room, event)" (ovt-load-file)="onLoadFile($event)"  [room]="room"></ovt-room-details>
 
                        </li>
                    </ul>
                    -->
                    <div class="ovt-pagination">
                        <ovt-pagination
                            (goPage)="goToPage($event)"
                            [pagesToShow]="5"
                            [currentPage]="currentPage"
                            [itemsPerPage]="roomsPerPage"
                            [totalItems]="totalRooms"
                            [loading]="loadingRooms">
                        </ovt-pagination>
                    </div>
            
            <div class="ovt-out">
                <button class="btn ovt-btn ovt-inline" (click)="onReturn()">Volver</button>
            </div>
        </div>        
 </div>` 