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
import { CartPage } from '../cart/cart';

import $ from 'jquery';
import {RentsaleaddPage} from '../rentsaleadd/rentsaleadd';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
 
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


  ionViewWillEnter() {
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