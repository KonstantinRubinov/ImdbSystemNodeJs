import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { Action } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';
import { LogService } from 'src/app/services/log.service';
import { Store } from 'src/app/redux/store';
import { NgRedux } from 'ng2-redux';
import { LoginUser } from 'src/app/models/LoginUser';
import { UserService } from 'src/app/services/ApiConnections/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
   public minDate = new Date('1920-12-17T03:24:00');
   public maxDate = new Date();
   public userFirstName: string;
   public userLastName: string;
   public userID: string;
   public userNickName: string;
   public userBirthDate: Date;
   public userGender: string;
   public userEmail: string;
   public userPassword: string;
   public userPicture:string;
   public userImage: string;
   public userImdbPass:string;
   
   public userPassword2:string;
   public rightFile=true;
   public extension:string;

   public genderChoises = [
		"Male",
		"Female",
		"Other"
   ];
   
   public imageChangedEvent: any = '';
   public fileChangeEvent(event) {
      this.imageChangedEvent = event;
      let files = event.target.files;
      let fileName = files[0].name;
      this.userPicture = fileName;
      let extensions = this.userPicture.split(".");
      this.extension = extensions[extensions.length-1].toLowerCase();
      let regex = new RegExp("(jpg|png|jpeg|gif)$"); 
      let regexTest = regex.test(this.extension);

      if (regexTest){
         this.rightFile=true;
      } else {
         this.rightFile=false;
      }
   }
   
   private handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.userImage = btoa(binaryString);  // Converting binary string data.
   }

   public IdLabelColor = {
      'color':'black'
   };

   public signUpForm:any;
   constructor(private userService: UserService,
               private router: Router,
               private logger: LogService,
               private redux:NgRedux<Store>) {
      this.signUpForm = new FormGroup({
         FirstName: new FormControl(this.userFirstName, [
           Validators.required,
           Validators.minLength(2),
         ]),
         LastName: new FormControl(this.userLastName, [
            Validators.required,
            Validators.minLength(2)
         ]),
         ID: new FormControl(this.userID, [
            Validators.required,
            Validators.minLength(8),
            ValidationService.idValidator
         ]),
         BirthDate: new FormControl(this.userBirthDate, [
            Validators.required
         ]),
         Gender: new FormControl(this.userGender, [
            Validators.required
         ]),
         Email: new FormControl(this.userEmail, [
            Validators.required,
            ValidationService.emailValidator
         ]),
         ImdbPass: new FormControl(this.userImdbPass, [
            Validators.required,
            Validators.minLength(2)
         ]),
         UserName: new FormControl(this.userNickName, [
            Validators.required,
            Validators.minLength(2)
         ]),
         Password: new FormControl(this.userPassword, [
            Validators.required,
            Validators.minLength(2)
         ]),
         RetypePassword: new FormControl(this.userPassword2, [
            Validators.required,
            Validators.minLength(2)
         ])
      }, ValidationService.match);
   }
      
   errmsg: any;  

   public signUp(): void {
      let user:User=new User(
         this.userID,
         this.userFirstName,
         this.userLastName,
         this.userNickName,
         this.userPassword,
         this.userEmail,
         this.userGender,
         this.userBirthDate,
         this.userPicture,
         1,
         this.userImage,
         this.userImdbPass
      );
      this.userService.signUp(user).subscribe(user=>{
            if(user.hasOwnProperty('result')){
               user=user.result;
            }
            this.logger.debug("signUp: ", user);
            let loginUser:LoginUser = new LoginUser();
            loginUser.userNickName= user.userNickName;
            loginUser.userPassword= user.userPassword;
            this.signIn(loginUser);
         }, error => {
            const action: Action={type:ActionType.SignUpError, payload:error.error};
            this.redux.dispatch(action);
            this.logger.error("signUpError: ", error.message);
         }
      );
   }

   public signIn(loginUser:LoginUser): void {
      if (environment.core==false){
         this.userService.login(loginUser) 
            .subscribe(res => {    
               if (res.status === 200) { 
                  sessionStorage.setItem('access_token', res.body.access_token);
                  let loginUser:LoginUser = new LoginUser();
                  loginUser.userNickName=res.body.userNickName;
                  loginUser.userPicture=res.body.userPicture;
                  const action: Action={type:ActionType.UserLogin, payload:loginUser};
                  this.redux.dispatch(action);                                                                                    localStorage.setItem('access_token', res.body.access_token);  
               } else {  
                  this.errmsg = res.status + ' - ' + res.statusText;
                  const action: Action={type:ActionType.LoginError, payload:this.errmsg};
                  this.redux.dispatch(action);
               }  
            },  
                     err => {                                 
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
            });  
      } else {
         const observable = this.userService.loginCore(loginUser)
         observable.subscribe(res => {
            this.logger.debug("LoggedUser: ", res);
            sessionStorage.setItem('access_token', res.usertoken);
            let loginUser:LoginUser = new LoginUser();
            loginUser.userNickName=res.userNickName;
            loginUser.userPicture=res.userPicture;
            const action: Action={type:ActionType.UserLogin, payload:loginUser};
            this.redux.dispatch(action);    
                           }, error => {
            this.logger.error('Invalid username or password.', error.message); 
            const action: Action={type:ActionType.LoginError, payload:error.message};
            this.redux.dispatch(action); 
                           }
         );
      }
   }
   
   ngOnInit() {}
   
   public croppedImage: any = '';
   
   public imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      let file = base64ToFile(this.croppedImage);
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
   }

   public imageLoaded() {
      // show cropper
   }

   public loadImageFailed() {
      // show message
   }

   numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
   }
}