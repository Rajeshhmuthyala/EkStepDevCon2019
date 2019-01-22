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
import {StallFormPage} from '../pages/stallform/stallform.component';
import {DevConConfig} from '../config/DevConConfig';
import {UserServiceMock} from '../services/user/user-service-mock';
import {ProfilePage} from '../pages/profile/profile';
//import {StallNamePage} from '../pages/stall-name/stall-name';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RegistrationPage,
        StallFormPage,
        ProfilePage,
       // StallNamePage
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
        StallFormPage,
        ProfilePage,
     //   StallNamePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppPreferences,
        Device,
        {
            provide: 'USER_SERVICE',
            useClass: UserServiceMock
        },
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
