export const signInTemplate = ` <div id="ovt-sign-in" class="animate container">
    <!-- SIGN IN -->
    <div  class="ovt-sign ovt-signIn">
        <div class="ovt-header">Bienvenido</div>
        
           <div class="ovt-container">
            <form  role="form" [formGroup]="signInForm" (ngSubmit)="doSignIn()"  novalidate>
                  
                <div class="ovt-fields">  
                    <div class="form-group">
                        <label for="userName">Nombre de usuario</label>
                        <input id="userName" class="form-control" name="userName" type="text" formControlName="userName" 
                            placeholder="Tu nombre de usuario" required>
                        <div class="ovt-display-alert" *ngIf="signInForm.controls.userName.errors && checkFields">       
                            <div *ngIf="signInForm.controls.userName.errors.required" class="alert-danger alert">El nombre de usuario es requerido</div>
                            <div *ngIf="signInForm.controls.userName.errors.minlength" class="alert-danger alert">El nombre de usuario debe tener como mínimo {{signInForm.controls.userName.errors.minlength.requiredLength}}</div>
                        </div> 
                    </div>

                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input id="password" class="form-control" name="password" type="password" formControlName="password" placeholder="Tu contraseña" required>
                        <div class="ovt-display-alert" *ngIf="signInForm.controls.password.errors && checkFields">   
                            <div *ngIf="signInForm.controls.password.errors.required" class="alert-danger alert">La contraseña es requerida</div>
                            <div *ngIf="signInForm.controls.password.errors.minlength" class="alert-danger alert">La contraseña debe tener como mínimo {{signInForm.controls.password.errors.minlength.requiredLength}} </div>
                        </div>
                    </div>
                </div>
                <div class="form-group"> 
                    <input id="remember-password" name="rememberPassword" formControlName="rememberPassword" type="checkbox" (change)="onToggleRememberPassword()"> Recordar contraseña   
                </div>  
                  <div class="ovt-submit" (mouseenter)="onGoingToProcess()">
                    <input type="submit" class="ovt-submit" name="commit" value="Entrar" [disabled]="!signInForm.valid" class="btn btn-block btn-info"><br>
                 </div>
            </form>
            <hr class="ovt-separator">
              <button class="btn btn-block btn-info" (click)="onChangeToSignUp()">Registrarse</button>
         </div>     
    </div>
    
</div>`