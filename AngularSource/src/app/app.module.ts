import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './modules/app-routing.module';

import { Store } from './redux/store';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { Reducer } from './redux/reducer';

import { MenuComponent } from './components/design-elements/menu/menu.component';
import { LayoutComponent } from './components/design-elements/layout/layout.component';
import { HeaderComponent } from './components/design-elements/header/header.component';
import { FooterComponent } from './components/design-elements/footer/footer.component';
import { SignUpComponent } from './components/user-elements/sign-up/sign-up.component';
import { SignInComponent } from './components/user-elements/sign-in/sign-in.component';
import { FavoritesComponent } from './components/data-elements/favorites/favorites.component';
import { ImdbComponent } from './components/data-elements/Imdb/imdb.component';
import { MovieCardVerticalComponent } from './components/cards/movie-card-vertical/movie-card-vertical.component';
import { MovieCardHorizontalComponent } from './components/cards/movie-card-horizontal/movie-card-horizontal.component';
import { MovieDetailsComponent } from './components/data-elements/movie-details/movie-details.component';
import { MovieCardFlippingComponent } from './components/cards/movie-card-flipping/movie-card-flipping.component';

@NgModule({
  declarations: [
    MenuComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    FavoritesComponent,
    ImdbComponent,
    MovieCardVerticalComponent,
    MovieCardHorizontalComponent,
    MovieDetailsComponent,
    MovieCardFlippingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [CookieService ],
  bootstrap: [LayoutComponent]
})
export class AppModule { 
  public constructor(redux:NgRedux<Store>){
    redux.configureStore(Reducer.reduce, new Store());
  }
}