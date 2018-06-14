import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//返回首页
import { TabsPage } from '../tabs/tabs'
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  public tongtong:any ;
   public outTradeNo ;
   public allprice;
   public roomid ;
   public payMentModel = {
     mweb_url:''
   };
   public roomidlist = [];
   public roomName;
  //获取费用明细
  public paymentList={
    roomId:''
  }
  //接收数据用
  public modellist=[];
  public expenselist=[];
  public prepayslist=[];
  public fundloglist=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider,public app: App) {
     this.storage.set('tabs','false');
     if(this.navParams.get('outTradeNo')){
       this.outTradeNo = this.navParams.get('outTradeNo')
     }
     if(this.navParams.get('allprice')){
       this.allprice = this.navParams.get('allprice')
       console.log(this.allprice)
     }
     if(this.navParams.get('roomid')){
       this.roomid = this.navParams.get('roomid')
     }
     if(this.navParams.get('model')){
       this.payMentModel = this.navParams.get('model')
       this.payMentModel.mweb_url = this.payMentModel.mweb_url;
     }
  }
    //主页面加载函数 
   ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
    this.getroomId();
   }


   getroomId(){   
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.roomidlist=data.list;
            console.log(this.roomidlist.length) 
            console.log(this.roomid)
            for(let i=0;i<this.roomidlist.length;i++){
              if(this.roomid == this.roomidlist[i].id ){
               this.roomName =  this.roomidlist[i].name  
              }
            }
          }else if (data.errcode===4002){
            j--;
            this.config.doDefLogin();
            this.getroomId();
          } else{
            alert(data.errmsg)
          }
     })
  }
  //跳转到微信支付页面
  goWeixiPay(){
    //console.log(this.payMentModel.mweb_url)
    this.tongtong = this.payMentModel.mweb_url + "&referer="+"gyhsh.cn"
    window.location.assign(this.tongtong)
   // location.href = this.payMentModel.mweb_url;
  }

//   webview.setWebViewClient(new WebViewClient() {
//     public boolean shouldOverrideUrlLoading(WebView view, String url) {
//         if (url.startsWith("weixin://wap/pay?")) {
//             Intent intent = new Intent();
//             intent.setAction(Intent.ACTION_VIEW);
//             intent.setData(Uri.parse(url));
//             startActivity(intent);
//             return true;
//         }else if (url.startsWith("tel:")) {//H5打开电话
//             Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
//             WebActivity.this.startActivity(intent);
//         } else {
//             //H5微信支付要用，不然说"商家参数格式有误"
//             Map<String, String> extraHeaders = new HashMap<String, String>();
//             extraHeaders.put("Referer", "商户申请H5时提交的授权域名");
//             view.loadUrl(url, extraHeaders);
//         }
//         return true;
//     }
// });
     //微信查询接口
   checkPayment(){
     var api = this.config.apiUrl + '/api/weixinpay/queryorder?out_trade_no='+this.outTradeNo;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg === 'OK'){
          alert("支付成功")
       }else{
         alert(data.errmsg)
       }
     })
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
    backTo(){
    this.app.getRootNav().push(TabsPage,{
      tabs:true
    });
  }
    backToHome(){
     this.app.getRootNav().push(TabsPage);    
  }

}
