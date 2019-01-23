import {Component, Inject, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../config/constants';
import {GetUserPrfileRequest} from '../../services/user/requests';
import {User} from '../../services/user/User';
import {UserService} from '../../services/user/user.service';
import {StallNamePage} from '../stall-name/stall-name';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    name: string;
    org: string;
    segmentType = "first";

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
        const createUserResponse: GetUserPrfileRequest = await this.appPreference.fetch(PreferenceKey.USER_CODE);

        const user: User = await this.userService.getUser(createUserResponse);

        this.zone.run(() => {
            this.name = user.userName;
            this.org = user.orgName;
        });

        this.name = user.userName;
        this.org = user.orgName;
    }

    stallNameCard() {
        this.navCtrl.push(StallNamePage);
    }

}
