import {Component} from '@angular/core';
import {HomePage} from '../home/home';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    public homePage = HomePage;

    constructor() {
    }

    ionViewDidLoad() {
    }
}
