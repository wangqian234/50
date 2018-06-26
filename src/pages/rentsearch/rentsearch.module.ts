import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentsearchPage } from './rentsearch';

@NgModule({
  declarations: [
    RentsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RentsearchPage),
  ],
})
export class RentsearchPageModule {}
