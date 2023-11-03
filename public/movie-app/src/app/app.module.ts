import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';




import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { ActorsComponent } from './actors/actors.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { ActorComponent } from './actor/actor.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthDataService } from './services/auth-data.service';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { UpdateActorComponent } from './update-actor/update-actor.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { QuotePipe } from './quote.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    MovieComponent,
    ActorsComponent,
    ActorComponent,
    RegisterComponent,
    LoginComponent,
    UpdateMovieComponent,
    StarsRatingComponent,
    UpdateActorComponent,
    ProfileComponent,
    QuotePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "movies", component: MoviesComponent },
      { path: "create", component: UpdateMovieComponent },
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "profile", component: ProfileComponent },
      { path: "movie/:id", component: MovieComponent },
      { path: "movie/:movieId/actor/:id", component: ActorComponent },
      { path: "movie/:movieId/actor", component: UpdateActorComponent },
      { path: "movie/:movieId/actor/:id/update", component: UpdateActorComponent },
      { path: "update/:id", component: UpdateMovieComponent },
      { path: "**", component: ErrorPageComponent }


    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JwtHelperService },
    JwtHelperService,
    AuthDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
