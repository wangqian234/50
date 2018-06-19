import { Component, ViewChild } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Tabs } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

import { HomePage } from '../home/home';
import { RentsalePage } from '../rentsale/rentsale';
import { ShoppingPage } from '../shopping/shopping';
import { ShopsortPage } from '../shopsort/shopsort';


import { ShoppinglistPage } from '../shoppinglist/shoppinglist';


import { UserPage } from '../user/user';
import { CartPage } from '../cart/cart';

import $ from 'jquery';
import {RentsaleaddPage} from '../rentsaleadd/rentsaleadd';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  @ViewChild('mainTabs2') tabRef2: Tabs;
 
  tab1Root = HomePage;
  tab2Root = RentsalePage;
  tab3Root = ShoppingPage;
  tab4Root = UserPage;

  tab5Root = ShoppingPage;
  //tab7Root = ShoppinglistPage;
  //tab8Root = CartPage;
  //tab6Root = ShopsortPage;

  constructor(public navParams: NavParams,public config:ConfigProvider,public http: Http,public navCtrl: NavController,public storage: StorageProvider) {
  }

  ionViewWillEnter($ionicTabsDelegate) {
      if(this.navParams.get('tabs')){
        $(".mytabs").css("display","none");
        $(".mytabs2").css("display","block");
      } else {
        this.storage.set('tabs','true');
        $(".mytabs2").css("display","none");
        $(".mytabs").css("display","block");
      }
      if(this.navParams.get('goto') == "rent"){
        $(".mytabs2").css("display","none");
        $(".mytabs").css("display","block");
        this.tabs.select(1);
      }

  }

  getsort(){
    this.navCtrl.push(ShopsortPage)
  }

  getorder(){
    this.navCtrl.push(ShoppinglistPage)
  }

  getcart(){
    this.navCtrl.push(CartPage);
  }

  getShopTab(){
    $(".mytabs").css("display","none");
    $(".mytabs2").css("display","block");
  }
}