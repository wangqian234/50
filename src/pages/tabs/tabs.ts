import { Component,ViewChild } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { Tabs,App } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RepairlistPage } from '../repairlist/repairlist';
import { ShoppingPage } from '../shopping/shopping';
import { UserPage } from '../user/user';
import { TradegoodsOrderPage } from '../tradegoods-order/tradegoods-order';
import { CartPage } from '../cart/cart';

import{ PayfeePage } from '../payfee/payfee';
import $ from 'jquery';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RepairlistPage;
  tab3Root = ShoppingPage;
  tab4Root = UserPage;

  tab5Root = ShoppingPage;
  tab6Root = PayfeePage;
  tab7Root = TradegoodsOrderPage;
  tab8Root = UserPage;

  constructor(public config:ConfigProvider,public http: Http,public storage:StorageProvider,public navCtrl: NavController,public appCtrl: App) {
  }

  @ViewChild('mytabs') tabRef: Tabs;


  ionViewWillEnter($ionicTabsDelegate) {
      $(".mytabs2").css("display","none")
  }

  getShopTab(){
    $(".mytabs").css("display","none");
    $(".mytabs2").css("display","block");
  }

  getTeneTab(){
    this.navCtrl.setRoot(TabsPage);
  }


}