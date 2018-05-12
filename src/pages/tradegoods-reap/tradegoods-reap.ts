//商品退款申请

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//商品退款详情
import {TradegoodsRefundPage}from '../tradegoods-refund/tradegoods-refund';


@IonicPage()
@Component({
  selector: 'page-tradegoods-reap',
  templateUrl: 'tradegoods-reap.html',
})
export class TradegoodsReapPage {
  //public token = "";
  public reapList={
    mode:'',
    type:'',
    price:'',
    tgId:'',
    memo:'',
    act:'',
    token : ''
  }
  public refundList={
    refund_mode:'',
    refund_type:'',
    refund_price:'',

  }

  public list = [];
  public TradegoodsRefundPage=TradegoodsRefundPage;
  public trade_id;

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
    //定义token
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
            this.trade_id=navParams.get('tradeId');

  }

    ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
      this.getRem();
      this.getdetaillist();

    if(this.navParams.get('item')){
      this.refundList=this.navParams.get('item');
    } 
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
  getdetaillist(){

  }
  //添加商品退款申请
  addRefundApplicationEvent(){
      alert("评价添加");
      var api = this.aa+'/api/tradegoods/add';
      this.reapList.token = this.token;
      this.reapList.mode=this.refundList.refund_mode;
      this.reapList.type=this.refundList.refund_type;
      this.reapList.price=this.refundList.refund_price;
      this.reapList.tgId=this.trade_id;
      this.reapList.act="add";
      this.reapList.token=this.token;
      //var date = this.evaluateList;
        this.http.post(api,this.reapList).map(res => res.json()).subscribe(data =>{
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("修改成功！");
          this.navCtrl.push(TradegoodsRefundPage);
        } else {
          alert("修改失败！");
        }
      });

  }
  //修改商品退款申请
  modifyRefundApplicationEvent(){
      alert("评价修改");
      var api = this.aa+'/api/tradegoods/add';
      this.reapList.token = this.token;
      this.reapList.mode=this.refundList.refund_mode;
      this.reapList.type=this.refundList.refund_type;
      this.reapList.price=this.refundList.refund_price;
      this.reapList.tgId=this.trade_id;
      this.reapList.act="edit";
      this.reapList.token=this.token;
      //var date = this.evaluateList;
        this.http.post(api,this.reapList).map(res => res.json()).subscribe(data =>{
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("修改成功！");
          this.navCtrl.push(TradegoodsRefundPage);
        } else {
          alert("修改失败！");
        }
      });

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
