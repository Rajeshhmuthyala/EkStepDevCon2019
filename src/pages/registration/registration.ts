import {Component, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppPreferences} from '@ionic-native/app-preferences';
import {AppConfig} from '../../config/AppConfig';
import {UserService} from '../../services/user/user.service';
import {CreateUserProfileResponse} from '../../services/user/response';
import {PreferenceKey} from '../../config/constants';
import {ProfilePage} from '../profile/profile';
import {TabsPage} from '../tabs/tabs';

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
                @Inject('USER_SERVICE') private userService: UserService
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
        })
    }

    onClickToNavigateToStallForm() {
        this.formCount++;
        if (this.formCount === 5) {
            clearTimeout(this.resetCountTimer);
            this.resetCountTimer = undefined;
            this.formCount = 0;
            alert('moving to form page!');
            this.navCtrl.push(StallFormPage, {});
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
