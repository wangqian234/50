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
  //跳转页面
  public AddaddressPage=AddaddressPage;
  public LoginPage = LoginPage;

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
  //获取当前用户的收货地址
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
    var headers = new Headers({ 'Content-Type': 'application/form-data;charset=UTF-8' });
    var options = new RequestOptions({ headers: headers });
    var data = {
      addressId : '',
      token:''
    };
    data.addressId = id;
    data.token = this.storage.get('token');
    var api = this.config.apiUrl + '/api/Address/edit_default';
    // this.http.post(api,JSON.stringify(data),options).map(res => res.json()).subscribe(data =>{
    //   if (data.errcode === 0 && data.errmsg === 'OK') {
    //     alert("设置成功！");
    //     this.cd.detectChanges(); //更新页面
    //   }
    // });
     var api = '/api/Address/edit_default';
     this.httpService.doPost(api,JSON.stringify(data),(data)=>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("设置成功！");
        this.cd.detectChanges(); //更新页面
      }
    });
  }
  //删除数据
  deleteAddress(id){
    alert("进来了")
    var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    var options = new RequestOptions({ headers: headers });
    var api = this.config.apiUrl + '/api/Address/del';
    this.http.post(api,this.data,options).map(res => res.json()).subscribe(data =>{
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
