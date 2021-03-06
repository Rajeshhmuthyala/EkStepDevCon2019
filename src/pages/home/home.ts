import {Component, Inject, NgZone} from '@angular/core';
import {App, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
import {AppPreferences} from '@ionic-native/app-preferences';
import {PreferenceKey} from '../../config/constants';
import {UserService} from '../../services/user/user.service';
import {StallListPage} from '../stall-list/stall-list';
import {GetUserResponse} from '../../services/user/response';
import {StallService} from '../../services/stall/stall-service';
import {AppConfig} from '../../config/AppConfig';
import {BoughtIdeas} from '../../services/stall/BoughtIdeas';
import {Subscription} from 'rxjs';

declare const cordova;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private boughtIdeas: BoughtIdeas = {};
    private boughtIdeasSubscription: Subscription;

    public userResponse?: GetUserResponse;
    public qrCodeWidth?: number;

    currentSegment = "first";

    constructor(
        private navCtrl: NavController,
        private appPreference: AppPreferences,
        private zone: NgZone,
        private app: App,
        private platform: Platform,
        private loadingCtrl: LoadingController,
        @Inject('USER_SERVICE') private userService: UserService,
        @Inject('STALL_SERVICE') private stallService: StallService,
        @Inject('APP_CONFIG') private config: AppConfig
    ) {
    }

    ionViewDidEnter() {
        this.qrCodeWidth = this.platform.width() - (this.platform.width() * 0.4);
        this.fetchUserDetails();
        this.fetchBoughtIdeas();
    }

    ionViewWillLeave() {
        this.boughtIdeasSubscription.unsubscribe();
    }

    navigateToStallListPage() {
        // this.app.getRootNav().setRoot(StallListPage);
        this.navCtrl.push(StallListPage);
    }

    private async fetchUserDetails() {
        const loader = await this.getLoader();
        await loader.present();
        const userCode: string = await this.appPreference.fetch(PreferenceKey.USER_CODE);

        this.userResponse = await this.userService.getUser({ code: userCode });

        loader.dismiss();

    }

    public getAvailableCoins(): any {
        const purchasedIdeas: number = Object.keys(this.boughtIdeas).length;
        return this.config.availableCoins - (purchasedIdeas * this.config.coinsPerIdea);
    }

    private getLoader(): Loading {
        return this.loadingCtrl.create({
            duration: 30000,
            spinner: 'crescent'
        });
    }

    private fetchBoughtIdeas() {
        this.boughtIdeasSubscription = this.stallService.getBoughtIdeas().subscribe((emit) => {
            this.boughtIdeas = emit;
        });
    }
}
