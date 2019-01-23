import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StallService} from '../../services/stall/stall-service';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../config/constants';
import {GetIdeasResponse} from '../../services/stall/responses';
import {Stall} from '../../services/stall/Stall';
import { timestamp } from 'rxjs/operators';
/**
 * Generated class for the StallNamePage pa
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stall-list',
  templateUrl: 'stall-list.html',
})
export class StallListPage {
  stalls = [];
  ideasResponse: any;

  storeOptions = {
    title: 'Select Store',
    cssClass: 'select-box'
  };

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      @Inject('STALL_SERVICE') private stallService: StallService) {
        this.onStallSelect('STA1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StallListPage');
    this.fetchStallDetails();
  }
  private async fetchStallDetails() {
    this.stalls = await this.stallService.getStalls({ Stall: {} });
    console.log(this.stalls);
  }

  public onStallSelect(stallCode: string) {
    console.log('hi', stallCode);
    this.stallService.getIdeas({code: stallCode}).then((data) => {
      this.ideasResponse = data;
    });

  }

  public onModelChange(event) {
    console.log(event);
  }
}
