import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Platform, Content, ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { TextToSpeechService } from "../../services/text-to-speech";

@Component({
  templateUrl: './stallform.component.html',
  selector: 'stallform-page'
})
export class StallFormPage {

  public stallName: string;
  public team: string;
  num: string;
  public speed: string;
  @ViewChild('content', {read: ElementRef})
private content: ElementRef;
private backButtonFunc: any;
  constructor(private qrScanner: QRScanner, private platform: Platform, private navCtrl: NavController,
     private viewCtrl: ViewController, private tts: TextToSpeechService) {
    this.QRScanner();
  }

  submitForm() {
    this.tts.speakText(this.stallName);
}
  QRScanner() {
    // this.handleBackButton();
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.hideContentBG();
          this.qrScanner.show();
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.navCtrl.push(ProfilePage, {text});
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

  // style="background: none transparent !important;"

  private hideContentBG() {
    (this.content.nativeElement as HTMLElement).setAttribute('hidden', 'true')
  }

  private showContentBG() {
    (this.content.nativeElement as HTMLElement).removeAttribute('hidden');
  }

  handleBackButton() {
    this.backButtonFunc = this.platform.registerBackButtonAction(() => {
      this.showContentBG();
      this.qrScanner.destroy();
      this.backButtonFunc();
    }, 10);
  }
}