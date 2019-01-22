import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {ProfilePage} from '../profile/profile';

@Component({
    templateUrl: './stall-qr-scan.component.html',
    selector: 'stall-qr-scan-page'
})
export class StallQRScanPage {

    @ViewChild('content', {read: ElementRef})
    private content: ElementRef;

    constructor(private qrScanner: QRScanner,
                private platform: Platform,
                private navCtrl: NavController) {
        this.QRScanner();
    }


    QRScanner() {
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            return this.navCtrl.push(ProfilePage, {userCode: 'SAMPLE_USER_CODE'});
        }

        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.hideContentBG();
                    this.qrScanner.show();
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {

                        // this.navCtrl.push(ProfilePage, {userCode: text});
                        // Should be different page, flow changed

                        this.qrScanner.destroy();
                        this.qrScanner.hide();
                        scanSub.unsubscribe();
                        this.showContentBG();
                    });

                } else {
                    console.log('denied');
                }
            })
            .catch((e: any) => console.log('Error is', e));

    }

    private hideContentBG() {
        (this.content.nativeElement as HTMLElement).setAttribute('hidden', 'true')
    }

    private showContentBG() {
        (this.content.nativeElement as HTMLElement).removeAttribute('hidden');
    }
}