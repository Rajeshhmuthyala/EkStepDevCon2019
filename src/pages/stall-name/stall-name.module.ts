import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StallNamePage } from './stall-name';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    StallNamePage,
  ],
  imports: [
    IonicPageModule.forChild(StallNamePage),
    Ionic2RatingModule
  ],
})
export class StallNamePageModule {}
