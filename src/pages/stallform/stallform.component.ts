import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
    templateUrl: './stallform.component.html',
    selector: 'stallform-page'
})
export class StallFormPage {

    public stallName: string;
    public team: string;

    constructor() {
        
    }

    submitForm() {
        console.log(this.stallName);
    }
}