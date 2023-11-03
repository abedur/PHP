import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Movie } from '../movies/movies.component';
import { environment } from '../../environments/environment';
import { AuthDataService } from './auth-data.service';


@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  private baseUrl: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  // public getMovies(offset: number, count: number): Observable<Movie[]> {
  //   const url: string = this.baseUrl + "movie?offset=" + offset + "&count=" + count;
  //   return this.http.get<Movie[]>(url);
  // }
  public getMovies(offset: number, count: number, searchString: string): Observable<Movie[]> {
    const url: string = this.baseUrl + "movie?offset=" + offset + "&count=" + count + "&search=" + searchString;
    console.log("URL:", url);

    return this.http.get<Movie[]>(url);
  }


  public getNumberOfMoviesRecord(searchString: string): Observable<number> {
    const url: string = this.baseUrl + 'movie/count?search=' + searchString;
    return this.http.get<number>(url);
  }

  public deleteMovie(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "movie/" + id;
    return this.http.delete<Movie>(url);
  }
  public getMovieById(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "movie/" + id;
    return this.http.get<Movie>(url);
  }
  public updateMovieById(id: string, movieData: Movie): Observable<Movie> {
    const url: string = this.baseUrl + "movie/" + id;
    return this.http.patch<Movie>(url, movieData);
  }

  public createMovie(movieData: Movie): Observable<Movie> {
    const url: string = this.baseUrl + "movie"
    return this.http.post<Movie>(url, movieData);
  }
  public searchMovies(title: string): Observable<Movie[]> {
    console.log();

    const url: string = this.baseUrl + "movie/search";
    return this.http.post<Movie[]>(url, { 'title': title });
  }

}
