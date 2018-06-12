import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//添加、修改商品退款申请
import {TradegoodsReapPage}from '../tradegoods-reap/tradegoods-reap';
import $ from 'jquery'

@IonicPage()
@Component({
  selector: 'page-tradegoods-refund',
  templateUrl: 'tradegoods-refund.html',
})
export class TradegoodsRefundPage {
  public list = [];
  public tradegoods_id;//商品订单编号
  public TradegoodsReapPage=TradegoodsReapPage;


  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;

    //定义token
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        this.tradegoods_id=this.navParams.get('tradegoodsId');
        //alert(this.tradegoods_id);
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    if(this.navParams.get('item')){
      this.list = this.navParams.get('item')
    }
    // this.getdetaillist();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
    getdetaillist(){
      $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
     var j=3;
     var api =this.aa+ '/api/tradegoods_refund/info?tgId='+this.tradegoods_id+'&token='+this.token;
     console.log("王慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
       if(data.errcode === 0 && data.errmsg === 'OK'){
         this.list=data.model ;
         console.log(JSON.stringify(data))
     } else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.getdetaillist();
          }
      } else {
        alert("请求失败");
     }
     })
  }
  refundApplicationEvent(item,trade_id){
        //this.navCtrl.push(TradegoodsReapPage,{item:item,tradeId:this.trade_id});
  }
 
  backTo(){
    this.navCtrl.pop();
  }
}
