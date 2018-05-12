import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-tradegoods-evaluatedetail',
  templateUrl: 'tradegoods-evaluatedetail.html',
})
export class TradegoodsEvaluatedetailPage {
      public list=[];
      public SD_id;

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        this.SD_id=navParams.get('tradeId');
  
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
     var api = this.aa+'/api/tradegoods/info?trade_Id='+this.SD_id+'&token='+this.token;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.list=data.list;
         //alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         //this.good_list=data.list[0].goods_list;
         //alert(JSON.stringify(data.list[0].goods_list));
         // alert(JSON.parse(data));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })

  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad TradegoodsEvaluatedetailPage');
  }

}
