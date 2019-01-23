import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserIdeasPage } from './user-ideas';

@NgModule({
  declarations: [
    UserIdeasPage,
  ],
  imports: [
    IonicPageModule.forChild(UserIdeasPage),
  ],
})
export class UserIdeasPageModule {}
