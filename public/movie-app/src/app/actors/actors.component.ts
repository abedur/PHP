import { Component } from '@angular/core';

export class Actor {
  #_id!: string;
  #actor!: string;
  #debut_year!: number;

  set actor(actor: string) { this.#actor = actor };
  set debut_year(debutYear: number) { this.#debut_year = debutYear };

  get _id() { return this.#_id; };
  get actor() { return this.#actor; };
  get debut_year() { return this.#debut_year; };

  constructor(id: string, actor: string, debut: number) {
    this.#_id = id;
    this.#actor = actor;
    this.#debut_year = debut;
  }
}

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent {

}
