import { NgModule } from "@angular/core";

import { NgUploaderModule } from 'ngx-uploader';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './signUp/signUp.component';
import { SignInComponent } from './signIn/signIn.component';
import { EditPerfilComponent } from './editPerfil/editPerfil.component';
import { ValidationService } from './validation.service';
import { SignService } from './sign.service';


@NgModule({
    imports: [SharedModule, NgUploaderModule],
    declarations: [SignInComponent, SignUpComponent, EditPerfilComponent],
    providers: [ValidationService, SignService],
    exports: [ SignInComponent, SignUpComponent, EditPerfilComponent ]
  })
  export class SignModule { }