//商品订单详情
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import $ from 'jquery';//实现列表缓存

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ChangeDetectorRef } from '@angular/core'; //更新页面

//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

//商品订单详情
import { GoodsoderdetailPage } from '../goodsoderdetail/goodsoderdetail';
//增加商品评价
import { GoodsoderevaluatePage } from '../goodsoderevaluate/goodsoderevaluate';
//再次购买
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
//商品退款详情
import { TradegoodsRefundPage } from '../tradegoods-refund/tradegoods-refund';
//商品评价详情
import { TradegoodsEvaluatedetailPage } from '../tradegoods-evaluatedetail/tradegoods-evaluatedetail';
//添加商品退款申请
import { TradegoodsReapPage } from '../tradegoods-reap/tradegoods-reap';
//团购订单详情
import { TradegoodsGroupbuydetailPage } from '../tradegoods-groupbuydetail/tradegoods-groupbuydetail';
//加载圈
import { LoadingController } from 'ionic-angular';
//登录页面
import { LoginPage } from '../login/login';
//返回首页
import { TabsPage } from '../tabs/tabs'


@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {
     //定义token
   goodsNum:0;
  public token=this.storage.get('token');
  public outTradeNo;
  public list=[];
  public groupBuyList=[];
  public good_list=[];
  public SD_id;
  public page=1; //实现列表缓存
  public receivelist=[];
  public flag:boolean = true;
  public GoodsoderdetailPage=GoodsoderdetailPage;
  public TradegoodsRefundPage=TradegoodsRefundPage;
  public TradegoodsEvaluatedetailPage=TradegoodsEvaluatedetailPage;
  public TradegoodsReapPage=TradegoodsReapPage;
  public TradegoodsGroupbuydetailPage=TradegoodsGroupbuydetailPage;//团购详情
  public ShopgoodsinfoPage=ShopgoodsinfoPage;//再次购买
  public LoginPage = LoginPage;
  public TabsPage = TabsPage;
  public offent;
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
  public obligationEventList={
    tId:'',
    token:'',
    tags:'android',
    act:'emall',
    createip:'',
  }
  public cip;
  //商城
  public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",
    li04:"type",
    li05:"type",
  };
  //团购
  public tab_test={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",
  }

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http
  ,public app: App,public loadingCtrl: LoadingController,public cd: ChangeDetectorRef,public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
      if(navParams.get('id')){
        this.SD_id=navParams.get('id');
      } else {
        this.SD_id=0;   
      } 
      $(".ios .tabs .tabbar").css("display","none");
  }
  //商品添加评价
  evaluationEvent(trade_id,tradegoods_id,wu,item){
    this.navCtrl.push(GoodsoderevaluatePage,{tradeId:trade_id,tradegoodsId:tradegoods_id,item:item});
  }
  //再次购买
  buyagainEvent(goods_id){
    this.navCtrl.push(ShopgoodsinfoPage,{id:goods_id});
  }
  //商品评价详情
  evaluationdetailEvent(trade_id){
    this.navCtrl.push(TradegoodsEvaluatedetailPage,{tradeId:trade_id});
  }
   //添加商品退款申请
   addrefundEvent(tradegoods_id){
     this.navCtrl.push(TradegoodsReapPage,{tradegoodsId:tradegoods_id});
   }
   //商品退款详情页
   refundEvent(tradegoods_id){
     this.navCtrl.push(TradegoodsRefundPage,{tradegoodsId:tradegoods_id});
   }
   //商品确认付款
   obligationEvent(trade_id){
     this.obligationEventList.tId = trade_id;
     this.clickme();
   }
   payMent(){
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
      });
      loading.present();
      this.obligationEventList.token = this.storage.get('token')
      this.obligationEventList.createip =this.cip;
      var api = this.aa + '/api/weixinpay/unifiedorder'
      this.http.post(api,this.obligationEventList).map(res => res.json()).subscribe(data =>{
         loading.dismiss();
        if(data.errcode === 0 ){
          console.log(data)
          this.outTradeNo = data.errmsg
        }else{
          console.log(data)
        }
      })
   }
           clickme(){
          var that = this;
          $.ajax({
              url: 'http://freegeoip.net/json/',
              success: function(data){
                that.cip = data.ip;
                that.payMent();
              },
              type: 'get',
              dataType: 'JSON'
          });
      }
   //微信查询接口
   checkPayment(){
     var api = this.aa + '/api/weixinpay/queryorder?out_trade_no='+this.outTradeNo;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg === 'OK'){
          alert("支付成功")
       }
     })
   }
   //商品取消付款
   cancelpaymentEvent(trade_id){
         let loading = this.loadingCtrl.create({
	    showBackdrop: true,
      });
      loading.present();
        this.cancelpaymentList.trade_Id=trade_id;
        this.cancelpaymentList.token=this.token;
        var j=3;
        var api = this.aa+'/api/trade/colse_update';
        this.http.post(api,this.cancelpaymentList).map(res => res.json()).subscribe(data =>{
          loading.dismiss();
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("取消付款成功！");
          this.paymentEvent(1);////刷新界面
          // this.cd.detectChanges();//更新页面
          //this.navCtrl.push(TradegoodsRefundPage);
        } else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.cancelpaymentEvent(trade_id);
          }
      } else {
          alert("取消付款失败！");
          this.paymentEvent(1);//刷新界面
          // this.cd.detectChanges();//更新页面
        }
      });
   }
   //商品确认收货
   receiveEvent(trade_id){
         let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
        this.receivegoodsList.trade_Id=trade_id;
        this.receivegoodsList.token=this.token;
        var j=3;
        var api = this.aa+'/api/trade/update';
        this.http.post(api,this.receivegoodsList).map(res => res.json()).subscribe(data =>{
          loading.dismiss();
        if (data.errcode === 0 && data.errmsg === 'OK') {
          alert("收货成功！");
          this.paymentEvent(3);
          // this.cd.detectChanges(); //更新页面
          //this.navCtrl.push(TradegoodsRefundPage);
        }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.receiveEvent(trade_id);
          }
      } else {
          alert("收货失败！");
          this.paymentEvent(3);
          // this.cd.detectChanges(); //更新页面
        }
      });
   }
   //修改地址
   modifyaddress(trade_id){

   }

   ionViewWillLoad(){

   }
  ionViewDidLoad() {
         //确认登录状态
    if(this.storage.get('token')){
      this.getOrderList('');//实现列表缓存
    } else {
    this.navCtrl.push(LoginPage);
    }
        
   if(this.navParams.get('id') == undefined){
          $("#backTo").css("visibility","hidden")
        }
  }
/**王慧敏商城 */
     //商城实现列表缓慢加载
   getOrderList(infiniteScroll){
    // let loading = this.loadingCtrl.create({
	  //   showBackdrop: true,
    // });
    // loading.present();
     $(".spinnerbox").fadeIn(200);
        $(".spinner").fadeIn(200);
    switch(this.SD_id){
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
    $('.scroll-content').scrollTop('1.8rem');
    var api = this.aa+'/api/trade/list?pageSize=10&pageIndex='+this.page+'&trade_State='+this.SD_id+'&token='+this.token;
    // console.log("王慧敏来了"+api);
    //var api= this.config.apiUrl + '/api/list/list?tId=1&keyWord=eee&pageIndex='+this.page+'&pageSize=10&token='+this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      // loading.dismiss();
       $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
      // alert("王慧敏"+JSON.stringify(this.list));
      if(data.errcode===0 && data.errmsg==="OK"){
        this.list=this.list.concat(data.list);  /*数据拼接*/
        for(var i=0;i<this.list.length;i++){
          var num = 0;
          for(var j=0;j<this.list[i].goods_list.length;j++){
              num +=this.list[i].goods_list[j].goods_num
          }
          this.list[i].goodsNum = num;
        }
        if(data.list.length<10){
          $('ion-infinite-scroll').css('display','none')
        }else{
            this.page++;
        }
        if(infiniteScroll){
          // alert("慧敏页码"+this.page);   
          infiniteScroll.complete();        //告诉ionic 请求数据完成
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            infiniteScroll.enable(false);
            $('.nomore').css('display','block');
          }
        }
      }else if(data.errcode === 40002){
            j--;
          if(j>0){
            this.config.doDefLogin();
            this.getOrderList(infiniteScroll);
          }
        }else{
          console.log(data.errmsg);
        }
    })
  }
    paymentEvent(trade_state){
    $('ion-infinite-scroll').css('display','block');
    switch(trade_state){
      case 0:
      this.SD_id=0;
      this.list=[];
      this.page=1;
      break;
      case 1:
      this.SD_id=1;
      this.list=[];
      this.page=1;
      break;
      case 2:
      this.SD_id=2;
      this.list=[];
      this.page=1;
      break;
      case 3:
      this.SD_id=3;
      this.list=[];
      this.page=1;
      break;
      case 4:
      this.SD_id=4;
      this.list=[];
      this.page=1;
      break;
    }
    this.getOrderList("");//实现列表缓存
  }

/**王慧敏团购 */
   //团购实现列表缓慢加载
   getGroupList(infiniteScroll){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    switch(this.SD_id){
      case 0:
      this.tab_test={
        li00:"type current",
        li01:"type",
        li02:"type",
        li03:"type",
      };
      break;
      case 1:
      this.tab_test={
        li00:"type",
        li01:"type current",
        li02:"type",
        li03:"type",
      };
      break;
      case 2:
      this.tab_test={
        li00:"type",
        li01:"type",
        li02:"type current",
        li03:"type",
      };
      break;
      case 3:
      this.tab_test={
        li00:"type",
        li01:"type",
        li02:"type",
        li03:"type current",
      };
      break;
    }
     $('.scroll-content').scrollTop('1.8rem');
     var j=3;
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex='+this.page+'&groupBuy_State='+this.SD_id+'&token='+this.token;
    //  console.log("王慧敏"+api);  
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       loading.dismiss();
      //  alert("王慧敏"+JSON.stringify(this.groupBuyList));
     if(data.errcode===0 && data.errmsg==="OK"){
        this.groupBuyList=this.groupBuyList.concat(data.list);  /*数据拼接*/
        // alert("王慧敏"+JSON.stringify(this.groupBuyList));  
        
        console.log("wangqian"+JSON.stringify(this.groupBuyList)) 
        if(data.list.length<10){
          $('ion-infinite-scroll').css('display','none')
        }else{
            this.page++;
        }
        if(infiniteScroll){
          // alert("慧敏页码"+this.page);   
          infiniteScroll.complete();        //告诉ionic 请求数据完成
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            infiniteScroll.enable(false);
            $('.nomore').css('display','block');
          }
        }
      }else if(data.errcode === 40002){
            j--;
          if(j>0){
            this.config.doDefLogin();
            this.getGroupList(infiniteScroll);
          }
        }else{
          alert(data.errmsg);
        }

    })
  }
  //待开团、组团中、组团成功、组团失败切换
    groupEvent(groupBuy_State){
    $('ion-infinite-scroll').css('display','block');
    switch(groupBuy_State){
      case 0:
      this.SD_id=0;
      this.groupBuyList=[];
      this.page=1;
      break;
      case 1:
      this.SD_id=1;
      this.groupBuyList=[];
      this.page=1;
      break;
      case 2:
      this.SD_id=2;
      this.groupBuyList=[];
      this.page=1;
      break;
      case 3:
      this.SD_id=3;
      this.groupBuyList=[];
      this.page=1;
      break;
    }
    // alert("团购测试页码"+this.page);
    this.getGroupList('');//团购实现列表缓存
  }
     //团购查看详情
   groupbuyEvent(groupbuyid){
    //  alert("团购详情"+groupbuyid);
     this.navCtrl.push(TradegoodsGroupbuydetailPage,{gbId:groupbuyid});

   }
 
  //加载更多
  doLoadMore(infiniteScroll){
    if(this.flag){
      this.getOrderList(infiniteScroll);
    }else{
      this.getGroupList(infiniteScroll);
    }
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
    gotoGroup(){
    this.flag = false;
    $('ion-infinite-scroll').css('display','block');//下拉加载
    $("#group-content").css("display", "block") ;
    $("#order-content").css("display", "none") ;
    $("#title li:nth-of-type(1)").attr("class","qbdd qbdd_you")
    $("#title li:nth-of-type(2)").attr("class","qbdd no")
    this.SD_id = 0;
    this.groupBuyList=[];
    this.page=1;
    this.getGroupList("");
  }
    gotoOrder(){
    this.flag = true;
    $('ion-infinite-scroll').css('display','block');//下拉加载
    $("#group-content").css("display", "none") ;
    $("#order-content").css("display", "block") ;
    $("#title li:nth-of-type(1)").attr("class","qbdd no")
    $("#title li:nth-of-type(2)").attr("class","qbdd qbdd_you")
  }
  backTo(){
    this.app.getRootNav().push(TabsPage,{
      tabs:true
    });
  }

  backToHome(){
     this.app.getRootNav().push(TabsPage);    
  }

  //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
       if(this.flag){
      this.getOrderList('');
     }else{
      this.getGroupList('');
     }
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }

}
