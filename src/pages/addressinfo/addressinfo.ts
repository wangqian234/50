import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http,Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';

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

  //获取地址信息（地址详情）
  getAddressInfo(){
    if(this.navParams.get('item')){
    var api = this.config.apiUrl + '/api/Address/info?token=' + this.storage.get('token')+'&addressId='
    + this.navParams.get('item');
  }
    // console.log("房屋id为："+this.navParams.get('item')+"打印model中的内容为"+this.model)
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
         this.addressInfo = data.model;
         console.log("成功获取!");
      } else {
        console.log(data.errmsg);
      }
      console.log(data.moedel);
    })
  }

}
