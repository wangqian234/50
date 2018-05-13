import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HouseinfoPage } from '../houseinfo/houseinfo';

/**
 * Generated class for the HouseinfolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-houseinfolist',
  templateUrl: 'houseinfolist.html',
})
export class HouseinfolistPage {

  public HouseinfoPage = HouseinfoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getHouseInfo(){
    this.navCtrl.push(HouseinfoPage);
  }

  backTo(){
    this.navCtrl.pop();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseinfolistPage');
  }

}
