import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../../models/LoginUser';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/action-type';
import { Store } from '../../redux/store';
import { NgRedux } from 'ng2-redux';
import { User } from '../../models/User';
import { baseUrl } from 'src/environments/environment';
import { usersUrl } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LogService } from '.././log.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient,
                     private redux: NgRedux<Store>,
                     private router: Router,
                     private logger: LogService,
                     private cookieService: CookieService) { 
    this._sessionId = cookieService.get("sessionId");
    // cookieService.set(nameOfCookie,cookieValue);
  }

  private _sessionId: string;

  public set sessionId(value: string) {
    this._sessionId = value;
    this.cookieService.set("sessionId", value);
  }
  
  public login(loginUser:LoginUser): any {
    const body = new HttpParams()          
    .set('grant_type', 'password')          
    .set('username', loginUser.userNickName)    
    .set('password', loginUser.userPassword)

    return this.http.post(baseUrl + 'token', body.toString(), {observe: 'response',    
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },    
    });
  }

  public loginCore(loginUser:LoginUser): any {
    return this.http.post<LoginUser>(baseUrl + 'token', loginUser);
  }

  public signUp(userModel:User): Observable<any> {
    return this.http.post<User>(usersUrl, userModel);
  }

  // public signUp(userModel:User): any {
  //   let observable = this.http.post<User>(usersUrl, userModel);
  //   observable.subscribe(user=>{
  //     this.logger.debug("signUp: ", user);
  //     const body = new HttpParams()          
  //     .set('grant_type', 'password')          
  //     .set('username', user.userNickName)    
  //     .set('password', user.userPassword)  
  //     return this.http.post(baseUrl + '/token', body.toString(), {observe: 'response',    
  //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },    
  //     });
  //   }, error => {
  //     return error.message;
  //   });
  // }

  // public signUpCore(userModel:User): any {
  //   let observable = this.http.post<User>(usersUrl, userModel);
  //   observable.subscribe(user=>{
  //     this.logger.debug("signUp: ", user);
  //     let loginUser:LoginUser;
  //     loginUser.userNickName= user.userNickName;
  //     loginUser.userPassword= user.userPassword;
  //     return this.http.post<LoginUser>(baseUrl + '/token', loginUser);
  //   }, error => {
  //     return error.message;
  //   });
  // }
  
  public updateUser(user:User): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.put<User>(usersUrl, user, { headers: he });
    observable.subscribe(user=>{
      const action: Action={type:ActionType.UpdateUser, payload:user};
      this.redux.dispatch(action);
      this.logger.debug("updateUser: ", user);
    }, error => {
      this.logger.error("updateUserError: ", error.message);
    });
  }
  
  public UploadFile(id, file): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.post<User>(usersUrl + "file/" + id, file, { headers: he });
    observable.subscribe(user=>{
        const action: Action={type:ActionType.UpdateUser, payload:user};
        this.redux.dispatch(action);
        this.logger.debug("UploadFile: ", user);
    }, error => {
      this.logger.error("UploadFileError: ", error.message);
    });
  }
}