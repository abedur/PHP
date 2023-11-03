import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MoviesDataService } from '../services/movies-data.service';
import { AuthDataService } from '../services/auth-data.service';


export class Movie {
  #_id!: string;
  #title!: string;
  #year!: number;
  #rating!: number;
  #actors!: string[];

  get _id() { return this.#_id; }
  get title() { return this.#title; }
  get year() { return this.#year; }
  get rating() { return this.#rating; }

  set title(title: string) { this.title = title; }
  set year(year: number) { this.year = year; }
  set rating(rating: number) { this.rating = rating; }

  constructor(id: string, title: string, year: number, rating: number) {
    this.#_id = id;
    this.#title = title;
    this.#year = year;
    this.#rating = rating;
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})



export class MoviesComponent implements OnInit {
  #searchForm!: FormGroup;
  get searchForm() { return this.#searchForm; }
  get isLoggedIn() { return this.authService.isLoggedIn; }

  movies: Movie[] = [];
  offset: number = 0;
  count: number = 5;
  totalRecord!: number;
  isOffsetZero: boolean = true;
  isOffsetMax: boolean = false;
  public searchString: string = "";

  constructor(private moviesService: MoviesDataService, private authService: AuthDataService) {
    this.#searchForm = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.moviesService.getNumberOfMoviesRecord(this.searchString).subscribe(total => { this.totalRecord = total; });
    this.moviesService.getMovies(this.offset, this.count, this.searchString).subscribe(movies => this.movies = movies);
    console.log("Total Records:" + this.totalRecord);
  }

  onMovieDeleteClick(id: string): void {
    console.log("Clicked", id);

    this.moviesService.deleteMovie(id).subscribe({
      next: (deletedMovie) => {
        console.log('delete movie ', deletedMovie);
        this.moviesService.getNumberOfMoviesRecord(this.searchString).subscribe(total => { this.totalRecord = total; });
        this.moviesService.getMovies(this.offset, this.count, this.searchString).subscribe(movies => this.movies = movies);
      },
      'error': (err) => {
        console.log('Error', err);
      }
    });

  }

  searchMovie(searchStr: string): void {
    this.searchString = searchStr;
    console.log("Search String:" + searchStr);
    if (searchStr) {
      this.moviesService.getNumberOfMoviesRecord(searchStr).subscribe(total => { this.totalRecord = total; });
      this.moviesService.searchMovies(searchStr).subscribe(returnMovies => this.movies = returnMovies);
      console.log("Total Records:" + this.totalRecord);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.searchString === '') {
      console.log("yess");
      this.searchString = '';
      this.ngOnInit();
    }
  }

  onSubmit(): void {
    console.log("Form:", this.#searchForm.invalid);
    this.moviesService.getNumberOfMoviesRecord(this.searchString).subscribe(total => { this.totalRecord = total; });
    this.moviesService.searchMovies(this.#searchForm.value.title).subscribe(returnMovies => this.movies = returnMovies);

  }

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.count;
    }
    if (this.offset <= 0) {
      this.offset = 0;
      this.isOffsetZero = true;

    }
    this.isOffsetMax = false;
    this.ngOnInit();
  }

  next(): void {
    this.offset = this.offset + this.count;
    if (this.offset >= this.totalRecord) {
      this.offset = this.totalRecord;
      this.isOffsetMax = true;
    }

    if (this.totalRecord - this.offset <= 5) this.isOffsetMax = true;

    this.isOffsetZero = false;
    this.ngOnInit();
  }

}
