import {Component, OnInit} from '@angular/core';
import {ModalController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {RegistrationPage} from '../pages/registration/registration';
import {PreferenceKey} from '../config/constants';
import {AppPreferences} from '@ionic-native/app-preferences';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {CustomSplashComponent} from '../pages/custom-splash/custom-splash.component';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {
    rootPage: any = null;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private appPreference: AppPreferences,
        private splashScreen: SplashScreen,
        private modalCtrl: ModalController
    ) {
    }

    public async ngOnInit() {
        this.displayCustomSplashModal().then(() => {
            return this.platform.ready().then(async () => {
                this.statusBar.styleDefault();

                if (await this.isAlreadyRegistered()) {
                    this.rootPage = TabsPage;
                } else {
                    this.rootPage = RegistrationPage;
                }
            });
        });
    }

    private async displayCustomSplashModal() {
        return new Promise((resolve => {
            this.splashScreen.hide();
            const splashModal = this.modalCtrl.create(CustomSplashComponent);
            splashModal.present({
                animate: false
            });

            setTimeout(() => {
                splashModal.dismiss();
                resolve()
            }, 4000);
        }));
    }

    private async isAlreadyRegistered(): Promise<string | undefined> {
        return this.appPreference.fetch(PreferenceKey.USER_CODE);
    }
}

