import {Component, Inject} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppPreferences} from '@ionic-native/app-preferences';
import {AppConfig} from '../../config/AppConfig';
import {UserService} from '../../services/user/user.service';
import {CreateUserResponse, GetUserResponse} from '../../services/user/response';
import {PreferenceKey} from '../../config/constants';
import {TabsPage} from '../tabs/tabs';
import {StallQRScanPage} from '../stall-qr-scan/stall-qr-scan.component';
import {TelemetryService} from '../../services/telemetry/telemetry-services';
import {ProfilePage} from '../profile/profile';
import { StallSelectionPage } from '../stall-selection/stall-selection';

@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
})
export class RegistrationPage {
    guestRegistrationForm: FormGroup;

    public orgList: string[] = [];
    private formCount: number = 0;
    private resetCountTimer: any;

    constructor(private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private appPreference: AppPreferences,
                public popoverCtrl: PopoverController,
                @Inject('APP_CONFIG') private config: AppConfig,
                @Inject('USER_SERVICE') private userService: UserService,
                @Inject('TELEMETRY_SERVICE') private telemetryService: TelemetryService
    ) {
        this.orgList = this.config.orgList;
        this.guestRegistrationForm = this.formBuilder.group({
            name: ['', Validators.required],
            org: ['', Validators.required]
        });
    }

    public async register() {
        const createUser = {
            Visitor: {
                name: this.guestRegistrationForm.get('name').value,
                org: this.guestRegistrationForm.get('org').value,
             }
        };
        this.userService.createUser(createUser)
            .then(async (createUserResponse: CreateUserResponse) => {
                await this.appPreference.store(PreferenceKey.USER_CODE, createUserResponse.Visitor.code);
                await this.appPreference.store(PreferenceKey.USER_NAME, createUser.Visitor.name);
        }).then(() => {
            return this.navCtrl.setRoot(TabsPage);
        }).then(() => {
            return this.appPreference.fetch(PreferenceKey.USER_CODE)
                .then((userCode: string) => this.userService.getUser({code: userCode}))
        }).then(async (userResponse: GetUserResponse) => {
            return this.telemetryService.generateRegisterTelemetry({
                dimensions: {
                    visitorId: userResponse.Visitor.code,
                    visitorName: userResponse.Visitor.name
                },
                edata: {
                    mode: 'online'
                }
            });
        }).catch((e) => {
            console.error(e);
        })
    }

    onClickToNavigateToStallForm() {
        this.formCount++;
        if (this.formCount === 5) {
            clearTimeout(this.resetCountTimer);
            this.resetCountTimer = undefined;
            this.formCount = 0;

            const popover = this.popoverCtrl.create(ProfilePage);
            popover.present();

            popover.onDidDismiss(() => {
                this.navCtrl.push(StallSelectionPage, {});
            });
        }
        if (this.resetCountTimer) {
            clearTimeout(this.resetCountTimer);
            this.resetCountTimer = undefined;
        }
        this.resetCountTimer = setTimeout(() => {
            this.resetCountTimer = undefined;
            this.formCount = 0;
        }, 1000);
    }
}
