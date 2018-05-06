import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-shoppingdetail',
  templateUrl: 'shoppingdetail.html',
})
export class ShoppingdetailPage {

    //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {

  }
      //主页面加载函数
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    var that=this;
    var api = this.aa+'/api/goods/info?curCityCode=4403';
     //var api =  '';
     this.http.get(api).map(res => res.json()).subscribe(data =>{

     })
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingdetailPage');
  }

}
