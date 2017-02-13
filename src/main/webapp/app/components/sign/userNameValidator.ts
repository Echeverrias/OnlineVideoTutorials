/*

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import "rxjs/add/operator/distinctUntilChange";
import 'rxjs/Rx';

import { SignService } from '../../services/sign.service';

interface IUserNameValidator {}

function validateUniqueUserName(userName: string) {


    return new Observable(observer => {
        console.log('VALIDATE');
        if (userName === "eduardo.gil") {
            observer.next({ asyncInvalid: true });
            //observer.complete();
        } else {
            observer.next(null);
            //observer.complete();
        }
    });
}

function checkUserName(userName: string) {

    return new Observable(observer => {
        this.sign.validateUserName(userName)
            .subscribe(
            (success) => {
                console.log(success);
                if (success) {
                    observer.next(null);

                }
                else {
                    observer.next({
                        validUserName: {
                            valid: false
                        }
                    })
                };

            },
            (error) => {

                observer.next({
                    validUserName: {
                        valid: false
                    }
                })
            },

            () => { }
            )
    }
    )
}

export class UserNameValidator{

    constructor(){};

    static validate(c: FormControl): Observable<{ [key: string]: any }> {
        return validateUniqueUserName(c.value).debounceTime(500).distinctUntilChange().first();;
    }

   




    static validateUserName(control: FormControl): Observable<IUserNameValidator> {
        return checkUserName(control.value).debounceTime(4000).distinctUntilChanged().first();

    }

    
}
*/