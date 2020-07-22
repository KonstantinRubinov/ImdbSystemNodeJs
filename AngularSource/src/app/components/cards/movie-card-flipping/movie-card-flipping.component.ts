import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { ImdbService } from 'src/app/services/ApiConnections/imdb.service';

@Component({
  selector: 'app-movie-card-flipping',
  templateUrl: './movie-card-flipping.component.html',
  styleUrls: ['./movie-card-flipping.component.css']
})
export class MovieCardFlippingComponent implements OnInit, OnDestroy {

  private unsubscribe:Unsubscribe;
  @Input() movie: Movie;
  
  constructor(private imdbService: ImdbService, private redux:NgRedux<Store>) { }

  public ngOnInit(): void {
    this.unsubscribe = this.redux.subscribe(()=>{
      //this.movie = this.redux.getState().movie;
    });
    this.imdbService.GetMoviesById(this.movie.imdbID.toString());
    //this.favoriteMoviesService.GetMovieById(id.toString());
  }

  // public fullMovie(){
  //   this.imdbService.GetMovieById(this.movie.imdbID.toString());
  //   //this.favoriteMoviesService.GetMovieById(id.toString());
  // }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
