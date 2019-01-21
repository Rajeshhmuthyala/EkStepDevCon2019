import {Component, OnInit} from '@angular/core';
import {ModalController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {RegistrationPage} from '../pages/registration/registration';
import {PreferenceKey} from './app.constant';
import {AppPreferences} from '@ionic-native/app-preferences';
import {Device} from '@ionic-native/device';
import {Splash} from '../pages/splash/splash';
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
        private device: Device,
        private modalCtrl: ModalController
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

            let splash = this.modalCtrl.create(Splash);
            return splash.present();
        });
    }

    private async isAlreadyRegistered(): Promise<string | undefined> {
        return this.appPreference.fetch(PreferenceKey.DEVICE_ID).then(val => {
            if (val === this.device.uuid) {
                return Promise.resolve(this.device.uuid);
            }
        });
    }
}

