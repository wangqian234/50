//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//请求数据
import { Http, Jsonp, Headers, RequestOptions } from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//收货地址页面
import { ChangeaddrPage } from '../changeaddr/changeaddr';
//返回首页
import { TabsPage } from '../tabs/tabs';

import $ from 'jquery'
@IonicPage()
@Component({
  selector: 'page-shopbuy',
  templateUrl: 'shopbuy.html',
})
export class ShopbuyPage {
  
  public ChangeaddrPage = ChangeaddrPage;
  public TabsPage = TabsPage;
  public caId;
  public addressList=[];
  public wid;//商品ID
  public sizeId;//规格id
  public gnum=1;//商品数量
  public fee=0;
  public sid='';
  public list = [];
  public dtlist = [];
  public goodSlist = [];
  public addlist = {
    dddress_id:''
  };
  public addressId;
  public shoplist = [];
  public carriagelist = [];
  public creditslist = [];
  public totalPrice = 0;
  public wtotalPrice = 0;  /*总价*/
  public addListList;

  public jfen;
  checked =false;
  public goodSize;
  public addID;
  public trade_Memo = "";
  public addBuylist = {
    buyNum: 1,
    c_UserAddress_Id: 0,
    trade_Memo: "",
    isUseIntegral: false,
    gbId:'',
    token: "",
    tags:'android',
    createip:'',
  }
  public outTradeNo;
  public cip;
  

  //定义congfig中公共链接的变量aa
  public wdh = this.config.apiUrl;
  //定义token
  public token = this.storage.get('token');

  constructor(public storage: StorageProvider, public navCtrl: NavController, public navParams: NavParams, public http: Http, public jsonp: Jsonp,
    public httpService: HttpServicesProvider,/*引用服务*/public config: ConfigProvider,public loadingCtrl: LoadingController,public app: App) {
    this.wid = navParams.get('wid');
    this.sizeId =navParams.get('sid');
    this.gnum = navParams.get('gnum');
    console.log(this.navParams.get('wid'));
    console.log(this.sizeId)
    //alert("商品id"+this.gnum);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopbuyPage');
    
  }
  ionViewWillLoad() {
    this.getAddressList();
  }
  //购买页面显示的内容
  goodBuyList(){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
      loading.present();
    //商品内容
    var that = this;
    var j = 3;
    var api = this.wdh + '/api/goods/buy_list?caId='+this.caId+'&token=' + this.token;
    this.http.get(api).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      if(data.json.dt.errcode === 0 && data.json.dt.errmsg === 'OK'){
        console.log(data)
      that.dtlist = data.json.dt.model;
      that.jfen=data.json.dt.model.useintegralpricemax;//获得积分抵扣额度
      that.totalPrice=data.json.dt.model.totalprice;
      this.wtotalPrice=data.json.dt.model.totalprice;
      //购买数量限制goodslimitnum、库存数量goodsnum、积分、价格totalprice
      // alert(JSON.stringify(that.dtlist));
      that.addlist=data.json.address_List.list[0];//（默认）收获地址相关
      this.addressId = data.json.address_List.list[0].dddress_id;
      this.postFee();
      that.addListList = data.json.address_List.list;
      //alert(JSON.stringify(that.addlist));
      that.goodSlist = data.json.dt_GoodsSize.list;//多商品列表
      // if(this.goodSlist.length == 1){
      //   this.gnum = this.gnum;
      // }else if(this.goodSlist.length>1){
      //   this.gnum = 0;
      // }
      //商品内容（名称title、图片img、购买数量buynum）
      //alert(JSON.stringify(that.goodSlist));
      }
    }) 
  }
   //运费postage
  //  postage(){
  //     let loading = this.loadingCtrl.create({
	//     showBackdrop: true,
  //   });
  //     loading.present();
  //     var that = this;
  //    var api3=this.wdh+'/api/trade/info?addressId=1&gId=1&gsId=1&goodsNum=1&token='+this.token;
  //           this.http.get(api3).map(res => res.json()).subscribe(data3 =>{
  //             loading.dismiss();
  //         if(data3.errcode === 0 && data3.errmsg === 'OK'){
  //          that.carriagelist = data3.model;
  //         }
  //      }) 
  //  }

   //积分抵扣pricemax,没用！
   integral(){
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
      loading.present();
     var that = this;
    var api4 = this.wdh + '/api/userintegral/info?preDecimal=111&token=' + this.token;  
  this.http.get(api4).map(res => res.json()).subscribe(data4 => {
    loading.dismiss();
    if(data4.errcode === 0 && data4.errmsg === 'OK'){
      that.creditslist = data4.model;
    }
    }) 
   }

  //修改收货地址
  changeAdd(){
    this.navCtrl.push(ChangeaddrPage, {
        callback: this.myCallbackFunction,
        addListList : this.addListList
    });
  }
//根据地址获得运费
postFee(){
  //运费postage
    var j = 3;
    var api3 = this.wdh + '/api/trade/info?addressId='+this.addressId+'&gId='+this.wid+'&gsId='+this.sizeId+'&goodsNum='+this.gnum+'&token=' + this.token;
    console.log(api3)   
    this.http.get(api3).map(res => res.json()).subscribe(data3 => {
     
      if (data3.errcode === 0 && data3.errmsg === 'OK') {
      this.carriagelist = data3.model;
      this.fee=data3.model.postage;
    
      } else if (data3.errcode === 40002) {
        j--;
          if (j > 0) {
          this.config.doDefLogin();
          this.postFee();
          }
        }
        else{ 
        alert(data3.errmsg);
          }
    })
}
  myCallbackFunction  =(params) => {
    var that = this;
     return new Promise((resolve, reject) => {
      if(typeof(params)!='undefined'){
          resolve('ok');
          that.addlist = params;
          this.addressId = that.addlist.dddress_id;
          this.postFee();
      }else{
          reject(Error('error'))
      }
            
   });
 }

//积分抵扣&运费
discount(){
  var t=this.totalPrice;
  if(this.checked==true){  
      this.totalPrice=parseInt(t.toString())-parseFloat(this.jfen.toString())+this.fee;
  }
  else if(this.checked==false){ 
  this.totalPrice=this.wtotalPrice+this.fee;}
}

  //提交订单
  addBuy() {
    var headers = new Headers();
    var goodsTradeMemo = [];
    for(let i=0; i<this.goodSlist.length;i++){
     goodsTradeMemo.push(this.goodSlist[i].trade_Memo); 
    }
    this.addBuylist.c_UserAddress_Id = this.addressId;
    this.addBuylist.token = this.token;
    this.addBuylist.trade_Memo =goodsTradeMemo.join("|")
    this.addBuylist.isUseIntegral= this.checked
    this.addBuylist.buyNum =this.gnum;
    this.addBuylist.createip = this.cip;
    console.log(this.addBuylist)
    var date = this.addBuylist;
    var j=3;
    var api =this.wdh + '/api/trade/add  ';
    this.http.post(api, date).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 ) {
        this.outTradeNo = data.errmsg;
      } else if (data.errcode === 40002) {
        j--;
        if (j > 0){
          this.config.doDefLogin();
          this.addBuy();
        }
      }
      else {       
        alert(data.errmsg);
      }
    });
  }
  //微信查询接口
   checkPayment(){
     var api = this.config.apiUrl + '/api/weixinpay/queryorder?out_trade_no='+this.outTradeNo;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg === 'OK'){
          alert("支付成功")
       }
     })
   }
           clickme(){
          var that = this;
          $.ajax({
              url: 'http://freegeoip.net/json/',
              success: function(data){
                alert(data.ip)
                that.cip = data.ip;
                that.addBuy();
              },
              type: 'get',
              dataType: 'JSON'
          });
      }

  backTo() {
    this.navCtrl.pop();
  }

  // incCount() {
  //   ++this.buynum;
  // }

  //数量变化  双向数据绑定
  // decCount() {
  //   if (this.buynum > 1) {
  //     --this.buynum;
  //   }
  // }

  //计算总价
  //  sumPrice(){
  //        var tempAllPrice=0;
  //var test=0;
  //alert(test);
  //test=this.dtlist['totalprice'];

  //       for(let i=0;i<this.list.length;i++){
  //         if(this.list[i].checked==true){
  //           tempAllPrice=parseInt(this.goodSlist['buynum'])*parseInt(this.dtlist['totalprice']);
  //还需加运费
  //         }
  //       }
  //     this.totalPrice=tempAllPrice;
  //  }
  getAddressList(){
    var j = 3;
    var api = this.config.apiUrl + '/api/Address/list?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.addressList = data.list;
        for(let i=0; i<this.addressList.length; i++){
          if(this.addressList[i].cbdefault == true){
            this.caId = this.addressList[i].id;
            this.goodBuyList();
          }
        }
        
      } else if(data.errcode === 40002){
        j--;
        if(j>0) {
          this.config.doDefLogin();
          this.getAddressList();
        }
      } else {
        console.log(data.errmsg)
      }
    });

  }

  backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }

}
