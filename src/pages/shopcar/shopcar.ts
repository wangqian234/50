import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
@Component({
  selector: 'page-shopcar',
  templateUrl: 'shopcar.html',
})
export class ShopcarPage {

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');
  //定义接收数据list
  public list =[];
  public goumai:number= 1;

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
  
}
  


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopcarPage');
    var num = this.goumai;
    $(".jia").click(function(){
    num++;
    var _this = this;
   this.goumai = num;
    console.log(this.goumai);
   });
   $(".jian").click(function(){
    num--;
    var _this = this;
    this.goumai = num;
    console.log(this.goumai);
   });
  }

   

// enNumber(){
//   var num = this.goumai;
//   $(".jian").click(function(){
//     num--;
//   });
//    $(".jia").click(function(){
//      alert("78")
//     num++;
//    });
//   console.log(num);
//    this.goumai = num;
//    console.log(this.goumai);
// }

}
