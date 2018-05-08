import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopcarPage } from './shopcar';

@NgModule({
  declarations: [
    ShopcarPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopcarPage),
  ],
})
export class ShopcarPageModule {}