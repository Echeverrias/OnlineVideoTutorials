import { Injectable  } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { ConnectionService } from './../../core/connection.service';
import { SignService } from './sign.service';

import { IUser, IUserInfo, User } from './../../models/user';
//import { UserFile } from './../../models/types';
//import { UserForm } from './sign.types';
import { FieldValidationRequest } from './sign.types';
//import { UserFactory } from './../../models/userFactory';
//import { IdMessage } from './../../models/types';
import { UserService } from '../../core/user.service';


@Injectable()
export class ValidationService {
    
    private readonly _minPasswordLength: number = 8;
    private readonly _minLength: number = 3;
    
    constructor(private sign: SignService, private me: UserService){
        console.log("*SignService constructor")
        
    }

    get minPasswordLength(): number{
        return this._minPasswordLength;
    }

    get minLength(): number{
        return this._minLength;
    }

     // SignUpForm and EditPerfilForm's validators

    confirmPassword(control: FormControl): Object {
        return control.root && control.value === control.root.value['password'] ? null : {
            confirmPassword: true
        }
    }

    checkPassword(control: AbstractControl): Object {
        const password = control.get('password');
        const confirmationPassword = control.get('confirmationPassword');
        if (!password || !confirmationPassword) return null;
        return password.value === confirmationPassword.value? null: {
            checkPassword: true
        }
    }

    validateUserName(control: FormControl): Observable<{ [key: string]: any }> {
        return this.checkField(control.value, "userName").debounceTime(400).distinctUntilChanged() /*.first()*/;
    }

    validateEmail(control: FormControl): Observable<{ [key: string]: any }> {
        return this.checkField(control.value, "email").debounceTime(400).distinctUntilChanged() /*.first()*/;
    }

    /**
    * It checks, when a new user is going to register, that the user name and the email don't exists in the data base. 
    */     
    private checkField(value: string, field: string): Observable<{ [key: string]: any }> {
        console.log(`check${field}: ${value}`);
        return new Observable((obs: any) => {
            console.log(" new Observable");
            let infoField: FieldValidationRequest = {
                field: field,
                value: value,
                userName: this.me.userName
            };
            this.sign.validateField(infoField)
                .subscribe(
                response => {
                    obs.next(null);
                    obs.complete();
                },
                error => {
                    let key: string;
                    let message: string = error.json().message;
                    if (message === `userName taken`) {
                        key = 'userNameTaken';
                    }
                    else if (message === `email taken`) {
                        key = 'emailTaken';
                    }
                    obs.next({ [key]: true });
                    obs.complete();
                }
                )

        });

    } 

    // EditPerfilForm validator
    validateNewPasswordLength(control: FormControl): Object{
        return (control.root && ((control.value.length == 0) || (control.value.length >= 8) ))? null : {
            validateNewPasswordLength: { actualLength: control.value.length, requiredLength: 8}
        }
    }

    validateEmailPattern(control: FormControl): Object{
        let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
        return  emailRegExp.test(control.value)? null: {
            emailPattern: true
        }
    }

    
    
}