//wdh
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
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';

/**
 * Generated class for the GroupdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-groupdetail',
  templateUrl: 'groupdetail.html',
})
export class GroupdetailPage {

  public ShopbuyPage=ShopbuyPage;
 
  public wid;
  public list=[];
  public dataGlist=[];
  public goodMlist=[];
  public dataSlist=[];
  //定义congfig中公共链接的变量aa
  public wdh = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
    this.wid=navParams.get('id');
   // alert(this.wid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupdetailPage');
  }
ionViewWillLoad() {
    
    var that=this;
    var api=this.wdh+'/api/goods/info?goods_Id='+this.wid+'&token='+this.token;
        this.http.get(api).map(res => res.json()).subscribe(data =>{
       console.log(data);
       that.dataGlist = data.json.data_group.list;//list为空
      // console.log(that.dataGlist);
      that.goodMlist=data.json['good_Model'].model;
      //alert(JSON.stringify(that.goodMlist));
      console.log(that.goodMlist);
      that.dataSlist=data.json.data_Sizes.list[0];
      console.log(that.dataSlist);
     
     })
  }


}
