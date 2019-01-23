import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Device} from '@ionic-native/device';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {RegistrationPage} from '../pages/registration/registration';
import {StallQRScanPage} from '../pages/stall-qr-scan/stall-qr-scan.component';
import {DevConConfig} from '../config/DevConConfig';
import {UserServiceMock} from '../services/user/user-service-mock';
import {ProfilePage} from '../pages/profile/profile';
import {QRScanner} from '@ionic-native/qr-scanner';
import {AppPreferences} from '@ionic-native/app-preferences';
import {AppPreferencesMock} from '../services/app-preferences/app-preferences-mock';
import {TabsPage} from '../pages/tabs/tabs';
import {TextToSpeechService} from '../services/text-to-speech';
import {Floor1Component} from '../components/floor-plans/floor-1/floor-1.component';
import { Floor2Component } from '../components/floor-plans/floor-2/floor-2.component';
import {TelemetryServiceMock} from '../services/telemetry/telemetry-service-mock';
import { Ionic2RatingModule } from 'ionic2-rating';
import {StallNamePage} from '../pages/stall-name/stall-name';
import {CustomSplashComponent} from '../pages/custom-splash/custom-splash.component';
import {LottieAnimationViewModule} from 'ng-lottie';
import { Floor3Component } from '../components/floor-plans/floor-3/floor-3.component';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RegistrationPage,
        StallQRScanPage,
        ProfilePage,
        TabsPage,
        Floor1Component,
        Floor2Component,
        Floor3Component,
        CustomSplashComponent,
        StallNamePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        LottieAnimationViewModule.forRoot(),
        Ionic2RatingModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        CustomSplashComponent,
        MyApp,
        HomePage,
        RegistrationPage,
        StallQRScanPage,
        ProfilePage,
        TabsPage,
        StallNamePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Device,
         QRScanner,
        TextToSpeech,
        TextToSpeechService,
        {
            provide: 'TELEMETRY_SERVICE',
            useClass: TelemetryServiceMock
        }, {
            provide: AppPreferences,
            useClass: AppPreferencesMock
        }, {
            provide: 'USER_SERVICE',
            useClass: UserServiceMock
        }, {
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
