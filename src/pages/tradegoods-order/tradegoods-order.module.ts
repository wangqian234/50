import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradegoodsOrderPage } from './tradegoods-order';

@NgModule({
  declarations: [
    TradegoodsOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(TradegoodsOrderPage),
  ],
})
export class TradegoodsOrderPageModule {}
