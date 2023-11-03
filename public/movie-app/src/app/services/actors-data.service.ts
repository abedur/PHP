import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Actor } from '../actors/actors.component'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActorsDataService {
  private baseUrl: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  public getActorsByMovieId(movieId: string): Observable<Actor[]> {
    const url: string = this.baseUrl + "actor/movie/" + movieId;
    return this.http.get<Actor[]>(url);
  }

  public getActorByMovieAndActorId(movieId: string, actorId: string): Observable<Actor> {
    const url: string = this.baseUrl + "actor/" + actorId + "/movie/" + movieId;
    return this.http.get<Actor>(url);
  }
  public addActor(movieId: string, actorData: Actor): Observable<Actor> {

    const url: string = this.baseUrl + "actor/movie/" + movieId;
    return this.http.post<Actor>(url, actorData);
  }
  public deleteActorByMovieAndActorId(movieId: string, actorId: string): Observable<Actor> {
    const url: string = this.baseUrl + "actor/" + actorId + "/movie/" + movieId;
    return this.http.delete<Actor>(url);
  }
  public updateActorByMovieAndActorId(movieId: string, actorId: string, actorData: Actor): Observable<Actor> {
    const url: string = this.baseUrl + "actor/" + actorId + "/movie/" + movieId;
    return this.http.put<Actor>(url, actorData);
  }


}
