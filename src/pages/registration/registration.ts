import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Device } from '@ionic-native/device';
import { PreferenceKey } from '../../app/app.constant';

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
    'ILIMI','Lollypop','MantraLabs','OPTIT','PosteroTech','Qualitrix','Tarento','TEKDI','Tibil','TurtleBowl','Zool'];
    this.guestRegistrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      org: ['', Validators.required]
    });
  }

  register(){
    const name = this.guestRegistrationForm.value.name;
    const org = this.guestRegistrationForm.value.org;
    const uuid = this.device.uuid;
    this.appPreference.store(PreferenceKey.DEVICE_ID, uuid);
    this.navCtrl.push(HomePage, {
      name: name,
      org: org
    })
  }


}
