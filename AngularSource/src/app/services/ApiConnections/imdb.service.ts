import { Injectable } from '@angular/core';
import { Store } from '../../redux/store';
import { NgRedux } from 'ng2-redux';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/action-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../../models/Movie';
import { imdbTitle, imdbWord, imdbId } from 'src/environments/environment';
import { LogService } from '.././log.service';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  public constructor(private http: HttpClient,
                     private redux: NgRedux<Store>,
                     private logger: LogService) { }
  
    public GetMoviesByName(movieName:string): void {
      let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
      let observable = this.http.get<Movie>(imdbTitle+movieName, { headers: he });
      observable.subscribe(movie=>{
        const action: Action={type:ActionType.GetImdbMovie, payload:movie};
        this.redux.dispatch(action);
        this.logger.debug("GetMoviesByName: ", movie);
      }, error => {
        const action: Action={type:ActionType.GetImdbMovieError, payload:error.message};
        this.redux.dispatch(action);
        this.logger.error("GetMoviesByNameError: ", error.message);
      });
    }

    public GetMoviesByWord(movieWord:string): void {
      let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
      let observable = this.http.get<Movie[]>(imdbWord+movieWord, { headers: he });
      observable.subscribe(movies=>{
        const action: Action={type:ActionType.GetImdbMovies, payload:movies};
        this.redux.dispatch(action);
        this.logger.debug("GetMoviesByWord: ", movies);
      }, error => {
        const action: Action={type:ActionType.GetImdbMoviesError, payload:error.message};
        this.redux.dispatch(action);
        this.logger.error("GetMoviesByWordError: ", error.message);
      });
    }

    public GetMovieById(movieId:string): void {
      let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
      let observable = this.http.get<Movie>(imdbId+movieId, { headers: he });
      observable.subscribe(movie=>{
        const action: Action={type:ActionType.GetImdbMovie, payload:movie};
        this.redux.dispatch(action);
        this.logger.debug("GetMovieById: ", movie);
      }, error => {
        const action: Action={type:ActionType.GetImdbMovieError, payload:error.message};
        this.redux.dispatch(action);
        this.logger.error("GetMovieByIdError: ", error.message);
      });
    }

    public GetMoviesById(movieId:string): void {
      let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
      let observable = this.http.get<Movie>(imdbId+movieId, { headers: he });
      observable.subscribe(movie=>{
        const action: Action={type:ActionType.UpdateImdbMovie, payload:movie};
        this.redux.dispatch(action);
        this.logger.debug("GetMoviesById: ", movie);
      }, error => {
        const action: Action={type:ActionType.UpdateImdbMovieError, payload:error.message};
        this.redux.dispatch(action);
        this.logger.error("GetMoviesByIdIdError: ", error.message);
      });
    }
}
