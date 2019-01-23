import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StallListPage } from './stall-list';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    StallListPage,
  ],
  imports: [
    IonicPageModule.forChild(StallListPage),
    Ionic2RatingModule
  ],
})
export class StallNamePageModule {}
