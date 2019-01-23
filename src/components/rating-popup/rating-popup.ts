import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the RatingPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rating-popup',
  templateUrl: 'rating-popup.html'
})
export class RatingPopupComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello RatingPopupComponent Component');
    this.text = 'Hello World';
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

}
