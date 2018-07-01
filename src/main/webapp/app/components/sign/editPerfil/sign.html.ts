export const editPerfilTemplate = ` <div id="ovt-edit-perfil" class="animate container">
    
     <div  class="ovt-sign ovt-edit-perfil">        
        <div class="ovt-header">Editar Perfil</div>
            <div class="ovt-container">
             <div class="ovt-container">
                    <div class="ovt-image">
                        <div class="ovt-user-icon big">
                             <img [src]="me.userImage | userImageSanitizer" />
                        </div>
                        <button type="button" (click)="fileInput.click()">Elige una imagen</button> 
                        <input 
                          style="display: none"
                          type="file"
                          ngFileSelect
                          [options]="uploadImageUserOptions"
                          (onUpload)="handleUpload($event)"
                          (beforeUpload)="beforeUpload($event)"
                          #fileInput>
                     </div>   
                    <div class="ovt-options">
                        <div class="ovt-text"><p><strong>{{me.userName}}</strong></p></div>
                    </div>

                </div>   
                <form role="form" [formGroup]="editPerfilForm" (ngSubmit)="doModifyPerfil()"  novalidate>
                  <div class="ovt-fields">  
                       
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <div class="ovt-field">
                                <input id="name" class="form-control" name="name" type="text" formControlName="name" 
                                    placeholder="Tu nombre" required>
                                <div class="ovt-display-alert" *ngIf="editPerfilForm.controls.name.errors && checkFields">       
                                    <div *ngIf="editPerfilForm.controls.name.errors.required" class="alert-danger alert">El nombre es requerido</div>
                                    <div *ngIf="editPerfilForm.controls.name.errors.minlength" class="alert-danger alert">El nombre debe tener como mínimo {{editPerfilForm.controls.name.errors.minlength.requiredLength}}</div>
                                </div>
                            </div>
                        </div>

                         <div class="form-group">
                            <label for="surname">Apellidos</label>
                            <div class="ovt-field">
                                <input id="surname" class="form-control" name="surname" type="text" formControlName="surname" 
                                    placeholder="Tus apellidos" required>
                                <div class="ovt-display-alert" *ngIf="editPerfilForm.controls.surname.errors && checkFields">       
                                    <div *ngIf="editPerfilForm.controls.surname.errors.required" class="alert-danger alert">El apellido es requerido</div>
                                    <div *ngIf="editPerfilForm.controls.surname.errors.minlength" class="alert-danger alert">El apellido debe tener como mínimo {{editPerfilForm.controls.surname.errors.minlength.requiredLength}}</div>
                                </div>    
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Correo</label>
                            <div class="ovt-field">
                                <input id="email" class="form-control" name="email" type="email" formControlName="email" 
                                    placeholder="Tu dirección de correo electrónico" required>
                                <div class="ovt-display-alert" *ngIf="editPerfilForm.controls.email.errors && checkFields">       
                                    <div *ngIf="editPerfilForm.controls.email.errors.required" class="alert-danger alert">La dirección de correo electrónico es requerido</div>
                                    <div *ngIf="!editPerfilForm.controls.email.errors.required && editPerfilForm.controls.email.errors.emailPattern" class="alert-danger alert">La dirección de correo electrónico no es válida</div>
                                    <div *ngIf="editPerfilForm.controls.email.errors.emailTaken" class="alert-danger alert">El email ya está asociado a una cuenta</div>
                                </div>    

                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Nueva contraseña</label>
                            <div class="ovt-field">
                                <input id="password" class="form-control" name="password" type="password" formControlName="password" 
                                    placeholder="Tu contraseña" required>
                                <div class="ovt-display-alert" *ngIf="editPerfilForm.controls.password.errors && checkFields">       
                                    <div *ngIf="editPerfilForm.controls.password.errors.minlength" class="alert-danger alert">La contraseña debe tener como mínimo {{editPerfilForm.controls.password.errors.minlength.requiredLength}}</div>
                                </div>    
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirmationPassword">Repite la contraseña</label>
                            <div class="ovt-field">
                                <input id="confirmationPassword" class="form-control" name="confirmationPassword" type="password" formControlName="confirmationPassword" 
                                    placeholder="Escribe de nuevo tu contraseña" required>
                                <div class="ovt-display-alert" *ngIf="editPerfilForm.errors && checkFields">       
                                    <div *ngIf="editPerfilForm.errors.checkPassword" class="alert-danger alert">Las contraseña no coinciden</div>
                                </div>    
                            </div>
                        </div>

                         <div class="form-group">
                            <label for="userType">Tipo de usuario</label>
                            <div class="ovt-field">
                                <input id="userTypeTutor" class="form-control ovt-radio" name="userType" type="radio" formControlName="userType" 
                                    value="tutor" required><span>Tutor</span>
                                <input id="userTypeStudent" class="form-control ovt-radio" name="userType" type="radio" formControlName="userType" 
                                    value="student" required><span>Estudiante</span>
                                <div class="ovt-display-alert" *ngIf="editPerfilForm.controls.userType.errors && checkFields">       
                                    <div *ngIf="editPerfilForm.controls.userType.errors.required" class="alert-danger alert">El tipo de usuario es requerido</div>
                                </div>    
                            </div>
                        </div>
                    </div>   
                     <div class="ovt-submit" (mouseenter)="onGoingToProcess()">
                        <input type="submit" name="commit" value="Guardar" [disabled]="!editPerfilForm.valid" class="btn btn-block btn-info" >
                     </div>
                </form>
                <button class="btn btn-block btn-info" (click)="onExitEditPerfil()">Salir</button>
            </div>    
     <div>  
    
</div>`