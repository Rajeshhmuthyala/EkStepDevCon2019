import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StallSelectionPage } from './stall-selection';

@NgModule({
  declarations: [
    StallSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(StallSelectionPage),
  ],
})
export class StallSelectionPageModule {}
