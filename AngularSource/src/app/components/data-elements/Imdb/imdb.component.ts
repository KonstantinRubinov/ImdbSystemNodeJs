import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { Unsubscribe } from 'redux';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Action } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';
import { SessionService } from 'src/app/services/session.service';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
import { Router } from "@angular/router";
import { LogService } from 'src/app/services/log.service';
import { ImdbService } from 'src/app/services/ApiConnections/imdb.service';

@Component({
  selector: 'app-imdb',
  templateUrl: './imdb.component.html',
  styleUrls: ['./imdb.component.css']
})
export class ImdbComponent implements OnInit, OnDestroy {

  public movies: Movie[]=[];
  public allMoviesAllDataError:string='';
  private unsubscribe:Unsubscribe;

  private place:string = "imdb";

  private navigationId=0;
  private restoredStateId=0;
  
  constructor(private imdbService:ImdbService,
              private redux:NgRedux<Store>,
              private sessionService:SessionService,
              private logger:LogService,
              private router: Router) {
                router.events
                  .pipe(
                      filter(
                          ( event: NavigationEvent ) => (event instanceof NavigationStart)
                      )
                  )
                  .subscribe(
                      ( event: NavigationStart ) => {
      
                          console.group( "NavigationStart Event" );
                          this.logger.debug("navigation id: ", event.id);
                          this.navigationId=event.id;
                          this.logger.debug("route: ", event.url);
                          this.logger.debug("trigger: ", event.navigationTrigger);
                          if ( event.restoredState ) {
                            this.restoredStateId = event.restoredState.navigationId;
                            this.logger.warn("restoring navigation id: ", event.restoredState.navigationId);
      
                          }
                          this.GetSession(event.navigationTrigger);
                          console.groupEnd();
      
                      }
                  );
              }

              //trigger: popstate

    

    private GetSession(navigationTrigger):void{
      let m:Movie[]=[];
      if (navigationTrigger === "popstate"){
        m =this.sessionService.retrieveSession("ImdbComponent") as Movie[];
        if (m && m.length>0){
          this.logger.debug("imdb to get: ", m);
          const action: Action={type:ActionType.GetImdbMovies, payload:m};
          this.redux.dispatch(action);
          this.movies = this.redux.getState().imdbMovies;
          this.logger.debug("GetSessionImdb: ", this.movies);
        }
      } 
    };


    public ngOnInit(): void {
      //this.GetSession();
      const action: Action={type:ActionType.SetPlace, payload:this.place};
      this.redux.dispatch(action);
      
      this.unsubscribe = this.redux.subscribe(()=>{
        this.movies = this.redux.getState().imdbMovies;
      });
      this.movies = this.redux.getState().imdbMovies;
    }

  
  // public Search(word){
  //   this.imdbService.GetMoviesByWord(word);
  // }
  public ngOnDestroy(): void {
    if (this.movies.length>0){
      this.sessionService.storeSession("ImdbComponent", this.movies);
    }
    this.unsubscribe();
  }

}
