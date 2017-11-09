
export const participantComponentTemplate = `<div class="ovt-participant">
    <div class="video"> 
        <video [ngClass]="setClasses()" #video id="video-{{id}}" autoplay></video>
        <ovt-loading  [ngClass]="size" *ngIf="loading"></ovt-loading>
        <!-- *ngIf="!video.src || loading" -->
        <div class="video-footer ovt-full-name">{{getFirstName()}}</div>
    </div>
</div>`