import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TradegoodsReceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tradegoods-receive',
  templateUrl: 'tradegoods-receive.html',
})
export class TradegoodsReceivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradegoodsReceivePage');
  }

  backTo(){
    this.navCtrl.pop();
  }
}
