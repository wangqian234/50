import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BigsalePage } from './bigsale';

@NgModule({
  declarations: [
    BigsalePage,
  ],
  imports: [
    IonicPageModule.forChild(BigsalePage),
  ],
})
export class BigsalePageModule {}
