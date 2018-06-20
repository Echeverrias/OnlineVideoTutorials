import { Injectable } from '@angular/core';
import { Router , CanActivate} from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private auth: AuthService){};

    canActivate(){
        //if(localStorage.getItem('ovtUser')){
        if(this.auth.theUserIsLogged()){
            return true;
        }
        else{
            console.log(`this.router.navigate(["/sign"])`);
            this.router.navigate(["/sign"]);
        }
    }

}