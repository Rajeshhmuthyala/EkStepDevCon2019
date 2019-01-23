import {Component, Inject, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../config/constants';
import {UserService} from '../../services/user/user.service';
import {StallListPage} from '../stall-list/stall-list';
import {GetUserResponse} from '../../services/user/response';

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
        const userCode: string = await this.appPreference.fetch(PreferenceKey.USER_CODE);

        const userResponse: GetUserResponse = await this.userService.getUser({code: userCode});

        this.zone.run(() => {
            this.name = userResponse.Visitor.name;
            this.org = userResponse.Visitor.org;
        });

        this.name = userResponse.Visitor.name;
        this.org = userResponse.Visitor.org;
    }

    stallNameCard() {
        this.navCtrl.push(StallListPage);
    }

}
