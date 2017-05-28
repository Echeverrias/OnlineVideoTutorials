export var userOptionsTemplate: string = `<div id="ovt-user-options">
    <div class="ovt-user-display">
        <div class="ovt-user-icon small" (click)="onDisplayMenu($event)">
            <a title="Cuenta de {{me.myName}}">
                <img [src]="getUserImageUrl()" />
            </a>    
        </div>
        <div class="ovt-clear"></div>
    </div>
    <div class="ovt-user-menu" *ngIf="menuDisplayed">
        <div class="ovt-container">
            <div class="ovt-image">
                <div class="ovt-user-icon big">
                     <img [src]="getUserImageUrl()" />
                </div>
            </div>   
            <div class="ovt-options">
                <div class="ovt-full-name"><p><strong>{{me.myName}} {{me.mySurname}}</strong><p></div>
                <hr>
                <div><button class="btn ovt-btn" (click)="onEditAccount()">Editar perfil</button></div>
            </div>
        </div>   
         <div class="ovt-footer">
            <button class="btn ovt-btn" (click)="onSignOut()">Cerrar sesión</button>
         </div>
       
    </div>    
     
</div>`