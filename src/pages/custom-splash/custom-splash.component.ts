import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';

@Component({
    selector: 'custom-splash',
    templateUrl: 'custom-splash.component.html',
    styles: [`
        @keyframes fade-out {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        :host > div {
            background-color: white;
            animation-name: fade-out;
            animation-delay: 2s;
            animation-duration: 2s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            transform: translate(-50px, -50px);
        }
    `]
})
export class CustomSplashComponent {
    public dimensions: { width: number, height: number };

    public splashConfig = {
        path: 'assets/imgs/splash.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
    };


    constructor(private platform: Platform) {
    }

    public ionViewDidLoad() {
        this.getDeviceDimensions()
    }

    private getDeviceDimensions() {
        this.platform.ready().then(() => {
            this.dimensions = {
                width: this.platform.width() + 100,
                height: this.platform.height() + 100
            };
        });
    }
}