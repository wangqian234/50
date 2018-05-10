import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrepaymentPage} from '../prepayment/prepayment';
import { OnlinepaymentPage } from '../onlinepayment/onlinepayment';

/**
 * Generated class for the PropertypaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-propertypayment',
  templateUrl: 'propertypayment.html',
})
export class PropertypaymentPage {
  //预缴费用
  public PrepaymentPage=PrepaymentPage;

  //在线缴费
  public OnlinepaymentPage=OnlinepaymentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertypaymentPage');
  }

}
