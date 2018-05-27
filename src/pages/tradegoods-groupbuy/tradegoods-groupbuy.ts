import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
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
//返回首页
import { TabsPage } from '../tabs/tabs';

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
  public TabsPage = TabsPage;

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,
  public app: App,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        //this.trade_id=navParams.get('tradeId');
        this.SD_id=navParams.get('id');
        this.getProductList('');//实现列表缓存
        //alert(this.SD_id);
  }

  groupEvent(groupBuy_State){
    switch(groupBuy_State){
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
    }
    this.getProductList('');//团购实现列表缓存
  }
     //实现列表缓慢加载
   getProductList(infiniteScroll){
    alert("慧敏19号"+this.SD_id+"团测试页码"+this.page);
     switch(this.SD_id){
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
     var j=3;
     $('.scroll-content').scrollTop('1.8rem');
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex='+this.page+'&groupBuy_State='+this.SD_id+'&token='+this.token;
     console.log("王慧敏"+api);   
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       alert("王慧敏"+JSON.stringify(this.list));
     if(data.errcode===0 && data.errmsg==="OK"){
        this.list=this.list.concat(data.list);  /*数据拼接*/
        alert("王慧敏"+JSON.stringify(this.list));   
        if(data.list.length<10){
          $('ion-infinite-scroll').css('display','none')
        }else{
            this.page++;
        }
        if(infiniteScroll){
          alert("慧敏页码"+this.page);   
          infiniteScroll.complete();        //告诉ionic 请求数据完成
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            alert("王慧敏05-19");
            infiniteScroll.enable(false);
            $('.nomore').css('display','block');
          }
      }
      }else if(data.errcode === 40002){
            j--;
          if(j>0){
            this.config.doDefLogin();
            this.getProductList(infiniteScroll);
          }
        }else{
          alert(data.errmsg);
        }

    })
  }
     //查看详情
   groupbuyEvent(groupbuyid){
     alert("团购详情"+groupbuyid);
     this.navCtrl.push(TradegoodsGroupbuydetailPage,{gbId:groupbuyid});
   }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    //this.getdetaillist();
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
    getdetaillist(infiniteScroll){
     var j=3;
     alert(this.SD_id);
     var api = this.aa+'/api/groupbuy/list?pageSize=10&pageIndex='+this.page+'&groupBuy_State='+this.SD_id+'&token='+this.token;
     console.log("王慧敏"+api);
     alert("测试页码"+this.page);   
     this.http.get(api).map(res => res.json()).subscribe(data =>{
     if(data.errcode===0 && data.errmsg==="OK"){
        this.list=this.list.concat(data.list);  /*数据拼接*/
        if(infiniteScroll){
          this.page++;
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
            this.getProductList(infiniteScroll);
          }
        }else{
          alert(data.errmsg);
        }
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

    backToHere(){
     this.app.getRootNav().push(TabsPage);
  }
}
