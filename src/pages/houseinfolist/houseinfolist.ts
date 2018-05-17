import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';


import { HouseinfoPage } from '../houseinfo/houseinfo';
//新添加房屋
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
  public houseList = {};

  public BindroomPage = BindroomPage;

  public HouseinfoPage = HouseinfoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config:ConfigProvider, public http:Http, public storage: StorageProvider, ) {
  }

  getHouseInfo(){
    this.navCtrl.push(HouseinfoPage);
  }

  backTo(){
    this.navCtrl.pop();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseinfolistPage');
    this.getHouseList();
    console.log('pg is here');
  }

  //获取房屋列表
  getHouseList(){
    var api = this.config.apiUrl + '/api/VUserRoom/list_User?token='+ this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseList = data.list;
        console.log(this.houseList  + '成功获取房屋列表');
      } else {
        console.log(data.errmsg);
      }
      console.log(data.list +"0");
    });
  }
 

}
