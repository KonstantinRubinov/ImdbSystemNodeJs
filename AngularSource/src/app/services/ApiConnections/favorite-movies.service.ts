import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Movie } from '../../models/Movie';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/action-type';
import { favoriteId, moviesUrl, favoriteTitle, favoriteWord } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LogService } from '.././log.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesService {

  public constructor(private http: HttpClient,
                     private redux: NgRedux<Store>,
                     private router: Router,
                     private logger: LogService){}
  
  public GetMovieById(movieId:string): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.get<Movie>(favoriteId + movieId,{ headers: he });
    observable.subscribe(movie=>{
      const action: Action={type:ActionType.GetFavoriteMovie, payload:movie}; 
      this.redux.dispatch(action);
      this.logger.debug("GetMovieById: ", movie);
    }, error => {
      const action: Action={type:ActionType.GetFavoriteMovieError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("GetMovieByIdError: ", error.message);
    });
  }
  
  public GetMoviesByName(movieName:string): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.get<Movie>(favoriteTitle+movieName, { headers: he });
    observable.subscribe(movie=>{
      const action: Action={type:ActionType.GetFavoriteMovie, payload:movie};
      this.redux.dispatch(action);
      this.logger.debug("GetMoviesByName: ", movie);
    }, error => {
      const action: Action={type:ActionType.GetFavoriteMovieError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("GetMoviesByNameError: ", error.message);
    });
  }

  public GetMoviesByWord(movieWord:string): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.get<Movie[]>(favoriteWord+movieWord, { headers: he });
    observable.subscribe(movies=>{
      const action: Action={type:ActionType.GetFavoriteMovies, payload:movies};
      this.redux.dispatch(action);
      this.logger.debug("GetMoviesByWord: ", movies);
    }, error => {
      const action: Action={type:ActionType.GetFavoriteMoviesError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("GetMoviesByWordError: ", error.message);
    });
  }

  public GetAllMovies(): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.get<Movie[]>(moviesUrl, { headers: he });
    observable.subscribe(movies=>{
      const action: Action={type:ActionType.GetFavoriteMovies, payload:movies};
      this.redux.dispatch(action);
      this.logger.debug("GetAllMovies: ", movies);
    }, error => {
      const action: Action={type:ActionType.GetFavoriteMoviesError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("GetAllMoviesError: ", error.message);
    });
  }
  
  public AddMovieToFavorite(movie:Movie): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.post<Movie>(moviesUrl, movie, { headers: he });
    observable.subscribe(movie=>{
      const action: Action={type:ActionType.AddMovieToFavorite, payload:movie};
      this.redux.dispatch(action);
      this.logger.debug("AddMovieToFavorite: ", movie);
      this.router.navigate(["/favorites"]);
    }, error => {
      const action: Action={type:ActionType.AddMovieToFavoriteError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("AddMovieToFavoriteError: ", error.message);
    });
  }

  public UpdateMovieToFavorite(id:string, movie:Movie): void {
    let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.post<Movie>(moviesUrl+id, movie, { headers: he });
    observable.subscribe(movie=>{
      const action: Action={type:ActionType.UpdateFavoriteMovie, payload:movie};
      this.redux.dispatch(action);
      this.logger.debug("UpdateMovieToFavorite: ", movie);
      this.router.navigate(["/favorites"]);
    }, error => {
      const action: Action={type:ActionType.UpdateFavoriteMovieError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("UpdateMovieToFavoriteError: ", error.message);
    });
  }

public DeleteFromFavorites(imdbId: string): void {
  let he = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    let observable = this.http.delete<string>(moviesUrl+imdbId, { observe: 'response', headers: he});
    observable.subscribe(res =>{
      this.logger.debug("DeleteFromFavorites result status: ", res.status);
      if (res.status===204){
        const action: Action={type:ActionType.DeleteFavoriteMovie, payload:imdbId };
        this.redux.dispatch(action);
        this.logger.debug("DeleteFromFavorites: ", imdbId);
        this.router.navigate(["/favorites"]);
      }
    }, error => {
      const action: Action={type:ActionType.DeleteFavoriteMovieError, payload:error.message};
      this.redux.dispatch(action);
      this.logger.error("DeleteFromFavoritesError: ", error.message);
    });
  }
}