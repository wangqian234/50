//商品订单详情
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ChangeDetectorRef } from '@angular/core'; //添加成功刷新页面

//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

//商品订单详情
import { GoodsoderdetailPage } from '../goodsoderdetail/goodsoderdetail';
//增加商品评价
import { GoodsoderevaluatePage } from '../goodsoderevaluate/goodsoderevaluate';
//商品退款详情
import { TradegoodsRefundPage } from '../tradegoods-refund/tradegoods-refund';
//商品评价详情
import { TradegoodsEvaluatedetailPage } from '../tradegoods-evaluatedetail/tradegoods-evaluatedetail';

@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {
     //定义token
  public token=this.storage.get('token');

  public list=[];
  public good_list=[];
  public SD_id;
  public receivelist=[];
  public GoodsoderdetailPage=GoodsoderdetailPage;
  public TradegoodsRefundPage=TradegoodsRefundPage;
  public TradegoodsEvaluatedetailPage=TradegoodsEvaluatedetailPage;
    public addressList={
    trade_Id:'',
    commentGroup:'',
    token : '',
  };
  public receivegoodsList={
    trade_Id:'',
    token:'',
  }
    public cancelpaymentList={
    trade_Id:'',
    token:'',
  }
  public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",
    li04:"type",
    li05:"type",
  };

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;//http://test.api.gyhsh.cn/api/trade/list?pageSize=10&pageIndex=1&trade_State=0&token=111
 
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public cd: ChangeDetectorRef,public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        this.SD_id=0;
        //alert(this.SD_id);

  }
  paymentEvent(trade_state){
    switch(trade_state){
      case 0:
      this.tabTest={
        li00:"type current",
        li01:"type",
        li02:"type",
        li03:"type",
        li04:"type",
        li05:"type",
      };
      break;
      case 1:
      this.tabTest={
        li00:"type",
        li01:"type current",
        li02:"type",
        li03:"type",
        li04:"type",
        li05:"type",
      };
      break;
      case 2:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type current",
        li03:"type",
        li04:"type",
        li05:"type",
      };
      break;
      case 3:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type",
        li03:"type current",
        li04:"type",
        li05:"type",
      };
      break;
      case 4:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type",
        li03:"type",
        li04:"type current",
        li05:"type",
      };
      break;
    }
     var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&trade_State='+trade_state+'&token='+this.token;
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
  //商品评价
  evaluationEvent(trade_id){
    this.navCtrl.push(GoodsoderevaluatePage,{tradeId:trade_id});
  }
  //商品评价详情
  evaluationdetailEvent(trade_id){
    this.navCtrl.push(TradegoodsEvaluatedetailPage,{tradeId:trade_id});
  }
   //商品退款详情页
   refundEvent(trade_id){
     this.navCtrl.push(TradegoodsRefundPage,{tradeId:trade_id});
   }
   //商品待付款
   obligationEvent(trade_id){

   }
   //商品取消付款
   cancelpaymentEvent(trade_id){
        alert("取消付款");
        this.cancelpaymentList.trade_Id=trade_id;
        this.cancelpaymentList.token=this.token;
        var api = this.aa+'/api/trade/colse_update';
        this.http.post(api,this.cancelpaymentList).map(res => res.json()).subscribe(data =>{
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("取消付款成功！");
          //this.navCtrl.push(TradegoodsRefundPage);
        } else {
          alert("取消付款失败！");
        }
      });

   }
   //商品确认收货
   receiveEvent(trade_id){
        alert("确认收货");
        this.receivegoodsList.trade_Id=trade_id;
        this.receivegoodsList.token=this.token;
        var api = this.aa+'/api/trade/update';
        this.http.post(api,this.receivegoodsList).map(res => res.json()).subscribe(data =>{
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("收货成功！");
          //this.navCtrl.push(TradegoodsRefundPage);
        } else {
          alert("收货失败！");
        }
      });
   }
   //修改地址
   modifyaddress(trade_id){

   }


ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

     var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&trade_State='+this.SD_id+'&token='+this.token;
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
   //this.onload2();
  }
// onload2 = function(){
//     var Sos=document.getElementById('sos_tanc');
// 		var ShouYe=document.getElementById('yemnr');
// 		var SosYe=document.getElementById('shous_yem');
// 		var SosFanHui=document.getElementById('sous_fanh_sy');
// 		Sos.onclick=function()
// 		{
// 			ShouYe.style.display=('none');
// 			SosYe.style.display=('block');
// 		}
// 		SosFanHui.onclick=function()
// 		{
// 			ShouYe.style.display=('block');
// 			SosYe.style.display=('none');
// 		}
//   }

}
