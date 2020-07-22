import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImdbComponent } from '../components/data-elements/Imdb/imdb.component';
import { FavoritesComponent } from '../components/data-elements/favorites/favorites.component';
import { LoginGuardService } from '../services/login-guard.service';
import { MovieDetailsComponent } from '../components/data-elements/movie-details/movie-details.component';

const routes: Routes = [
  { path: "imdb", component: ImdbComponent },
  { path: "favorites",canActivate: [LoginGuardService], component: FavoritesComponent },
  { path: "movieDetails/:id", canActivate: [LoginGuardService], component: MovieDetailsComponent },
  { path: '', redirectTo: "imdb", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
