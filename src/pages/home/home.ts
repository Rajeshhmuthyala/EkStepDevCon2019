import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { PreferenceKey } from '../../app/app.constant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string;
  org : string;
  qrcode: string;

  constructor(
    private navCtrl: NavController,
    private appPreference: AppPreferences
  ) { }

  ionViewWillEnter() {
    this.appPreference.fetch(PreferenceKey.USER_NAME).then( val => {
      this.name = val;
    });
    this.appPreference.fetch(PreferenceKey.ORGANISATION).then( val => {
      this.org = val;
    });
    this.appPreference.fetch(PreferenceKey.QRCODE).then( val => {
      this.qrcode = val;
    })

  }

}
