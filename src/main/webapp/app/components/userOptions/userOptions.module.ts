import { NgModule }      from '@angular/core';
import { UserOptionsComponent } from './userOptions.component';
import { SharedModule } from '../../shared/shared.module';
import { SignModule } from '../sign/sign.module';


@NgModule({
    imports: [ SharedModule, SignModule ],
    declarations: [ UserOptionsComponent],
    exports: [ UserOptionsComponent ]
  })
  export class UserOptionsModule { }