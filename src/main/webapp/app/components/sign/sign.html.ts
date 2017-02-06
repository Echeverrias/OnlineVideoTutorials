export const signTemplate = ` <div id="ovt-sign" class="animate container">
    
    <div *ngIf="signIn" class="ovt-sign ovt-signIn">
        <div class="ovt-header">Bienvenido</div>
        
           <div class="ovt-container">
            <form  role="form" #signInForm="ngForm" (ngSubmit)="doSignIn()"  novalidate>
                  
                <div class="ovt-fields">  
                    <div class="form-group">
                        <label for="userName">Nombre de usuario</label>
                        <input id="userName" class="form-control" name="userName" type="text" [(ngModel)]="user.userName" #userName="ngModel" 
                            placeholder="Tu nombre de usuario" required>
                        <div *ngIf="!userName.valid && checkField" class="alert-danger alert">El nombre de usuario es requerido</div>
                     
                    </div>

                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input id="password" class="form-control" name="password" type="password" [(ngModel)]="user.password" #password="ngModel" 
                            placeholder="Tu contraseña" required>
                        <div *ngIf="!password.valid && checkField" class="alert-danger alert">La contraseña es requerida</div>
                       
                    </div>
                </div>    
                  <div class="ovt-submit" (mouseenter)="onGoingToClick()">
                    <input type="submit" class="ovt-submit" name="commit" value="Entrar" [disabled]="!signInForm.form.valid" class="btn btn-block btn-info"><br>
                 </div>
            </form>
            <hr>
              <button class="btn btn-block btn-info" (click)="onChangeToSignUp()">Registrarse</button>
         </div>     
    </div>

    <div *ngIf="!signIn" class="ovt-sign ovt-signUp">        
        <div class="ovt-header">Registro</div>
            <div class="ovt-container">
                <form role="form" #signUpForm="ngForm" (ngSubmit)="doSignUp()"  novalidate>
                  <div class="ovt-fields">  
                        <div class="form-group">
                            <label for="username">Nombre de usuario</label>
                            <div class="ovt-field">
                                <input id="userName" class="form-control" name="userName" type="text" [(ngModel)]="user.userName" #userName="ngModel" 
                                    placeholder="Tu nombre de usuario" required>
                                <div *ngIf="!userName.valid && checkField" class="alert-danger alert">El nombre de usuario es requerido</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <div class="ovt-field">
                                <input id="name" class="form-control" name="name" type="text" [(ngModel)]="user.name" #name="ngModel" 
                                    placeholder="Tu nombre" required>
                                <div *ngIf="!name.valid && checkField" class="alert-danger alert">El nombre es requerido</div>
                            </div>
                        </div>

                         <div class="form-group">
                            <label for="surname">Apellidos</label>
                            <div class="ovt-field">
                                <input id="surname" class="form-control" name="surname" type="text" [(ngModel)]="user.surname" #surname="ngModel" 
                                    placeholder="Tus apellidos" required>
                                <div *ngIf="!surname.valid && checkField" class="alert-danger alert">Los apellidos son requeridos</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Correo</label>
                            <div class="ovt-field">
                                <input id="email" class="form-control" name="email" type="email" [(ngModel)]="user.email" #email="ngModel" 
                                    placeholder="Tu dirección de correo electrónico" required>
                                <div *ngIf="!email.valid && checkField" class="alert-danger alert">La dirección de correo electrónico es requerida</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <div class="ovt-field">
                                <input id="password" class="form-control" name="password" type="password" [(ngModel)]="user.password" #password="ngModel" 
                                    placeholder="Your password" required>
                                <div *ngIf="!password.valid && checkField" class="alert-danger alert">La contraseña es requerida</div>
                            </div>
                        </div>

                         <div class="form-group">
                            <label for="userType">Tipo de usuario</label>
                            <div class="ovt-field">
                                <input id="userTypeTutor" class="form-control ovt-radio" name="userType" type="radio" [(ngModel)]="user.userType" #userType="ngModel" 
                                    value="tutor" required><span>Tutor</span>
                                <input id="userTypeStudent" class="form-control ovt-radio" name="userType" type="radio" [(ngModel)]="user.userType" #userType="ngModel" 
                                    value="student" required><span>Student</span>
                                <div *ngIf="!userType.valid && checkField" class="alert-danger alert">El tipo de usuario es requerida</div>
                            </div>
                        </div>
                    </div>   
                     <div class="ovt-submit" (mouseenter)="onGoingToClick()">
                        <input type="submit" name="commit" value="Registrarse" [disabled]="!signUpForm.form.valid" class="btn btn-block btn-info" ><br>
                     </div>
                </form>
            </div>    
     <div>  
    
</div>`