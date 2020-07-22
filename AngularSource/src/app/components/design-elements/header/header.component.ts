import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MyNavigator } from 'src/app/models/MyNavigator';
import { Store } from 'src/app/redux/store';
import { NgRedux } from 'ng2-redux';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { LoginUser } from 'src/app/models/LoginUser';
import { Action } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';
import { baseUrl, environment } from 'src/environments/environment';
import { ImdbService } from 'src/app/services/ApiConnections/imdb.service';
import { FavoriteMoviesService } from 'src/app/services/ApiConnections/favorite-movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe:Unsubscribe;
  public loginUser:LoginUser;
  public isLoggedIn:boolean;
  public myLevel=0;
  public mUrl=baseUrl;
  public nodejs = ''

  @ViewChild('signUpModal') private signUpModal: ElementRef;
  @ViewChild('signInModal') private signInModal: ElementRef;

  @ViewChild('signUp') private signUp: ElementRef;
  @ViewChild('signIn') private signIn: ElementRef;
  
  
  constructor(private router: Router,
              private redux:NgRedux<Store>,
              private imdbService:ImdbService,
              private favoriteMoviesService:FavoriteMoviesService) { }

  public searchByWord:string;
  //public movies:Movie[] = [];

  public ngOnInit() {
    this.unsubscribe = this.redux.subscribe(()=>{
      this.loginUser = this.redux.getState().loginUser;
      this.isLoggedIn = this.redux.getState().isLoggedIn;
      if (this.isLoggedIn){
        this.signUpModal.nativeElement.click();
        this.signInModal.nativeElement.click();
      }

      //this.movies = this.redux.getState().movies;
  
      if (this.redux.getState().needSignIn){
        this.signIn.nativeElement.click();
        const action: Action={type:ActionType.NeedSignIn, payload:false};
        this.redux.dispatch(action);
      }
    });
  }

  public logout(): void {
    const action: Action={type:ActionType.UserLogOut};
    this.redux.dispatch(action);
    this.myLevel=0;
    this.router.navigate(["/imdb"]);
  }

  
  
  navigators = [
    new MyNavigator("/imdb", 'Home'),
    new MyNavigator("/favorites", 'My List'),
    new MyNavigator("", 'SignUp'),
    new MyNavigator("", 'SignIn'),
    new MyNavigator("", 'SignOut')
  ];
  
  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  public Search(){
    
    let place = this.redux.getState().place;

    if (this.searchByWord.length>0){
      if (place==="favorites"){
        this.favoriteMoviesService.GetMoviesByWord(this.searchByWord);
      } else{
        this.imdbService.GetMoviesByWord(this.searchByWord);
      }
    }

    
      
  }
}
