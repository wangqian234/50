import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';


import { HouseinfoPage } from '../houseinfo/houseinfo';
//?????
import { BindroomPage } from '../bindroom/bindroom';

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
  houseId = '';
  public houseList = [];

  public BindroomPage = BindroomPage;

  public HouseinfoPage = HouseinfoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config:ConfigProvider, public http:Http, public storage: StorageProvider, ) {
  }

  getHouseInfo(id){
    this.navCtrl.push(HouseinfoPage,{id:id});
  }

  backTo(){
    this.navCtrl.pop();
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter HouseinfolistPage');
    this.getHouseList();
  }

  //??????
  getHouseList(){
    console.log(this.storage.get('token'));
    var api = this.config.apiUrl + '/api/VUserRoom/list_User?token='+ this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseList = data.list;
      } else {
        console.log(data.errmsg);
      }
    });
  }
 

}
