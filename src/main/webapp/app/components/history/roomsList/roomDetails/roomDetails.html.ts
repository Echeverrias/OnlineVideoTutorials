/*
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
 export const roomDetailsTemplate = 
 `<div class="ovt-room-details">
 <div class="ovt-selectable" [class.ovt-select]="detailsSelected" (click)="showOrHideDetails()">{{room.name}} ({{room.getCreatedAtTimeStamp()}})</div> 
    <div class="ovt-room-data" *ngIf="detailsSelected" (click)="onStopPropagation($event)">
        <div>Tutor: {{room.tutor}}</div>
        <div>
            <div class="ovt-selectable" [class.ovt-select]="detailsSelected && participantsSelected" (click)="showOrHideParticipants()">Participantes: {{room.participantsHistory.length}}
                <ul *ngIf="detailsSelected && participantsSelected">
                    <li *ngFor="let participant of room.participantsHistory" class="ovt-participant-history" (mouseenter)="participantSelected=participant" (mouseleave)="participantSelected=null"><p>{{participant.userName}}</p>
                     <div><img class="participantImage" *ngIf="participantSelected==participant" [src]="participant.userImage | userImageSanitizer" /> </div>
                     <!-- <img class="participantImage" [src]="participant.userImage | userImageSanitizer" /> -->
                    </li>
                </ul>
               
            </div>
        </div>
        <div>
        <!-- <div class="ovt-selectable" [class.ovt-select]="detailsSelected && filesSelected" (click)="showOrHideFiles()">Archivos: {{room.filesHistory.length}} -->
            <div [ngClass]="{'ovt-select': detailsSelected && filesSelected, 'ovt-selectable': room.filesHistory.length>0}" (click)="showOrHideFiles()">Archivos: {{room.filesHistory.length}}
                <ul *ngIf="detailsSelected && filesSelected" (click)="onStopPropagation($event)">
                    <li *ngFor="let file of room.filesHistory">
                    <!--    
                    <button title="Descargar" download>
                            <a [href]="file.downloadUrl"></a>
                        </button>
                        <span>{{file.name}}</span>
                    -->
                    <ovt-links-file [access-file]="file" [valid-types]="validMimeTypes" (ovt-load-file)="onLoadFile($event)"></ovt-links-file>
                    <ovt-content-displayer *ngIf="displayedFile == file.loadUrl" [ovt-file-url]="file.loadUrl"  (ovt-close)="onCloseContentDisplayer($event)"></ovt-content-displayer>
                    </li>
                </ul>
            </div>
        </div>
    </div>    
</div>`