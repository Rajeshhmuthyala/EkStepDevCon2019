import {Component, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppPreferences} from '@ionic-native/app-preferences';
import {StallFormPage} from '../stallform/stallform.component';
import {AppConfig} from '../../config/AppConfig';
import {UserService} from '../../services/user/user.service';
import {CreateUserResponse} from '../../services/user/response';
import {PreferenceKey} from '../../app/app.constant';
import {HomePage} from '../home/home';

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
        this.userService.createUser({
            userName: this.guestRegistrationForm.get('name').value,
            orgName: this.guestRegistrationForm.get('org').value
        }).then(async (createUserResponse: CreateUserResponse) => {
            await this.appPreference.store(PreferenceKey.CREATE_USER_RESPONSE, JSON.stringify(createUserResponse));
        }).then(() => {
            const index = this.navCtrl.getActive().index;
            this.navCtrl.push(HomePage).then(() => {
                this.navCtrl.remove(index);
            });
        })
    }

    onClickToNavigateToStallForm() {
        this.formCount++;
        if (this.formCount === 10) {
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
