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


@IonicPage()
@Component({
  selector: 'page-bigsale',
  templateUrl: 'bigsale.html',
})
export class BigsalePage {
  public ShopgoodsinfoPage=ShopgoodsinfoPage;
  public dataGlist=[];
  public goodMlist=[];
  public dataSlist=[];
  public list = [];
  public wdh=this.config.apiUrl;
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider,public loadingCtrl: LoadingController) {


  }

 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

      let loading = this.loadingCtrl.create({
	    showBackdrop: true,
      });
      loading.present();
    var api = this.wdh+ '/api/goods/list?pageSize=10&pageIndex=1&curCityCode=4403';
      loading.dismiss();
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
  }
  ionViewDidLoad() {
   
  }



  backTo(){
    this.navCtrl.pop();
  }



}