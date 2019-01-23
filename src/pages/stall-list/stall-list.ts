import {Component, Inject} from '@angular/core';
import {StallService} from '../../services/stall/stall-service';
import {BoughtIdeas} from '../../services/stall/BoughtIdeas';
import {GetIdeasResponse} from '../../services/stall/responses';
import {Idea} from '../../services/stall/Idea';
import {Stall} from '../../services/stall/Stall';
import {TelemetryService} from '../../services/telemetry/telemetry-services';

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
        @Inject('TELEMETRY_SERVICE') private telemetryService: TelemetryService) {
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
        this.stallService.getIdeas({code: stall.code}).then((data) => {
            this.currentStall = stall;
            this.ideasResponse = data;
        });
    }

    private async fetchStalls() {
        this.stalls = await this.stallService.getStalls({Stall: {}});
    }

    private async fetchBoughtIdeas() {
        this.boughtIdeas = await this.stallService.getBoughtIdeas();
    }
}
