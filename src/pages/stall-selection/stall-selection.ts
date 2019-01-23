import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StallService} from '../../services/stall/stall-service';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../config/constants';
import {GetIdeasResponse} from '../../services/stall/responses';
import {Stall} from '../../services/stall/Stall';
import { timestamp } from 'rxjs/operators';
import { StallQRScanPage } from '../stall-qr-scan/stall-qr-scan.component';

/**
 * Generated class for the StallSelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stall-selection',
  templateUrl: 'stall-selection.html',
})
export class StallSelectionPage {

  stallForm: any;
 ideasResponse: any;
 stallcode: any;

 
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private fb: FormBuilder, @Inject('STALL_SERVICE') private stallService: StallService,
      private viewCtrl:ViewController) {
      this.initializeForm();
  }
  initializeForm() {   
    this.stallForm = this.fb.group({
      stallName: ['', Validators.required],
      stallIdea: ['', Validators.required]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StallSelectionPage');
    this.fetchStallDetails();
  }

  private async fetchStallDetails() {
    // this.stallForm = await this.stallService.getStalls({ Stall: {} });
    this.stallcode =  await this.stallService.getStalls({ Stall: {} });

    console.log(this.stallcode);
  }
 
  public onStallSelect() {
    console.log('hi', this.stallForm.value);    
    const stallCode = this.stallForm.value.stallName;
    console.log(stallCode);
    this.stallService.getIdeas({code: stallCode}).then((data) => {
      console.log(data);
      this.ideasResponse = data.Stall.ideas;
    });

}
StallSubmit(){
  this.navCtrl.push(StallQRScanPage, {});
   this.viewCtrl.dismiss();
}
}
