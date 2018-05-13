import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseinfolistPage } from './houseinfolist';

@NgModule({
  declarations: [
    HouseinfolistPage,
  ],
  imports: [
    IonicPageModule.forChild(HouseinfolistPage),
  ],
})
export class HouseinfolistPageModule {}
