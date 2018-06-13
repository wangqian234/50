import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import {RentsaleaddPage} from '../rentsaleadd/rentsaleadd';
import $ from 'jquery'

@Component({
  selector: 'page-rentsaleinfo',
  templateUrl: 'rentsaleinfo.html',
})
export class RentsaleinfoPage {
  bianji:boolean;
  rental_id = '';
  type='';
  rentsale={};
  rentsaleDetail={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http) {
  }

  ionViewWillLoad(){
    if(this.navParams.get('houseId') && this.navParams.get('houseType')){
      this.rental_id = this.navParams.get('houseId');
      this.type = this.navParams.get('houseType');
      if(this.navParams.get('quFen')==1){
        this.bianji = false
        this.getRentSaleInfo();
      }else if(this.navParams.get('quFen')==0){
        this.bianji = true;
        this.myPublishInfo();
      }    
    }
  }
  ionViewDidEnter(){
    this.storage.set('tabs','true');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RentsaleinfoPage');
  }

  getRentSaleInfo(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    console.log(this.rental_id,this.type)
    var api = this.config.apiUrl + "/api/rental/info?type=" + this.type + "&rental_id=" + this.rental_id + "&token=" + this.storage.get("token");
      this.http.get(api).map(res => res.json()).subscribe(data => {
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.rentsale = data.model;
        console.log(data)
        this.rentsaleDetail = data.list;
      } else {
        alert(data.errmsg)
      }
    });
  }
  //我的发布房屋详情
   myPublishInfo(){
     $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
      console.log(this.rental_id,this.type)
    var api = this.config.apiUrl + "/api/rental/info_user?type=" + this.type + "&rental_id=" + this.rental_id + "&token=" + this.storage.get("token");
      this.http.get(api).map(res => res.json()).subscribe(data => {
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.rentsale = data.model;
        console.log(data)
        this.rentsaleDetail = data.list;
      }else {
        alert(data.errmsg)
      }
    });
  }
  //跳转到房屋修改
  goEditPage(rentsale){
      this.navCtrl.push(RentsaleaddPage,{item:rentsale})
  }

  backTo(){
    this.navCtrl.pop();
  }

}
