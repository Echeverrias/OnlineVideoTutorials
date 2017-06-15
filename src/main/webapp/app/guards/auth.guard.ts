import { Injectable } from '@angular/core';
import { Router , CanActivate} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router){};

    canActivate(){
        if(localStorage.getItem('ovtUser')){
            return true;
        }
        else{
            console.log(`this.router.navigate(["/sign"])`);
            this.router.navigate(["/sign"]);
        }
    }

}