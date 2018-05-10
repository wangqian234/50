import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupbuylistPage } from './groupbuylist';

@NgModule({
  declarations: [
    GroupbuylistPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupbuylistPage),
  ],
})
export class GroupbuyPageModule {}
