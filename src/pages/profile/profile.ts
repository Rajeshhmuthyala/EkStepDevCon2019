import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    userCode: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.userCode = this.navParams.get('userCode');
        console.log(this.userCode);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage', this.userCode);
    }
}
