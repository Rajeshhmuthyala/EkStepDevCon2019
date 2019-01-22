import { Component } from "@angular/core";
import { TextToSpeechService } from "../../services/text-to-speech";

@Component({
    templateUrl: './stallform.component.html',
    selector: 'stallform-page'
})
export class StallFormPage {

    public stallName: string;
    public team: string;
    public speed: string;

    constructor(private tts: TextToSpeechService) {
        
    }

    submitForm() {
        this.tts.speakText(this.stallName);
    }
}