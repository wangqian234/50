import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//商品分类页
import { ShopsortPage } from '../shopsort/shopsort';
//订单页
import { ShoppinglistPage } from '../shoppinglist/shoppinglist';
//商品详情页
import { ShoppingdetailPage } from '../shoppingdetail/shoppingdetail';

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  public ShopsortPage = ShopsortPage;
  public ShoppinglistPage =ShoppinglistPage;
  public ShoppingdetailPage =ShoppingdetailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
  }

}
