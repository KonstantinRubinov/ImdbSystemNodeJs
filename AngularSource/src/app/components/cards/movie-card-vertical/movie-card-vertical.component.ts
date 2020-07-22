import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-card-vertical',
  templateUrl: './movie-card-vertical.component.html',
  styleUrls: ['./movie-card-vertical.component.css']
})
export class MovieCardVerticalComponent implements OnInit {

  @Input() movie: Movie;
  
  constructor() { }

  ngOnInit() {
  }

}
