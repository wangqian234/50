//高海乐
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ShoppingevaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoppingevaluate',
  templateUrl: 'shoppingevaluate.html',
})
export class ShoppingevaluatePage {

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
  //定义接收数据的list
  public list=[];

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, 
  public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
  }

  //主页面加载函数
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    var that=this;
    var api = this.aa+'/api/tradegoods/list?pageSize=10&pageIndex=1&goodsId=26';

     this.http.get(api).map(res => res.json()).subscribe(data =>{
       console.log(data);
       that.list = data.list   //list为空
      console.log(that.list);
     })
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingevaluatePage');
  }

}
