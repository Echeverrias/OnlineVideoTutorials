export const gadgetsContainerTemplate = `<div class="ovt-gadgetsContainer">  
 
  <div class='ovt-options'>
     <ul> 
        <li> <a  [ovt-option]="'pdfLoader'" [ovt-deactivate]="option" [ovt-imagePath]="imagePath" [ovt-image]="'pdf-off.png'" (ovt-activate)="activateOption($event)"></a></li>
      </ul>
  </div> 
 
 <div class="ovt-option">
     <ovt-pdfLoader [ovt-address]="address" (ovt-file)="onSelectedFile($event)" (ovt-new-file)="displayNewFileAlert($event)"></ovt-pdfLoader>
 </div>

</div>`