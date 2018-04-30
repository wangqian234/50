import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//商品分类页
import { ShopsortPage } from '../shopsort/shopsort';
ShopsortPage

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  public ShopsortPage = ShopsortPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
  }

}
