import { PopoverController } from 'ionic-angular';
import {Component, Inject} from '@angular/core';
import {StallService} from '../../services/stall/stall-service';
import {BoughtIdeas} from '../../services/stall/BoughtIdeas';
import {GetIdeasResponse} from '../../services/stall/responses';
import {Idea} from '../../services/stall/Idea';
import {Stall} from '../../services/stall/Stall';
import {TelemetryService} from '../../services/telemetry/telemetry-services';
import { RatingPopupComponent } from '../../components/rating-popup/rating-popup';
import {LoadingController} from 'ionic-angular';

@Component({
    selector: 'page-stall-list',
    templateUrl: 'stall-list.html',
})
export class StallListPage {
    stalls = [];
    ideasResponse?: GetIdeasResponse;
    storeOptions = {
        title: 'Select Store',
        cssClass: 'select-box'
    };
    private currentStall: Stall;
    private boughtIdeas: BoughtIdeas = {};

    constructor(
        @Inject('STALL_SERVICE') private stallService: StallService,
        @Inject('TELEMETRY_SERVICE') private telemetryService: TelemetryService,
        private popCtrl  : PopoverController,
        private loadingCtrl: LoadingController,) {
    }

    ionViewDidLoad() {
        this.fetchStalls().then(() => {
            this.onStallSelect(this.stalls[0]);
        });
        this.fetchBoughtIdeas();
    }

    public isIdeaBought(ideaCode: string): boolean {
        const key = `${this.currentStall.code}-${ideaCode}`;

        return this.boughtIdeas[key] && this.boughtIdeas[key].purchased;
    }

    public onBuyIdea(idea: Idea) {
        this.stallService.buyIdea({
            stallCode: this.currentStall.code,
            ideaCode: idea.code,
            details: {
                stallName: this.currentStall.name,
                ideaName: idea.name,
                desc: idea.description
            }
        }).then(async () => {
            await this.telemetryService.generateBuyIdeaTelemetry({
                dimensions: {
                    stallId: this.currentStall.code,
                    stallName: this.currentStall.name,
                    ideaId: idea.code,
                    ideaName: idea.name,
                },
                edata: {}
            })
        }).then(() => {
            this.fetchBoughtIdeas();
        });
    }

    public onStallSelect(stall: Stall) {
        if(stall.code !== "STA1"){
            const loader = this.getLoader();
            loader.present();
            this.stallService.getIdeas({code: stall.code}).then((data) => {
                this.currentStall = stall;
                this.ideasResponse = data;
            });
            loader.dismiss(); 
        } else {
            this.stallService.getIdeas({code: stall.code}).then((data) => {
                this.currentStall = stall;
                this.ideasResponse = data;
            });

        }
     
    }

    private async fetchStalls() {
        const loader = this.getLoader();
        loader.present();
        this.stalls = await this.stallService.getStalls({Stall: {}});
        loader.dismiss();
    }

    private async fetchBoughtIdeas() {
        this.boughtIdeas = await this.stallService.getBoughtIdeas();
    }
    rateContent(){
        const popUp = this.popCtrl.create(RatingPopupComponent, {
              cssClass: 'content-rating-alert'
            });
          popUp.present({
            ev: event
          });
        //   popUp.onDidDismiss(data => {
        //     if (data && data.message === 'rating.success') {
        //       this.userRating = data.rating;
        //       this.ratingComment = data.comment;
        //     }
        //   });
    }

    public onRating(idea: Idea, value: number) {
        this.stallService.giveFeedbackIdea({
            stallCode: this.currentStall.code,
            ideaCode: idea.code,
            details: {
                stallName: this.currentStall.name,
                ideaName: idea.name,
                desc: idea.description,
                rating: value,
                comment: ''
            }
        }).then(async () => {
            await this.telemetryService.generateFeedbackTelemetry({
                dimensions: {
                    stallId: this.currentStall.code,
                    stallName: this.currentStall.name,
                    ideaId: idea.code,
                    ideaName: idea.name,
                },
                edata: {
                    rating: value,
                    comment: ''
                }
            })
        });
    }
    getLoader(): any {
        return this.loadingCtrl.create({
          duration: 30000,
          spinner: 'crescent'
        });
      }
}
