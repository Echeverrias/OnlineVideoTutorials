export const gadgetsContainerTemplate = `<div class="ovt-gadgetsContainer">  
 
  <div class='ovt-options'>
     <ul> 
        <li> <a  [ovt-option]="'pdfLoader'" [ovt-deactivate]="option" [ovt-imagePath]="imagePath" [ovt-image]="'pdf-off.png'" (ovt-activate)="activateOption($event)"></a></li>
      </ul>
  </div> 
 
 <div class="ovt-option">
     <ovt-pdf-loader [ovt-address]="address" [ovt-valid-mime-types]="options && options.validMimeTypes" (ovt-file)="onSelectedFile($event)" (ovt-new-file)="displayNewFileAlert($event)"></ovt-pdf-loader>
 </div>

</div>`