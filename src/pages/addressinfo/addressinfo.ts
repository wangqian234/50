import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http,Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import $ from 'jquery'
/**
 * Generated class for the AddressinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addressinfo',
  templateUrl: 'addressinfo.html',
})
export class AddressinfoPage {

  public id = '';
  public addressInfo=[];
  public addressId:any;
  model = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public config:ConfigProvider,
    public storage:StorageProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressinfoPage');
    this.getAddressInfo();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }

  //获取地址信息（地址详情）
  getAddressInfo(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var j = 3;
    if(this.navParams.get('item')){
    var api = this.config.apiUrl + '/api/Address/info?token=' + this.storage.get('token')+'&addressId='
    + this.navParams.get('item');
  }
    // console.log("房屋id为："+this.navParams.get('item')+"打印model中的内容为"+this.model)
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
         this.addressInfo = data.model;
         console.log("成功获取!");
      } else if(data.errcode === 40002){
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.getAddressInfo();
        } 
      } else {
        console.log(data.errmsg);
      }
    });
  }

}
