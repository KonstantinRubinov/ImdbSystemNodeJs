import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { LoginGuardService } from '../services/login-guard.service';
import { FavoritesComponent } from '../components/data-elements/favorites/favorites.component';
import { ImdbComponent } from '../components/data-elements/Imdb/imdb.component';
import { MovieDetailsComponent } from '../components/data-elements/movie-details/movie-details.component';

// ng g m modules/routing --spec false --flat

const routes: Routes = [
    { path: "imdb", component: ImdbComponent },
    { path: "favorites",canActivate: [LoginGuardService], component: FavoritesComponent },
    { path: "movieDetails/:id", canActivate: [LoginGuardService], component: MovieDetailsComponent },
    { path: '', redirectTo: "imdb", pathMatch: "full" },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class RoutingModule { }
