import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/movies.component';
import { MoviesDataService } from '../services/movies-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from '../actors/actors.component';
import { ActorsDataService } from '../services/actors-data.service';
import { AuthDataService } from '../services/auth-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  get isLoggedIn() { return this.authService.isLoggedIn; }

  message: string = "";
  errorMessage: string = "";

  movie!: Movie;
  actors: Actor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesDataService,
    private actorService: ActorsDataService,
    private authService: AuthDataService) {
    this.movie = new Movie("", "", 0, 0);
  }

  ngOnInit(): void {
    const movieId: string = this.route.snapshot.params['id'];

    this.moviesService.getMovieById(movieId).subscribe(returnedMovie => this.movie = returnedMovie);
    this.actorService.getActorsByMovieId(movieId).subscribe(returnedActors => {
      this.actors = returnedActors;

    });
  }

  doMovieEdit(id: string): void {
    console.log(id);
    this.router.navigate(['update/' + id]);
  }

  addActor(movieId: string) {
    this.router.navigate(['movie/' + movieId + '/actor']);
  }
  deleteActor(actorId: string) {
    const movieId: string = this.route.snapshot.params['id'];
    this.actorService.deleteActorByMovieAndActorId(movieId, actorId).subscribe({
      next: (deletedMovie) => {
        this.ngOnInit();
        this.message = environment.MSG_DELETE_SUCCESS;
      },
      error: (err) => {
        this.errorMessage = environment.MSG_DELETE_FAIL + ":" + err.statusText;
      }
    });

  }
}
