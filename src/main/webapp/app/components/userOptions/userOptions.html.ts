export var userOptionsTemplate: string = `<div id="ovt-user-options">
    <div class="ovt-user-display">
        <div class="ovt-user-icon small" (click)="onDisplayMenu($event)">
           <a title="Cuenta de {{me.name}}">
            <img *ngIf="me.userImage" [src]="me.userImage | userImageSanitizer" />
        </a>    
        </div>
        <div class="ovt-clear"></div>
    </div>
    <div class="ovt-user-menu" *ngIf="menuDisplayed">
        <div class="ovt-container">
            <div class="ovt-image">
                <div class="ovt-user-icon big">
                     <img [src]="me.userImage | userImageSanitizer"/>
                </div>
            </div>   
            <div class="ovt-options">
                <div class="ovt-full-name"><p><strong>{{me.name}} {{me.surname}}</strong><p></div>
                <hr>
                <div><button class="btn ovt-btn" (click)="onEditAccount()">Editar perfil</button></div>
                <div><button class="btn ovt-btn" (click)="onGoToHistorial()">Ir al historial</button></div>
            </div>
        </div>   
         <div class="ovt-footer">
            <button class="btn ovt-btn" (click)="onSignOut()">Cerrar sesión</button>
         </div>
       
    </div>    
     
</div>`