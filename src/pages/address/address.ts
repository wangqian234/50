import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App ,ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http,Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core'; 
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import $ from 'jquery'

//增加收货地址
import { AddaddressPage } from '../addaddress/addaddress';
//跳入登录页面
import { LoginPage } from '../login/login';

//引入地址详情页面
import { AddressinfoPage } from '../addressinfo/addressinfo';
//返回首页
import { TabsPage } from '../tabs/tabs'

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
    TabsPage = TabsPage;

  //引入地址详情页面
  public addressInfo=[];

  public data = {
      'addressId' : '',
      'token' : ''
    }

  constructor(public navCtrl: NavController,public config:ConfigProvider,public http: Http,public cd: ChangeDetectorRef,private alertCtrl: AlertController
 ,public storage:StorageProvider,public httpService:HttpServicesProvider,public app: App,public toastCtrl:ToastController) {
  }

  ionViewWillEnter(){
    this.getRem();
    this.getAddressList();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
    this.getAddressList();
  }
  //获取当前用户的收货地址列表
  getAddressList(){
    var j = 3;
    console.log(this.storage.get('token'))
    var api = this.config.apiUrl + '/api/Address/list?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.addresslist = data.list;
        console.log(this.addresslist);
      } else if(data.errcode === 40002){
        j--;
        if(j>0) {
          this.config.doDefLogin();
          this.getAddressList();
        }
      } else {
        console.log(data.errmsg)
      }
    });

  }

  //设置默认收货地址
  clickToDef(id){
    var j = 3;
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
        let toast = this.toastCtrl.create({
          message: '成功设置默认收货地址',
          duration: 2000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
        this.ionViewDidEnter(); //更新页面
      } else if (data.errcode === 40002){
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.getAddressList();
        }
      }  else {
        console.log(data.errmsg);
      }
    });
  }
  //删除地址
  deleteAddress(id){
      let alert1 = this.alertCtrl.create({
        title: '',
        message: '确认删除收货地址?',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              return;
            }
          },
          {
            text: '确认',
            handler: () => {
              var data = {
                token : this.storage.get('token'),
                addressId : id,
              }
              var j = 3;
              var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
              var options = new RequestOptions({ headers: headers });
              var api = this.config.apiUrl + '/api/Address/del';
              this.http.post(api,data).map(res => res.json()).subscribe(data =>{
                if (data.errcode === 0 && data.errmsg === 'OK') {
                  let toast = this.toastCtrl.create({
                    message: '成功删除地址',
                    duration: 2000,
                    position: 'top'
                  });
                  toast.onDidDismiss(() => {
                    console.log('Dismissed toast');
                  });
                  toast.present();
                  this.ionViewDidEnter(); //更新页面
                } else if(data.errcode === 40002){
                  j--;
                  if(j>0){
                    this.config.doDefLogin();
                    this.getAddressList();
                }
                }  else {
                  console.log(data.errmsg);
                }
              });
            }
          }
        ]
      });
      alert1.present();
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
  backToHome(){
    this.app.getRootNav().push(TabsPage);    
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
