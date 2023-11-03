import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from '../movies/movies.component';
import { MoviesDataService } from '../services/movies-data.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {
  movie!: Movie;

  message: string = "";
  errorMessage: string = "";

  constructor(private moviesService: MoviesDataService, private route: ActivatedRoute) {
    this.movie = new Movie("", "", 0, 0);

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    if (this.route.snapshot.params['id']) {
      this.moviesService.getMovieById(this.route.snapshot.params['id']).subscribe((returnMovie) => this.movie = returnMovie);
    }
  }
  @ViewChild('movieForm')
  movieForm!: NgForm;


  submitForm(movieForm: NgForm) {
    //if ID present, Update
    if (this.route.snapshot.params['id']) {
      console.log(movieForm.value);
      this.moviesService.updateMovieById(this.route.snapshot.params['id'], movieForm.value).subscribe({
        next: (returnMovie) => {
          this.movie = returnMovie;
          this.message = returnMovie.title + " " + environment.MSG_UPDATE_SUCCESS;
        },
        error: (err) => {
          this.errorMessage = environment.MSG_UPDATE_FAILD + " :" + err.statusText;
        }
      });
    }// Create
    else {
      this.moviesService.createMovie(movieForm.value).subscribe(
        {
          next: (addedMovie) => {
            this.movie = addedMovie;
            this.message = environment.MSG_ADDED_SCCESSFULLY;
          },
          error: (err) => {
            console.log(err.headers);
            this.errorMessage = environment.MSG_CREATE_FAILD + " :" + err.statusText;
          }
        });
    }
  }
}
