import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {orgList: Array<any> = [];
  guestRegistrationForm: FormGroup;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) {
    this.orgList = ['EkStep', 'BeyondSquare', 'Compassites', 'FrameWirk', 'Funtoot', 'GWL',
    'ILIMI','Lollypop','MantraLabs','OPTIT','PosteroTech','Qualitrix','Tarento','TEKDI','Tibil','TurtleBowl','Zool'];
    this.guestRegistrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      org: ['', Validators.required]
    });
  }

  // register(){
  //   const name = this.guestRegistrationForm.value.name;
  //   const org = this.guestRegistrationForm.value.org;
  //   this.navCtrl.push(ProfilePage, {
  //     name: name,
  //     org: org
  //   })
  // }


}
