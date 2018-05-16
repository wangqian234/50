import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentsalePage } from './rentsale';

@NgModule({
  declarations: [
    RentsalePage,
  ],
  imports: [
    IonicPageModule.forChild(RentsalePage),
  ],
})
export class RentsalePageModule {}
