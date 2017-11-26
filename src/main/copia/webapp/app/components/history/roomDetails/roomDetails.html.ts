/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const roomDetailsTemplate = 
 `<div class="ovt-room-details" class="animate join"> 
    <div>Tutor: {{room.tutor}}</div>
    <div>
        <div class="ovt-selectable" (click)="showOrHideParticipants()">Participantes: {{room.participantsHistory.length}}</div>
        <ul *ngIf="participantsSelected">
            <li *ngFor="let participant of room.participantsHistory">{{participant.userName}}</li>
        </ul>
    </div>
    <div>
    <div class="ovt-selectable" (click)="showOrHideFiles()">Archivos: {{room.filesHistory.length}}</div>
        <ul *ngIf="filesSelected">
            <li *ngFor="let file of room.filesHistory">{{file.name}}</li>
        </ul>
    </div>
</div>`