import { Inject } from "@angular/core";
import { TextToSpeech } from "@ionic-native/text-to-speech";

@Inject({})
export class TextToSpeechService {
    constructor(private tts: TextToSpeech) {}

    speakText(text: string, accent?: string, rate?: any) {
        this.tts.speak({
            text: text || 'Hello!',
            locale: accent || 'en-IN',
            rate: rate || 0.8
        })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
    }
}