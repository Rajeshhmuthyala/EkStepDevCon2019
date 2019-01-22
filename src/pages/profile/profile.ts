import {Component} from '@angular/core';
import {IonicPage,
    NavController,
    NavParams,
    ViewController
} from 'ionic-angular';
import { StallQRScanPage } from '../stall-qr-scan/stall-qr-scan.component';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    userCode: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController) {
        // this.userCode = this.navParams.get('userCode');
        // console.log(this.userCode);
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ProfilePage', this.userCode);
    }

    openQRScanner() {
        this.viewCtrl.dismiss();
    }
}
