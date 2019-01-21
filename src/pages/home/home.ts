import {Component, Inject, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../app/app.constant';
import {CreateUserResponse} from '../../services/user/response';
import {User} from '../../services/user/User';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string;
  org : string;
  qrcode: string;

  constructor(
      private navCtrl: NavController,
      private appPreference: AppPreferences,
      private zone: NgZone,
      @Inject('USER_SERVICE') private userService: UserService
  ) {
  }

    ionViewDidEnter() {
        this.fetchUserDetails();
    }

    private async fetchUserDetails() {
        const createUserResponse: CreateUserResponse = await this.appPreference.fetch(PreferenceKey.CREATE_USER_RESPONSE);

        const user: User = await this.userService.getUser(createUserResponse.uuid);

        this.zone.run(() => {
            this.name = user.userName;
            this.org = user.orgName;
            this.qrcode = createUserResponse.qrCode;
        });

        this.name = user.userName;
        this.org = user.orgName;
        this.qrcode = createUserResponse.qrCode;
    }

}
