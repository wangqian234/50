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
  selector: 'page-tradegoods-groupbuy',
  templateUrl: 'tradegoods-groupbuy.html',
})
export class TradegoodsGroupbuyPage {
    //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
    //定义token
  public token=this.storage.get('token');

  public list=[];
  public SD_id;

    public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",

  };

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        //this.trade_id=navParams.get('tradeId');
        this.SD_id=navParams.get('id');
        alert(this.SD_id);
  }
    paymentEvent(groupBuy_State){
    switch(groupBuy_State){
      case 0:
      this.tabTest={
        li00:"type current",
        li01:"type",
        li02:"type",
        li03:"type",
      };
      break;
      case 1:
      this.tabTest={
        li00:"type",
        li01:"type current",
        li02:"type",
        li03:"type",
      };
      break;
      case 2:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type current",
        li03:"type",
      };
      break;
      case 3:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type",
        li03:"type current",
      };
      break;
    }
     var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&groupBuy_State='+groupBuy_State+'&token='+this.token;
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

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    this.getdetaillist();
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
     getdetaillist(){
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex=1&groupBuy_State='+this.SD_id+'&token='+this.token;
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
        alert("王慧敏"+data.errmsg);
     }
     })
   }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad TradegoodsGroupbuyPage');
  }

}
