import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http,Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core'; 
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';


//增加收货地址
import { AddaddressPage } from '../addaddress/addaddress';
//跳入登录页面
import { LoginPage } from '../login/login';

//引入地址详情页面
import { AddressinfoPage } from '../addressinfo/addressinfo'

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  //发送数据
  public idd:string = "";
  public token = "";
  //获取数据
  public addresslist=[];
  public addressId :any;
  //跳转页面
  public AddaddressPage=AddaddressPage;
  public LoginPage = LoginPage;
  public AddressinfoPage = AddressinfoPage;

  //引入地址详情页面
  public addressInfo=[];

  public data = {
      'addressId' : '',
      'token' : ''
    }

  constructor(public navCtrl: NavController,public config:ConfigProvider,public http: Http,public cd: ChangeDetectorRef
    ,public storage:StorageProvider,public httpService:HttpServicesProvider) {
  }

  ionViewWillEnter(){
    this.getRem();
    this.getAddressList();
  }
  ionViewDidEnter(){
    this.getAddressList();
  }
  //获取当前用户的收货地址列表
  getAddressList(){
    console.log(this.storage.get('token'))
    var api = this.config.apiUrl + '/api/Address/list?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.addresslist = data.list;
        console.log(this.addresslist);
      } else {
        alert(data.errmsg)
      }
    });

  }

  //设置默认收货地址
  clickToDef(id){
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    var data = {
      addressId : id,
      token: this.storage.get('token')
    };
    var api = this.config.apiUrl + '/api/Address/edit_default';
    this.http.post(api,data,options).map(res => res.json()).subscribe(data =>{
      console.log(data)
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("设置成功！");
        this.ionViewDidEnter(); //更新页面
      } else {
        alert(data.errmsg);
      }
    });
  }
  //删除地址
  deleteAddress(id){
    var data = {
      token : this.storage.get('token'),
      addressId : id,
    }
    // var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // var options = new RequestOptions({ headers: headers });
    var api = this.config.apiUrl + '/api/Address/del';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      console.log("6"+JSON.stringify(data))
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("删除成功！");
        this.ionViewDidEnter(); //更新页面
      } else {
        console.log(data.errmsg);
      }
    });
  }

  //编辑、新加地址页面
  editAddress(item){
    this.navCtrl.push(AddaddressPage,{
      "item":item
    })
  }

  //回退页面
  backTo(){
    this.navCtrl.pop();
  }


  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }

  //获取地址详情（页面没写）
  getAddressDet(){
    var api = this.config.apiUrl + '/api/Address/info?token=' + this.storage.get('token') + "&addressId=" + this.addressId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log(data.model);
      } else {
        console.log(data.errmsg + data.model);
      }
    });
  }

}
