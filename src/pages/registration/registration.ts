import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Device } from '@ionic-native/device';
import { PreferenceKey } from '../../app/app.constant';

declare let cordova;

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {orgList: Array<any> = [];
  guestRegistrationForm: FormGroup;

  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private appPreference: AppPreferences,
    private device: Device
    ) {
    this.orgList = ['EkStep', 'BeyondSquare', 'Compassites', 'FrameWirk', 'Funtoot', 'GWL',
    'ILIMI','Lollypop','MantraLabs','OPTIT','PosteroTech','Qualitrix','Tarento','TEKDI','Tibil','TurtleBowl','Zool', 'Other'];
    this.guestRegistrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      org: ['', Validators.required]
    });
  }

  register(){
    const name = this.guestRegistrationForm.value.name;
    const org = this.guestRegistrationForm.value.org;
    const uuid = this.device.uuid;
    this.generateQRCode(uuid, name, org);
    this.appPreference.store(PreferenceKey.DEVICE_ID, uuid);
    this.appPreference.store(PreferenceKey.USER_NAME, name);
    this.appPreference.store(PreferenceKey.ORGANISATION, org);
    const index = this.navCtrl.getActive().index;
    this.navCtrl.push(HomePage).then( () => {
      this.navCtrl.remove(index);
    });
  }

  generateQRCode(uuid: any, name: string, org: string) {
    let options = {
      width: 140,
      height: 140,
      colorDark: "#000000",
      colorLight: "#ffffff",
    };
    const qrData = {
      name: name,
      org: org,
      uuid: uuid
    };
    cordova.plugins.qrcodejs.encode('TEXT_TYPE', JSON.stringify(qrData), (base64EncodedQRImage) => {
        console.info('QRCodeJS response is ' + base64EncodedQRImage);
        this.appPreference.store(PreferenceKey.QRCODE, base64EncodedQRImage);
    }, (err) => {
        console.error('QRCodeJS error is ' + JSON.stringify(err));
    }, options);
  }
}
