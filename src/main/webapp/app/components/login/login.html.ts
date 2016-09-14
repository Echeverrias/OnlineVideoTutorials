export const loginTemplate = ` <div id="login" class="animate join container">
    
    <div class="ovt-header">Login</div>
    
   
        <form  class="ovt-container-col" role="form" #loginForm="ngForm" (ngSubmit)="doLogin()"  novalidate>

            <div class="form-group">
                <label for="username">User name</label>
                <input id="userName" class="form-control" name="userName" type="text" [(ngModel)]="user.userName" #userName="ngForm" 
                    placeholder="tutor* or student*" required>
                <div *ngIf="!userName.valid" class="alert-danger alert">Name is required</div>
                <br>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" class="form-control" name="password" type="password" [(ngModel)]="user.password" #password="ngForm" 
                    placeholder="Your password" required>
                <div *ngIf="!password.valid" class="alert-danger alert">Password is required</div>
                <br>
                <br>
            </div>
            <input type="submit" name="commit" value="Log in" [disabled]="!loginForm.form.valid" class="btn btn-block btn-info"><br>

        </form>
       
    
</div>`