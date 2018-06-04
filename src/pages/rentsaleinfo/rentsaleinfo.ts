import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-rentsaleinfo',
  templateUrl: 'rentsaleinfo.html',
})
export class RentsaleinfoPage {

  rental_id = '';
  type='';
  rentsale;
  rentsaleDetail;
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http) {
  }

  ionViewWillLoad(){
    if(this.navParams.get('rental_id') && this.navParams.get('type')){
      this.rental_id = this.navParams.get('rental_id');
      this.type = this.navParams.get('type');
      if(this.navParams.get('00')){   //传过来一个标志位判断是我的发布房屋详情还是列表房屋
        this.getRentSaleInfo();
      }else{
        this.myPublishInfo();
      }
      
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RentsaleinfoPage');
  }

  getRentSaleInfo(){
    console.log(this.rental_id,this.type)
    var api = this.config.apiUrl + "/api/rental/info?type=" + this.type + "&rental_id=" + this.rental_id + "&token=" + this.storage.get("token");
      this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.rentsale = data.model;
        console.log(this.rentsale)
        this.rentsaleDetail = data.list;
        console.log(JSON.stringify(data));
      } else {
        alert(data.errmsg+"00")
      }
    });
  }

    //我的发布房屋详情
   myPublishInfo(){
      console.log(this.rental_id,this.type)
    var api = this.config.apiUrl + "/api/rental/info_user?type=" + this.type + "&rental_id=" + this.rental_id + "&token=" + this.storage.get("token");
      this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.rentsale = data.model;
        console.log(this.rentsale)
        this.rentsaleDetail = data.list;
        console.log(JSON.stringify(data));
      } else {
        alert(data.errmsg+"00")
      }
    });
  }

  backTo(){
    this.navCtrl.pop();
  }

}
