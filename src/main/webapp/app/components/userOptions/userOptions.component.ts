import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { UserService } from '../../services/user.service';
import { userOptionsTemplate } from './userOptions.html';
import { SignStates } from '../sign/sign.component';

@Component({
    moduleId: module.id,
    selector: 'ovt-user-options',
    styleUrls: ['userOptions.css'],
    template: userOptionsTemplate
})

export class UserOptionsComponent{

    private menuDisplayed: boolean;

    constructor(private router: Router, private sanitizer: DomSanitizer, private me: UserService){
        this.menuDisplayed = false;  
        console.log(this.router);      
    }

    onEditAccount(){
        this.displayOrHideMenu();
        this.router.navigate(['/sign', { state: SignStates.EditPerfil }]);
    }

    onSignOut(){
        console.log("");
        console.log(`* <- UserOptions.onSignOut ${new Date().toLocaleTimeString()}`);
        this.displayOrHideMenu();
        this.router.navigate(['/sign']);
     }

    getUserImageUrl(): SafeResourceUrl{
       return this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.me.myUserImageMimeType}; base64,${this.me.myUserImageContent}`);
    }

    onDisplayMenu(event:Event){
        this.displayOrHideMenu();
        event.stopPropagation();
    }

    onHideMenu() {
        this.menuDisplayed = false;
    }

    private displayOrHideMenu(){
        this.menuDisplayed = !this.menuDisplayed;
    }
}