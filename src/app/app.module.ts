import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AppPreferences} from '@ionic-native/app-preferences';
import {Device} from '@ionic-native/device';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {RegistrationPage} from '../pages/registration/registration';
import {Splash} from '../pages/splash/splash';
import {StallFormPage} from '../pages/stallform/stallform.component';
import {DevConConfig} from '../config/DevConConfig';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RegistrationPage,
        Splash,
        StallFormPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RegistrationPage,
        Splash,
        StallFormPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppPreferences,
        Device,
        Splash,
        {
            provide: 'APP_CONFIG',
            useValue: DevConConfig
        }, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})
export class AppModule {
}
