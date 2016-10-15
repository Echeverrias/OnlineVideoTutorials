
export const participantComponentTemplate = `<div class="ovt-participant">
<video [ngClass]="setClasses()" #video id="video-{{id}}" autoplay>
        
    </video>
    <div class="video-footer">{{id}}</div>
</div>`