import { Component, OnInit } from '@angular/core';
import { Actor } from '../actors/actors.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsDataService } from '../services/actors-data.service';
import { AuthDataService } from '../services/auth-data.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  get isLoggedIn() { return this.authService.isLoggedIn; }

  actor: Actor = new Actor("", "", 0);
  constructor(
    private route: ActivatedRoute,
    private actorsService: ActorsDataService,
    private authService: AuthDataService,
    private router: Router) { }

  ngOnInit(): void {

    const movieId = this.route.snapshot.params['movieId'];
    const actorId = this.route.snapshot.params['id'];
    console.log("Movie:" + movieId + " Actor:" + actorId);

    this.actorsService.getActorByMovieAndActorId(movieId, actorId).subscribe(returnActor => this.actor = returnActor);
  }

  goToEdit(): void {
    const movieId = this.route.snapshot.params['movieId'];
    const actorId = this.route.snapshot.params['id'];
    //    console.log("Movie:" + movieId + " Actor:" + actorId);
    this.router.navigate(['movie/' + movieId + '/actor/' + actorId + "/update"]);
  }
  deleteActor(): void {
    const movieId = this.route.snapshot.params['movieId'];
    const actorId = this.route.snapshot.params['id'];
    console.log("Movie:" + movieId + " Actor:" + actorId);
    this.actorsService.deleteActorByMovieAndActorId(movieId, actorId).subscribe((res) => {
      //console.log("Response:", res);
      this.router.navigate(['movie/' + movieId]);
    });
  }

}
