import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tradegoods-groupbuydetail',
  templateUrl: 'tradegoods-groupbuydetail.html',
})
export class TradegoodsGroupbuydetailPage {
      //定义congfig中公共链接的变量aa
    public aa = this.config.apiUrl;
      //定义token
    public token=this.storage.get('token');

    public list=[];
    public groupbuyid;

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public loadingCtrl: LoadingController,public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        //this.trade_id=navParams.get('tradeId');
        this.groupbuyid=navParams.get('gbId');
        //this.getProductList('');//实现列表缓存
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    this.getdetaillist();
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
     getdetaillist(){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
     var api = this.aa+'/api/groupgoods/info?gbId='+this.groupbuyid+'&token='+this.token;
     console.log("王慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       loading.dismiss();
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.list=data.model;
         //alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         // alert(JSON.parse(data));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
   }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad TradegoodsGroupbuydetailPage');
  }
    backTo(){
    this.navCtrl.pop();
  }

}
