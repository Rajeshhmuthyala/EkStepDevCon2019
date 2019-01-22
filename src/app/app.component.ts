import {Component, OnInit} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {RegistrationPage} from '../pages/registration/registration';
import {PreferenceKey} from '../config/constants';
import {AppPreferences} from '@ionic-native/app-preferences';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {
    rootPage: any = RegistrationPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private appPreference: AppPreferences,
        public splashScreen: SplashScreen,
    ) {
    }

    public async ngOnInit() {
        return this.platform.ready().then(async () => {
            this.splashScreen.hide();

            this.statusBar.styleDefault();

            if (await this.isAlreadyRegistered()) {
                this.rootPage = TabsPage;
            } else {
                this.rootPage = RegistrationPage;
            }
        });
    }

    private async isAlreadyRegistered(): Promise<string | undefined> {
        return this.appPreference.fetch(PreferenceKey.USER_CODE);
    }
}

