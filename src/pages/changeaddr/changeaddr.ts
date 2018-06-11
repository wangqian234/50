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
//跳入地址管理
import { AddressPage } from '../address/address';


@Component({
  selector: 'page-changeaddr',
  templateUrl: 'changeaddr.html',
})
export class ChangeaddrPage {
  //发送数据
  public idd:string = "";
  public token = "";
  public callback;
  //获取数据
  public addresslist=[];
  public addListList;
  //跳转页面
  public AddaddressPage=AddaddressPage;
  public LoginPage = LoginPage;
  public AddressPage=AddressPage;

  public data = {
      'addressId' : '',
      'token' : ''
    }

  constructor(public navCtrl: NavController,public config:ConfigProvider,public http: Http,public cd: ChangeDetectorRef
    ,public storage:StorageProvider,public httpService:HttpServicesProvider,public navParams: NavParams,) {
      this.storage.set('tabs','false');
      this.callback = this.navParams.get("callback");
      this.addListList = this.navParams.get("addListList");
  }
  ionViewWillEnter(){
    this.getRem();
    this.getAddressList();
  }

  gotoBuy(item){
      this.callback(item).then(()=>{
            this.navCtrl.pop();
      });
  }

  //获取当前用户的收货地址
  getAddressList(){
    console.log(this.storage.get('token'))
    var api = this.config.apiUrl + '/api/Address/list?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.addresslist = data.list;
        console.log(this.addresslist);
      } else {
        alert("获取地址列表失败！")
        console.log(data.errmsg)
      }
    });

  }

  //选择收货地址
  change(){
    // var headers = new Headers({ 'Content-Type': 'application/json' });
    // var options = new RequestOptions({ headers: headers });
    // var data = {
    //   addressId : '',
    //   token:''
    // };
    // data.addressId = id;
    // data.token = this.storage.get('token');
    // var api = this.config.apiUrl + '/api/Address/edit_default';
    // this.http.post(api,JSON.stringify(data),options).map(res => res.json()).subscribe(data =>{
    //   if (data.errcode === 0 && data.errmsg === 'OK') {
    //     alert("设置成功！");
         this.cd.detectChanges(); //更新页面
    //   }
    // });
  }
  

  //编辑、新加地址页面
  editAddress(item){
    this.navCtrl.push(AddaddressPage,{
      item:item
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

}
