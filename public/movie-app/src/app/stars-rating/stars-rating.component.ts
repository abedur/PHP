import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent {
  _rating: number = 0;
  stars: number[] = [];

  @Input()
  set rating(rating: number) {
    console.log("rating", rating)
    this._rating = Math.floor(rating);
    console.log("rating", this._rating);

    this.stars = new Array<number>(this._rating);
  }
  constructor() { }

}
