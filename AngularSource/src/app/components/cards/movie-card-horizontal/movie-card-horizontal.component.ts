import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-card-horizontal',
  templateUrl: './movie-card-horizontal.component.html',
  styleUrls: ['./movie-card-horizontal.component.css']
})
export class MovieCardHorizontalComponent implements OnInit {

  @Input() movie: Movie;
  
  constructor() { }

  ngOnInit() {
  }

}
