import { Component, ViewChild } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RentsalePage } from '../rentsale/rentsale';
import { ShoppingPage } from '../shopping/shopping';


import { ShoppinglistPage } from '../shoppinglist/shoppinglist';


import { UserPage } from '../user/user';
import { TradegoodsOrderPage } from '../tradegoods-order/tradegoods-order';
import { CartPage } from '../cart/cart';

import $ from 'jquery';
import {RentsaleaddPage} from '../rentsaleadd/rentsaleadd'
import {TradegoodsRefundPage} from '../tradegoods-refund/tradegoods-refund';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabRef: Tabs;
  @ViewChild('mainTabs2') tabRef2: Tabs;

 //tab1Root = RentsaleaddPage
  tab1Root = HomePage;
  tab2Root = RentsalePage;
  tab3Root = ShoppingPage;
  tab4Root = UserPage;

  tab5Root = ShoppingPage;
  tab6Root = ShoppinglistPage;
  tab7Root = CartPage;
  tab8Root = UserPage;

  constructor(public config:ConfigProvider,public http: Http,public navCtrl: NavController) {
  }


  ionViewWillEnter($ionicTabsDelegate) {
      $(".mytabs2").css("display","none")
  }

  getShopTab(){
    $(".mytabs").css("display","none");
    $(".mytabs2").css("display","block");
    this.tabRef2.select(0);
  }

  getTeneTab() {
    $(".mytabs2").css("display", "none");
    $(".mytabs").css("display", "block");
    this.tabRef.select(3);  
  }
  getOder(Id){
    this.navCtrl.push(ShoppinglistPage,{id:0});
  }

}