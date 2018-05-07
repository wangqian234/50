//高海乐

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

import {Http,Jsonp}from '@angular/http';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

//商品分类页
import { ShopsortPage } from '../shopsort/shopsort';
//商品详情页
import { ShoppingdetailPage } from '../shoppingdetail/shoppingdetail';
//商品详情页
import { ShopcarPage } from '../shopcar/shopcar';

//config.ts
import { ConfigProvider } from '../../providers/config/config';


//热卖界面
import { BigsalePage } from '../bigsale/bigsale';
//限时促销
import { SalePage } from '../sale/sale';
//团购界面
import { GroupbuyPage } from '../groupbuy/groupbuy';


@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  public ShopsortPage = ShopsortPage;
  public ShoppingdetailPage = ShoppingdetailPage;
  public ShopcarPage = ShopcarPage;

  //定义接收数据的list
  public l=[];


  public BigsalePage = BigsalePage;
 public SalePage = SalePage;
 public GroupbuyPage = GroupbuyPage;

  public lunboList=[];
  public tuangouList=[];
  public tubList=[];
  public tuijList=[];
  public list=[];
  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
  this.getLunbo();  
} 
//主页面加载函数 
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 18) + 'px';
    var that=this;
    var api = this.aa+'/api/index/list?curCityCode=4403';
     //var api =  '';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
      /* if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
     } else {
        alert(data.data_Banner.errmsg);
     }*/
    console.log(data);
     that.lunboList=data.json["data_Banner"].list;
    // console.log(this.lunboList);
     that.tuangouList=data.json['data_Modules'].list;
    // console.log(this.tuangouList[1]);
     that.tubList=data.json['data_Sort'].list;
    console.log(that.tubList);
    that.tuijList=data.json['data_Recommend'].list;
    // console.log(this.tuijList);
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
  }

/**轮播图 */
getLunbo(){
   var that=this;  
      that.l=[
        '../assets/imgs/hua.jpg',
        '../assets/imgs/jiaju.jpg',
        '../assets/imgs/hongjiu.jpg',       
      ];   
}

  clickEvent(){
    var index = $(event.target).attr("index");
    console.log(index);
    var rem = index * 7.5 + 'rem';
    console.log(rem)
    $('.jiantou_button').css("left",rem)
  }

}
