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
import { LoadingController } from 'ionic-angular';

//商品退款详情
import {TradegoodsRefundPage}from '../tradegoods-refund/tradegoods-refund';
//商品订单列表
import {ShoppinglistPage}from '../shoppinglist/shoppinglist';


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
    token:''
  }
  public refundList={
    refund_mode:'',
    refund_type:'',
    refund_price:'',

  }

  public list = [];
  public TradegoodsRefundPage=TradegoodsRefundPage;
  public ShoppinglistPage=ShoppinglistPage;
  public tradegoods_id;
  public pretotalprice;
  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
    //定义token
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public loadingCtrl: LoadingController
,public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
            this.pretotalprice = this.navParams.get('pretotalprice')
            this.tradegoods_id=navParams.get('tradegoodsId');
            this.reapList.tgId=this.tradegoods_id;      
  }

    ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
      this.getRem();
      this.getdetaillist();
    // if(this.navParams.get('item')){
    //   this.refundList=this.navParams.get('item');
    // } 
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  getdetaillist(){

  }
  //添加商品退款申请
  addRefundApplicationEvent(){
      let loading = this.loadingCtrl.create({
        showBackdrop: true,
      });
      loading.present();
      var j=3;
      if(this.reapList.price<=this.pretotalprice){
      var api = this.aa+'/api/tradegoods_refund/add'
      this.reapList.act='add';
      this.reapList.token=this.token;
      console.log(JSON.stringify(this.reapList) )
      this.http.post(api,this.reapList).map(res => res.json()).subscribe(data =>{
        loading.dismiss();
      if (data.errcode === 0 && data.errmsg === 'OK'){
          alert("添加成功！");
          this.navCtrl.push(ShoppinglistPage,{id:2});
      }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.addRefundApplicationEvent();
          }
      } else {
          alert("添加失败！"); 
          this.navCtrl.push(ShoppinglistPage,{id:2});
        }
      });
      }else{
        alert("退款金额不能大于付款金额")
      }
  }
  //修改商品退款申请
  modifyRefundApplicationEvent(){
      var j=3;
      var api = this.aa+'/api/tradegoods_refund/add';
      this.reapList.token = this.token;
      this.reapList.act="edit";
      //alert("王慧敏"+JSON.stringify(this.reapList));
      //var date = this.evaluateList;
        this.http.post(api,this.reapList).map(res => res.json()).subscribe(data =>{
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("修改成功！");
          this.navCtrl.push(ShoppinglistPage,{id:2});
        }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.modifyRefundApplicationEvent();
          }
      } else {
          alert("修改失败！");
          this.navCtrl.push(ShoppinglistPage,{id:2});
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


  backTo(){
    this.navCtrl.pop();
  }

}
