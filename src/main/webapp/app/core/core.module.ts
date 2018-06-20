import { NgModule } from '@angular/core';
import { AuthService} from './auth.service';
import { ConnectionService} from './connection.service';
import { FileService} from './file.service';
import { HandlerService} from './handler.service';
import { UserService} from './user.service';

@NgModule({
    providers: [ConnectionService, FileService, HandlerService, AuthService, UserService]
})

export class CoreModule {}