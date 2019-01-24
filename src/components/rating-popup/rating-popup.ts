import {Component, Inject} from '@angular/core';
import {Loading, LoadingController, NavParams, ViewController} from 'ionic-angular';
import {Idea} from '../../services/stall/Idea';
import {StallService} from '../../services/stall/stall-service';
import {TelemetryService} from '../../services/telemetry/telemetry-services';
import {Stall} from '../../services/stall/Stall';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the RatingPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'rating-popup',
    templateUrl: 'rating-popup.html'
})
export class RatingPopupComponent {

    public feedbackForm: FormGroup;

    private selectedIdea: Idea;
    private selectedStall: Stall;

    constructor(@Inject('STALL_SERVICE') private stallService: StallService,
                @Inject('TELEMETRY_SERVICE') private telemetryService: TelemetryService,
                private navParams: NavParams,
                private viewCtrl: ViewController,
                private loadingCtrl: LoadingController) {
        this.feedbackForm = new FormGroup({
            rating: new FormControl(0, [Validators.required, Validators.min(1)]),
            comment: new FormControl(''),
        })
    }

    ionViewDidLoad() {
        this.selectedIdea = this.navParams.data['selectedIdea'];
        this.selectedStall = this.navParams.data['selectedStall'];
    }

    public onCancelClick() {
        this.viewCtrl.dismiss();
    }

    public onSubmit() {
        const loader = this.getLoader();

        this.stallService.giveFeedbackIdea({
            stallCode: this.selectedStall.code,
            ideaCode: this.selectedIdea.code,
            details: {
                stallName: this.selectedStall.name,
                ideaName: this.selectedIdea.name,
                desc: this.selectedIdea.description,
                rating: this.feedbackForm.get('rating').value,
                comment: this.feedbackForm.get('comment').value
            }
        }).then(async () => {
            await this.telemetryService.generateFeedbackTelemetry({
                dimensions: {
                    stallId: this.selectedStall.code,
                    stallName: this.selectedStall.name,
                    ideaId: this.selectedIdea.code,
                    ideaName: this.selectedIdea.name,
                },
                edata: {
                    rating: this.feedbackForm.get('rating').value,
                    comment: this.feedbackForm.get('comment').value
                }
            })
        }).then(() => {
            this.onCancelClick();
            loader.dismiss();
        }).catch(() => {
            this.feedbackForm.reset({
                rating: 0,
                comment: ''
            });
            loader.dismiss();
        })
    }

    private getLoader(): Loading {
        return this.loadingCtrl.create({
            duration: 30000,
            spinner: 'crescent'
        });
    }

}
