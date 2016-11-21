
export const participantComponentTemplate = `<div class="ovt-participant">
    <div class="video"> 
        <video [ngClass]="setClasses()" #video id="video-{{id}}" autoplay></video>
        <ovt-loading *ngIf="!video.src || loading"></ovt-loading>
        <div class="video-footer">{{getFirstName()}}</div>
    </div>
</div>`