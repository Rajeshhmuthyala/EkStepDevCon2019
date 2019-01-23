import {Component, ElementRef, ViewChild, Inject} from '@angular/core';;
import {NavController, Platform, ViewController, ToastController, ToastOptions} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {ProfilePage} from '../profile/profile';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../config/constants';
import {UserService} from '../../services/user/user.service';
import {GetUserResponse} from '../../services/user/response';
@Component({
    templateUrl: './stall-qr-scan.component.html',
    selector: 'stall-qr-scan-page'
})
export class StallQRScanPage {

    @ViewChild('content', {read: ElementRef})
    private content: ElementRef;
    public userResponse?: GetUserResponse;
    private backButtonFunc:  any;
    constructor(private qrScanner: QRScanner,
                private platform: Platform,
                private navCtrl: NavController,
                private viewCtrl:ViewController,
                private toastCtrl:ToastController,
                private appPreference: AppPreferences,
                @Inject('USER_SERVICE') private userService: UserService) {
        this.QRScanner();
    }

    ionViewDidEnter() {
        this.fetchUserDetails('');
    }

    QRScanner() {
        console.log('coming inside');
        // if (this.platform.is('core') || this.platform.is('mobileweb')) {
        //     return this.navCtrl.push(ProfilePage, {userCode: 'SAMPLE_USER_CODE'});
        // }
        this.handleBackButton()
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.hideContentBG();
                    this.qrScanner.show();
                    console.log('doing');
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log('this should be different page');
                        console.log(text);
                        this.fetchUserDetails(text);
                        // this.navCtrl.push(ProfilePage, {userCode: text});
                        // Should be different page, flow changed

                        // this.qrScanner.destroy();
                        // this.qrScanner.hide();
                        scanSub.unsubscribe();
                        this.showContentBG();
                    });

                } else {
                    console.log('denied');
                }
            })
            .catch((e: any) => console.log('Error is', e));

    }
    private async fetchUserDetails(text) {
        // const userCode: string = await this.appPreference.fetch(PreferenceKey.USER_CODE);

        this.userResponse = await this.userService.getUser({code: text});
        console.log(this.userResponse.Visitor.name);
        this.showToast(this.userResponse.Visitor.name);
    }
    private hideContentBG() {
        (this.content.nativeElement as HTMLElement).setAttribute('hidden', 'true')
    }

    private showContentBG() {
        (this.content.nativeElement as HTMLElement).removeAttribute('hidden');
    }
    handleBackButton() {
        this.backButtonFunc = this.platform.registerBackButtonAction(() => {
            this.showContentBG();
            // this.qrScanner.destroy();
             this.viewCtrl.dismiss();
            this.backButtonFunc();
        }, 10);
    }
    showToast(msg: string) {
        const toastOptions: ToastOptions = {
          message: msg,
          duration: 3000,
          position: 'middle',
          // cssClass: cssToast ? cssToast : ‘’
        };
     
        const toast = this.toastCtrl.create(toastOptions);
        toast.present();
      }
}