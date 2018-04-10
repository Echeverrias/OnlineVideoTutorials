import { NgModule } from '@angular/core';
import { ConnectionService} from './connection.service';
import { FileService} from './file.service';
import { HandlerService} from './handler.service';
import { UserService} from './user.service';

@NgModule({
    providers: [ConnectionService, FileService, HandlerService, UserService]
})

export class CoreModule {}