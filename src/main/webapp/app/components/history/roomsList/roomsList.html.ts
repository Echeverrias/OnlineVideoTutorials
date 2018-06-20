/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const roomsListTemplate = `<div id="ovt-rooms-list" class="animate"> 
    
               
                <!--
                <div class="ovt-content-displayer">
                    <ovt-content-displayer *ngIf="fileUrl" [className]="'ovt-content-displayer'" [ovt-file-url]="fileUrl" [ovt-type]="'application/pdf'" (ovt-close)="onCloseContentDisplayer()"></ovt-content-displayer> 
                </div>
                -->
                    <ul>
                        <li  *ngFor="let room of rooms">
                        <!--
                        <div class="ovt-selectable" [class.selectedRoom]="selectedRoom==room" [detailsSelected]="selectedRoom==room" (click)="onSelectedRoom(room)">{{room.name}} ({{room.getCreatedAtTimeStamp()}})
                            <ovt-room-details *ngIf="selectedRoom == room" [room]="room"></ovt-room-details>
                        </div>
                        -->
                        
                        <ovt-room-details [ngClass]="'ovt-room-details'" [detailsSelected]="selectedRoom==room" (click)="onSelectedRoom(room, event)" [room]="room"></ovt-room-details>
 
                        </li>
                    </ul>
             
 </div>` 
