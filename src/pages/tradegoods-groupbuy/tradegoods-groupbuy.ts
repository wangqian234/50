import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';//实现列表缓存

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

//团购订单详情
import { TradegoodsGroupbuydetailPage } from '../tradegoods-groupbuydetail/tradegoods-groupbuydetail';

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
    public list0=[{title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""},
   {title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""},
   {title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""},{title:"123",preprice:"123",img:""}];
    public SD_id;
    public page=1; //实现列表缓存

    public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",

  };

  public TradegoodsGroupbuydetailPage=TradegoodsGroupbuydetailPage;

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        //this.trade_id=navParams.get('tradeId');
        this.SD_id=navParams.get('id');
        this.getProductList('');//实现列表缓存
        //alert(this.SD_id);
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
     //var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&groupBuy_State='+groupBuy_State+'&token='+this.token;
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex=1&groupBuy_State='+groupBuy_State+'&token='+this.token;
     console.log("王慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.list=data.list;
         //alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         // alert(JSON.parse(data));
     } else {
        alert(data.errmsg);
     }
     })
  }

  groupEvent(groupBuy_State){
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
     //var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&groupBuy_State='+groupBuy_State+'&token='+this.token;
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex=1&groupBuy_State='+groupBuy_State+'&token='+this.token;
     console.log("王慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.list=data.list;
         //alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         // alert(JSON.parse(data));
     } else {
        alert(data.errmsg);
     }
     })
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    //this.getdetaillist();
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
     getdetaillist(){
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex=1&groupBuy_State='+this.SD_id+'&token='+this.token;
     console.log("王慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.list=data.list;
         //alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         // alert(JSON.parse(data));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
   }
   //查看详情
   groupbuyEvent(groupbuyid){
     this.navCtrl.push(TradegoodsGroupbuydetailPage,{gbId:groupbuyid});

   }
   //实现列表缓慢加载
   getProductList(infiniteScroll){
    var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex='+this.page+'&groupBuy_State='+this.SD_id+'&token='+this.token;
    console.log("王慧敏来了"+api);
    //var api= this.config.apiUrl + '/api/list/list?tId=1&keyWord=eee&pageIndex='+this.page+'&pageSize=10&token='+this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      console.log(data);
      this.list=this.list.concat(data.list);  /*数据拼接*/
      if(infiniteScroll){
        infiniteScroll.complete();        //告诉ionic 请求数据完成
        if(data.result.length<10){  /*没有数据停止上拉更新*/
          infiniteScroll.enable(false);
          $('.nomore').css('display','block');
        }
      };
      this.page++;
    })
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad TradegoodsGroupbuyPage');
  }

  //加载更多
  doLoadMore(infiniteScroll){
    this.getProductList(infiniteScroll);
  }

  backTo(){
    this.navCtrl.pop();
  }
}
