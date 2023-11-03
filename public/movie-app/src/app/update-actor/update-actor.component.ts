import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../movies/movies.component';
import { MoviesDataService } from '../services/movies-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Actor } from '../actors/actors.component';
import { ActorsDataService } from '../services/actors-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-actor',
  templateUrl: './update-actor.component.html',
  styleUrls: ['./update-actor.component.css']
})
export class UpdateActorComponent implements OnInit {
  movie!: Movie;
  actor!: Actor;
  message: string = "";
  errorMessage: string = "";


  @ViewChild('actorUpdate')
  actorUpdate!: NgForm;


  constructor(
    private moviesService: MoviesDataService,
    private actorsService: ActorsDataService,
    private router: Router,
    private route: ActivatedRoute) {
    this.movie = new Movie("", "", 0, 0);
    this.actor = new Actor("", "", 0);
  }

  ngOnInit(): void {
    const movieId: string = this.route.snapshot.params['movieId'];
    console.log(movieId);
    this.moviesService.getMovieById(movieId).subscribe((returnMovie) => this.movie = returnMovie);

    if (this.route.snapshot.params['id']) {
      this.actorsService.getActorByMovieAndActorId(movieId, this.route.snapshot.params['id']).subscribe((returnedActor) => this.actor = returnedActor);
    }
  }

  doSubmit(actorForm: NgForm): void {
    const movieId: string = this.route.snapshot.params['movieId'];
    console.log(actorForm.value);

    if (this.route.snapshot.params['id']) {
      console.log("Inside Update");

      this.actorsService.updateActorByMovieAndActorId(movieId, this.route.snapshot.params['id'], actorForm.value).subscribe({
        next: (updatedActor) => {
          this.message = environment.MSG_UPDATE_SUCCESS;
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = environment.MSG_ACTOR_INSERT_FAIL + ":" + err.statusText;
        }
      });

    } else {
      if (actorForm.value["actor"]) {
        this.actorsService.addActor(movieId, actorForm.value).subscribe(
          {
            next: (addedActor) => {
              //this.actor = addedActor;
              if (addedActor._id) this.message = actorForm.value.actor + environment.MSG_ADDED_SCCESSFULLY;
              this.router.navigate(['movie/' + movieId]);
            },
            error: (err) => {
              this.errorMessage = environment.MSG_CREATE_FAILD + " :" + err.statusText;
            }
          });
      }
    }
  }
}
