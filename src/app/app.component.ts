import {Component, OnInit} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {RegistrationPage} from '../pages/registration/registration';
import {PreferenceKey} from './app.constant';
import {AppPreferences} from '@ionic-native/app-preferences';
import {Device} from '@ionic-native/device';
import {HomePage} from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {
    rootPage: any = RegistrationPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private appPreference: AppPreferences,
        private device: Device
    ) {
    }

    public async ngOnInit() {
        return this.platform.ready().then(async () => {
            this.statusBar.styleDefault();

            if (await this.isAlreadyRegistered()) {
                this.rootPage = HomePage;
            } else {
                this.rootPage = RegistrationPage;
            }
        });
    }

    private async isAlreadyRegistered(): Promise<string | undefined> {
        return this.appPreference.fetch(PreferenceKey.CREATE_USER_RESPONSE).then(val => {
            if (val) {
                return Promise.resolve(JSON.parse(val));
            }
        });
    }
}

