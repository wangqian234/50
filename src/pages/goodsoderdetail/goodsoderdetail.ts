//商品订单详情
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

//添加商品退款申请
import { TradegoodsReapPage } from '../tradegoods-reap/tradegoods-reap';
import {TradegoodsRefundPage} from '../tradegoods-refund/tradegoods-refund'
@IonicPage()
@Component({
  selector: 'page-goodsoderdetail',
  templateUrl: 'goodsoderdetail.html',
})
export class GoodsoderdetailPage {
       //定义token
  public token=this.storage.get('token');
 //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;//http://test.api.gyhsh.cn/api/trade/list?pageSize=10&pageIndex=1&trade_State=0&token=111
  public refundInfoList=[];
  public tradeRefundInfo=false;
  public list=[];
  public model={
    tel:'',
    mob:'',
    address:'',
    trade_time:''
  };
  public SD_id;
  public TradegoodsReapPage=TradegoodsReapPage;
  public tradegoodsid;//商品订单编号
 
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public loadingCtrl: LoadingController
,public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
          this.SD_id=navParams.get('id');
          this.tradegoodsid=navParams.get('tradegoodsId');

  }

ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
  this.getRem();
  this.getdetaillist();
  this.getDetail();
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
    var j=3;
     var api = this.aa+'/api/trade/info?trade_Id='+this.SD_id+'&token='+this.token;
     console.log("慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       loading.dismiss();
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         this.list=data.list[0];
         this.model=data.model;
         var arr = data.model.tradeaddress.split(",");
         this.model.tel = arr[0];
         this.model.mob = arr[1];
         this.model.address = arr[2];
         this.model.trade_time = data.model.trade_time.replace("T", " ").substring(0,19);
         console.log(this.model)
         console.log(data);
     } else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.getdetaillist();
          }
      } else {
        alert(data.errmsg);
     }
     })
  }

  //获取商品退款详情
 getDetail(){
     var j=3;
     var api =this.aa+ '/api/tradegoods_refund/info?tgId='+this.tradegoodsid+'&token='+this.token;
     console.log("王慧敏"+api);
     this.http.get(api).map(res => res.json()).subscribe(data =>{

       if(data.errcode === 0 && data.errmsg === 'OK'){
         this.tradeRefundInfo = true;
         this.refundInfoList = data.model;
     } else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.getDetail();
          }
      } else if(data.errcode === -1) {
        this.tradeRefundInfo = false;
     }
     })
  }
     //添加商品退款申请
   addrefundEvent(tradegoods_id,pretotalprice){
     this.navCtrl.push(TradegoodsReapPage,{tradegoodsId:tradegoods_id,pretotalprice:pretotalprice});
   }
   //跳转到商品详情
   refundInfoEvent(refundInfoList){
     this.navCtrl.push(TradegoodsRefundPage,{item:refundInfoList})
   }

  ionViewDidLoad() {
   //this.onload2();
  }

  backTo(){
    this.navCtrl.pop();
  }
}
