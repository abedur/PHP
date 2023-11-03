import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../movies/movies.component';
import { environment } from '../../environments/environment';
// import { MoviesDataService } from '../services/movies-data.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  @ViewChild('myForm')
  public movieForm!: NgForm;

  response = {
    status: environment.STATUS_OK,
    message: environment.MSG_CREATED
  }

  constructor() { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
