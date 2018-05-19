import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopinfoPage } from './shopinfo';

@NgModule({
  declarations: [
    ShopinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopinfoPage),
  ],
})
export class ShopinfoPageModule {}
