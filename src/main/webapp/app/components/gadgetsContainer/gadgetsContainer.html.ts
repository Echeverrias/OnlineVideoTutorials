export const gadgetsContainerTemplate = `<div class="ovt-gadgetsContainer">  
 
  <div class='ovt-options hidden-phone hidden-tablet'>
     <ul> 
        <li> <a  title="pdfLoader" [ovt-option]="'pdfLoader'" [ovt-deactivate]="option" [ovt-imagePath]="imagePath" [ovt-image]="'pdf-off.png'" (ovt-activate)="activateOption($event)"></a></li>
      </ul>
  </div> 
 
 <div class="ovt-option">
  <ovt-pdf-loader *ngIf="option==='pdfLoader'"></ovt-pdf-loader>
  </div>

</div>`