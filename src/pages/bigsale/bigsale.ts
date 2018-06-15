//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
import $ from 'jquery';//实现列表缓存
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
//返回首页
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-bigsale',
  templateUrl: 'bigsale.html',
})
export class BigsalePage {
  public ShopgoodsinfoPage=ShopgoodsinfoPage;
  public LoginPage = LoginPage;
  public pageSize = 10;
  public pageIndex = 1;
  public hasData=true;   /*是否有数据*/
  public dataGlist=[];
  public goodMlist=[];
  public dataSlist=[];
  public list = [];
  public wdh=this.config.apiUrl;
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider,public loadingCtrl: LoadingController,public app: App) {

  }

 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
    this.getbigsale('');

  }
  ionVieDidEnter(){
    this.storage.set('tabs','false');
  }
  getbigsale(infiniteScroll){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
     var j = 3;  //确定递归次数，避免死循环
     var api = this.wdh+'/api/goods/list?pageSize=' + this.pageSize 
     + '&pageIndex=' + this.pageIndex + '&curCityCode=4403';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeOut(200);
       $(".spinner").fadeOut(200); 
       if(data.errcode===0 && data.errmsg==="OK"){
        if(data.list.length == 0){
          this.hasData = false;
        }
        this.list=this.list.concat(data.list);  /*数据拼接*/
        console.log(this.list); 
        if(data.list.length<10){
          $('ion-infinite-scroll').css('display','none')
        }else{
            this.pageIndex++;
        }
        if(infiniteScroll){
          infiniteScroll.complete();        //告诉ionic 请求数据完成
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            infiniteScroll.enable(false);
            $('.nomore').css('display','block');
          }
        }
      }
      else if(data.errcode === 40002) {
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getbigsale(infiniteScroll);
          }
      } else {
        alert(data.errmsg);
      }
    });

  }

  ionViewDidLoad() {
   
  }

ionViewDidEnter(){
    this.storage.set('tabs','false');
}

  backTo(){
    this.navCtrl.pop();
  }
//加载更多
  doLoadMore(infiniteScroll){
    this.getbigsale(infiniteScroll);
  }

  backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }
  
  gotoGood(id){
    if(this.storage.get('token')){
      this.navCtrl.push(ShopgoodsinfoPage,{
        id:id
      });
    } else {
    this.navCtrl.push(LoginPage);
    return;
    }
  }

  //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
        this.pageIndex =1;
        this.list = [];
        this.getbigsale('');
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }


}