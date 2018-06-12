//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';

@Component({
  selector: 'page-shopinfo',
  templateUrl: 'shopinfo.html',
})
export class ShopinfoPage {
  public ShopgoodsinfoPage=ShopgoodsinfoPage;
  public wid;
  public sid;
  public goodMlist=[];
  public list = [];
  public wdh=this.config.apiUrl;
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider,public loadingCtrl: LoadingController) {
    this.storage.set('tabs','false');
  this.wid=navParams.get('wid');
  this.sid=navParams.get('sid');
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopinfoPage');
  }

ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';

    
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
loading.present();

    //店铺信息

    var that=this;
    var api=this.wdh+'/api/goods/info?goods_Id='+this.wid+'&token='+this.token;
        this.http.get(api).map(res => res.json()).subscribe(data =>{
       console.log(data);
             
      that.goodMlist=data.json['good_Model'].model;
         })
     
  

    //商品列表
    // alert("店id:"+this.sid);  
    var api2 = this.wdh+'/api/goods/list?pageSize=10&pageIndex=1&curCityCode=4403&keyWord=111&shop_Id='+this.sid;
     loading.dismiss();
     this.http.get(api2).map(res => res.json()).subscribe(data2 =>{
       if(data2.errmsg == 'OK'){
         this.list = data2.list;
         console.log(data2);
     } else {
        alert(data2.errmsg);
     }
     })
  }
 
 
 
 
 backTo(){
    this.navCtrl.pop();
  }

}
