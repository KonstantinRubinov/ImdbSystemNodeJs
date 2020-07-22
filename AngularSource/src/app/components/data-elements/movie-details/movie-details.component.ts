import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';
import { Movie } from 'src/app/models/Movie';
import { LoginUser } from 'src/app/models/LoginUser';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ImdbService } from 'src/app/services/ApiConnections/imdb.service';
import { FavoriteMoviesService } from 'src/app/services/ApiConnections/favorite-movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  
  private unsubscribe:Unsubscribe;
  public movie: Movie= new Movie();
  public loginUser:LoginUser;
  public place:string;
  public buttonText:string;

  constructor(private activatedRoute: ActivatedRoute,
              private imdbService: ImdbService,
              private favoriteMoviesService: FavoriteMoviesService,
              private redux:NgRedux<Store>) { }

  public ngOnInit(): void {
    this.movie = this.redux.getState().movie;
    this.place = this.redux.getState().place;
    this.unsubscribe = this.redux.subscribe(()=>{
      this.movie = this.redux.getState().movie;
    });
    let id = this.activatedRoute.snapshot.params.id;
    if (this.place==="favorites"){
      this.favoriteMoviesService.GetMovieById(id.toString());
    } else{
      this.imdbService.GetMovieById(id.toString());
    }



    

    

    if (this.place==="favorites"){
      this.buttonText="Remove from favorites";
    } else{
      this.buttonText="Add to favorites";
    }
    //this.favoriteMoviesService.GetMovieById(id.toString());
  }

  private isNumber(value: string | number): boolean
  {
    return ((value != null) && !isNaN(Number(value.toString())));
  }
  
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public DoCommand(){
    if (this.place==="favorites"){
      this.DeleteFromFavorites();
    } else{
      this.AddToFavorites();
    }
  }

  public AddToFavorites(){
    this.favoriteMoviesService.AddMovieToFavorite(this.movie);
  }

  public DeleteFromFavorites(){
    this.favoriteMoviesService.DeleteFromFavorites(this.movie.imdbID);
  }

  

    

}
