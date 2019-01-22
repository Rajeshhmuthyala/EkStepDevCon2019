import {Component, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppPreferences} from '@ionic-native/app-preferences';
import {AppConfig} from '../../config/AppConfig';
import {UserService} from '../../services/user/user.service';
import {CreateUserProfileResponse} from '../../services/user/response';
import {PreferenceKey} from '../../config/constants';
import {TabsPage} from '../tabs/tabs';
import {StallQRScanPage} from '../stall-qr-scan/stall-qr-scan.component';
import {TelemetryService} from '../../services/telemetry/telemetry-services';
import {Telemetry_IDs} from '../../services/telemetry/base-telemetry';

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
            id: "open-saber.registry.create",
            request: {
                 Visitor: {
                     name: this.guestRegistrationForm.get('name').value,
                     org: this.guestRegistrationForm.get('org').value,
                     nCoinsGiven: 100
                 }
             }
        };
        this.userService.createUser(createUser)
        .then(async (createUserResponse: CreateUserProfileResponse) => {
            await this.appPreference.store(PreferenceKey.USER_CODE, createUserResponse.userCode);
        }).then(() => {
            return this.navCtrl.setRoot(TabsPage);
        }).then(async () => {
            return this.telemetryService.generateRegisterTelemetry({
                eid: Telemetry_IDs.DC_REGISTER,
                visitorId: await this.appPreference.fetch(PreferenceKey.USER_CODE),
                visitorName: '',
                edata: {}
            });
        })
    }

    onClickToNavigateToStallForm() {
        this.formCount++;
        if (this.formCount === 5) {
            clearTimeout(this.resetCountTimer);
            this.resetCountTimer = undefined;
            this.formCount = 0;
            alert('moving to form page!');
            this.navCtrl.push(StallQRScanPage, {});
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
