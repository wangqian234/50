import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core'; 
import { StorageProvider } from '../../providers/storage/storage';


//增加收货地址
import { AddaddressPage } from '../addaddress/addaddress';
//跳入登录页面
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  //发送数据
  public token = "";
  //获取数据
  public addresslist=[];
  //跳转页面
  public AddaddressPage=AddaddressPage;
  public LoginPage = LoginPage;

  constructor(public navCtrl: NavController,public config:ConfigProvider,public http: Http,public cd: ChangeDetectorRef
    ,public storage:StorageProvider) {
  }

  ionViewWillEnter(){
    this.getRem();
    this.getAddressList();
    this.token = this.storage.get('token');
  }
  //获取当前用户的收货地址
  getAddressList(){
    var api = this.config.apiUrl + 'api/Address/list?token=' + this.token;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.addresslist = data.list;
      } else {
        alert(data.errmsg)
      }
    });

  }

  //设置默认收货地址
  changeAddress(id){
    var api = this.config.apiUrl + '/api/Address/edit_default?addressId=' + id + '&token=' + this.token;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("设置成功！");
        this.cd.detectChanges(); //更新页面
      }
    });
  }
  //删除数据
  deleteAddress(key,id){
    var data = {
      'addressId' : id,
      'token' : this.token
    }
    var api = this.config.apiUrl + '/api/Address/del';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("删除成功！");
        this.cd.detectChanges(); //更新页面
      }
    });
  }

  //编辑、新加地址页面
  editAddress(item){
    this.navCtrl.push(AddaddressPage,{
      item:item
    })
  }


  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }

}
