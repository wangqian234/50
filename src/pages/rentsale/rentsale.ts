import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController, Loading } from 'ionic-angular';
//房屋详细信息页
import { RentsaleinfoPage } from '../rentsaleinfo/rentsaleinfo';
//地区选择页
import { PersonalPage } from '../personal/personal';
//添加租售信息
import { RentsaleaddPage } from '../rentsaleadd/rentsaleadd';
//我的发布信息
import { RentsalemyPage } from '../rentsalemy/rentsalemy';
//租赁信息列表
import { RentsalelistPage } from '../rentsalelist/rentsalelist';
//房屋搜索
import { RentsearchPage } from '../rentsearch/rentsearch';

//登录页面
import { LoginPage } from '../login/login';
import {ShopinfoPage} from '../shopinfo/shopinfo';
import {ShopgoodsinfoPage} from '../shopgoodsinfo/shopgoodsinfo'

@Component({
  selector: 'page-rentsale',
  templateUrl: 'rentsale.html',
})
export class RentsalePage {
  public url;
  public Id;
  public focusList=[];

  // focusList = [
  //     'assets/imgs/rent1.jpg',
  //     'assets/imgs/rent2.jpg',
  //     'assets/imgs/rent3.jpg'];
  houseInfo;
  showMore = false;
  housType = "1";
  pageIndex=2;
  offent;
  public currentPlace = "";
  public currentPlaceCode = "";

  public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",
    li04:"type"
  };

  RentsaleinfoPage = RentsaleinfoPage;
  PersonalPage = PersonalPage;
  RentsaleaddPage = RentsaleaddPage;
  RentsalemyPage = RentsalemyPage;
  RentsalelistPage = RentsalelistPage;
  public LoginPage = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http,public loadingCtrl: LoadingController) {
  }
  
  ionViewWillLoad(){
    this.getFocusList();
  }
  ionViewDidEnter(){
    this.currentPlace = this.storage.get("currentPlace");
    this.currentPlaceCode = this.storage.get('currentPlaceCode')
    this.storage.set('tabs','true');
    $('.swiper-container').autoplay = {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      };
    $('.swiper-container').autoplayDisableOnInteraction = false;
  }

  ionViewDidLoad() {
    this.getFirstHouse();
    this.currentPlace = this.storage.get("currentPlace");
    this.currentPlaceCode = this.storage.get('currentPlaceCode')
    this.offent = $('#group-content').offset();
  }
  //轮播图获取
  getFocusList(){
    var api = this.config.apiUrl + '/api/rental/list_banner?curCityCode='+this.currentPlaceCode;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        this.focusList= data.list
        console.log(this.focusList)
      }else{
        alert(data.errmsg)
      }
    })
  }
  //轮播图获取详情
  getInfo(url){
    // this.url=url.substring(0,3);
    // this.Id = url.substring(3,)
    // if(url==="HRSHome"){
    //   this.navCtrl.push(RentsalePage)
    // }else if(this.url==="gId"){
    //   this.navCtrl.push(ShopgoodsinfoPage,{id:this.Id})
    // }else if(this.url ==="sId"){
    //   this.navCtrl.push(ShopinfoPage,{sid:this.Id})
    // }else if(this.url === "rez"){
    //  // this.navCtrl.push()
    // }else if(this.url === "res"){
    //  // this.navCtrl.push()
    // }
  }
 paymentEvent(trade_state){
   this.housType = trade_state;
   var api = this.config.apiUrl + "/api/rental/list_type?pageSize=6&pageIndex=1&curCityCode=" + this.currentPlaceCode+ "&type=" + trade_state;
    switch(trade_state){
      case 1:
      this.tabTest={
        li00:"type current",
        li01:"type",
        li02:"type",
        li03:"type",
        li04:"type",
      };
      break;
      case 2:
      this.tabTest={
        li00:"type",
        li01:"type current",
        li02:"type",
        li03:"type",
        li04:"type",
      };
      break;
      case 3:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type current",
        li03:"type",
        li04:"type",
      };
      break;
      case 4:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type",
        li03:"type current",
        li04:"type",
      };
      break;
      case 4:
      this.tabTest={
        li00:"type",
        li01:"type",
        li02:"type",
        li03:"type",
        li04:"type current",
      };
      break;
    }
    $(".showMore").css("display","none")
    console.log(this.offent.top)
    $('.scroll-content').scrollTop(this.offent.top);
  this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseInfo = data.list;
        if(data.list.length == 0){
            $(".showMore").css("display","block")
        }
      } else {
        alert("data.errmsg")
      }
    });
  }

  getFirstHouse(){
    $(".showMore").css("display","none")
    var api = this.config.apiUrl + "/api/rental/list_type?pageSize=10&pageIndex=1&curCityCode=" + this.currentPlaceCode + "&type=1";
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseInfo = data.list;
        if(data.list.length == 0){
            $(".showMore").css("display","block")
        }
      } else {
        alert("data.errmsg")
      }
    });
  }

  gotoList(id){
    this.navCtrl.push(RentsalelistPage,{
      id:id
    })
  }

  searchBoxFn(){

  }

  onSearchKeyUp(event){
    if("Enter"==event.key){
     //进行关键字查找方法
    }
  }

  //跳转到详情
  goRentsaleInfo(id,type){
    if(this.storage.get('token')){
      this.navCtrl.push(RentsaleinfoPage,{
      houseId:id,
      houseType:type,
      quFen:1,
    })
    }else{
      this.navCtrl.push(LoginPage);
    }
  }
  //我的发布信息跳转页面
  goRentsaleadd(){
    if(this.storage.get('token')){
      this.navCtrl.push(RentsaleaddPage)
    }else{
      this.navCtrl.push(LoginPage);
    }
  }
  //跳转到我的发布列表
  goRentsalemy(){
   if(this.storage.get('token')){
      this.navCtrl.push(RentsalemyPage)
    }else{
      this.navCtrl.push(LoginPage);
    }
  }
  doLoadMore(infiniteScrolle){
    this.getHouseInfo(infiniteScrolle);
  }

  getHouseInfo(infiniteScroll){
    var api = this.config.apiUrl + "/api/rental/list_type?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=" +this.currentPlaceCode + "&type=" + this.housType;
    console.log(api)
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseInfo = this.houseInfo.concat(data.list);
        console.log(this.houseInfo)
        if(infiniteScroll){
          //告诉ionic 请求数据完成
          infiniteScroll.complete();
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            // infiniteScroll.enable(false);
            $('.showMore').css('display','block');
          }
        };
      } else {
        alert("data.errmsg")
      }
    });  
  }
    gotoPlace(){
    this.navCtrl.push(PersonalPage, {
        callback: this.myCallbackFunction
    })
  }

  myCallbackFunction  =(params) => {
    var that = this;
     return new Promise((resolve, reject) => {
      if(typeof(params)!='undefined'){
          resolve('ok');
          that.currentPlace = params.changePlace;
          that.currentPlaceCode = params.changePlaceCode;
      }else{

          reject(Error('error'))
      }
            
   });
 }

     //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
        this.getFocusList();
        this.paymentEvent(this.housType);
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }
   //输入框搜索，跳转到列表详情界面
  doReserch() {
    // var key = [];
    // if (this.storage.get("shopKewWords")) {
    //   key = this.storage.get("shopKewWords");
    //   key.push(this.keywords);
    //   this.storage.set("shopKewWords", key);
    // } else {
    //   key.push(this.keywords)
    //   this.storage.set("shopKewWords", key);
    // }
    this.navCtrl.push(RentsearchPage);
    // , {
    //   keywords: this.keywords,
    //  })
  }

}
