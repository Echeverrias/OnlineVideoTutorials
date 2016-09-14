
export const participantComponentTemplate = `<div>
    <p>{{id}}</p>
    <video [ngClass]="setClasses()" #video id="video-{{id}}" autoplay>
        
    </video>
</div>`