import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginUser } from 'src/app/models/LoginUser';
import { Store } from 'src/app/redux/store';
import { NgRedux } from 'ng2-redux';
import { Action } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';
import { Unsubscribe } from 'redux';
import { environment } from 'src/environments/environment';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/ApiConnections/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  public login:LoginUser = new LoginUser();
  public loginError="";
  private unsubscribe:Unsubscribe;
  
  constructor(private userService: UserService,
              private logger: LogService,
              private redux:NgRedux<Store>) { }
  
  ngOnInit() {
    this.unsubscribe = this.redux.subscribe(()=>{
      if (this.redux.getState().loginUser)
      {
        this.login = this.redux.getState().loginUser;
      }
      if (this.redux.getState().loginError!=null && this.redux.getState().loginError!==''){
        this.loginError = this.redux.getState().loginError;
        const action: Action={type:ActionType.LoginError, payload:""};
        this.redux.dispatch(action);
      }
    });
  }
  
  errmsg: any;  

  public signIn(): void {
    if (environment.core==false){
      this.userService.login(this.login) 
      .subscribe(res => {
        if (res.status === 200) {
          //alert(res.body.access_token);
          sessionStorage.setItem('access_token', res.body.access_token);
          let loginUser:LoginUser = new LoginUser(
            res.body.userNickName,
            "",
            "",
            res.body.userPicture,
          );
          const action: Action={type:ActionType.UserLogin, payload:loginUser};
          this.redux.dispatch(action);                                                                                    localStorage.setItem('access_token', res.body.access_token);  
        } else {  
          this.errmsg = res.status + ' - ' + res.statusText;
          const action: Action={type:ActionType.LoginError, payload:this.errmsg};
          this.redux.dispatch(action);
        }  
          }, err => {                                 
          if (err.status === 401  ) {  
            this.errmsg = 'Invalid username or password.'; 
            const action: Action={type:ActionType.LoginError, payload:this.errmsg};
            this.redux.dispatch(action); 
          } else if (err.status === 400  ) {  
            this.errmsg = 'Invalid username or password.';  
            const action: Action={type:ActionType.LoginError, payload:this.errmsg};
            this.redux.dispatch(action);
          } else {  
            this.errmsg ="Invalid username or password";  
            const action: Action={type:ActionType.LoginError, payload:this.errmsg};
            this.redux.dispatch(action);
          }  
        }
      );  
    } else {
      const observable = this.userService.loginCore(this.login)
      observable.subscribe(res => {
        this.logger.debug("LoggedUser: ", res);
        //alert(res.usertoken);
        sessionStorage.setItem('access_token', res.usertoken);
        let loginUser:LoginUser = new LoginUser(
          res.userNickName,
          "",
          "",
          res.userPicture
        );
        const action: Action={type:ActionType.UserLogin, payload:loginUser};
        this.redux.dispatch(action);    
                      }, error => {
        this.logger.error('Invalid username or password.', error.message); 
        const action: Action={type:ActionType.LoginError, payload:error.message};
        this.redux.dispatch(action); 
      });
    }
  } 

  public ngOnDestroy(): void {
    this.unsubscribe();
  }
}