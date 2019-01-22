import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StallFormPage } from '../stallform/stallform.component';
// import {StallNamePage} from '../stall-name/stall-name';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
profile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile = this.navParams.get('text');
    console.log(this.profile);
  }

  ionViewDidLoad() {
    // this.profile = this.navParams.get('text');
    console.log('ionViewDidLoad ProfilePage', this.profile);
  }

  Submit(){
    this.navCtrl.push(StallFormPage);
  }

}
