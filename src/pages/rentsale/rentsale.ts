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
//登录页面
import { LoginPage } from '../login/login';
import {ShopinfoPage} from '../shopinfo/shopinfo';
import {ShopgoodsinfoPage} from '../shopgoodsinfo/shopgoodsinfo'
@IonicPage()
@Component({
  selector: 'page-rentsale',
  templateUrl: 'rentsale.html',
})
export class RentsalePage {
  public url;
  public Id;

  focusList = [
      'assets/imgs/rent1.jpg',
      'assets/imgs/rent2.jpg',
      'assets/imgs/rent3.jpg'];
  curCityCode = "";
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
     this.curCityCode = "4403";
  }
  
  ionViewWillLoad(){
    // //确认登录状态
    // if(this.storage.get('token')){

    // } else {
    // this.navCtrl.push(LoginPage);
    // }
  }

  ionViewDidLoad() {
    this.getFirstHouse();
    this.currentPlace = this.storage.get("currentPlace");
    this.offent = $('#testcontent').offset();
    console.log("这个offent是",this.offent)
  }
  //轮播图获取
  getFocusList(){
    var api = this.config.apiUrl + '/api/rental/list_banner?curCityCode='+this.curCityCode;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        this.focusList= data.list
      }else{
        alert(data.errmsg)
      }
    })
  }
  //轮播图获取详情
  getInfo(url){
    this.url=url.substring(0,3);
    this.Id = url.substring(3,)
    if(url==="HRSHome"){
      this.navCtrl.push(RentsalePage)
    }else if(this.url==="gId"){
      this.navCtrl.push(ShopgoodsinfoPage,{id:this.Id})
    }else if(this.url ==="sId"){
      this.navCtrl.push(ShopinfoPage,{sid:this.Id})
    }else if(this.url === "rez"){
     // this.navCtrl.push()
    }else if(this.url === "res"){
     // this.navCtrl.push()
    }
  }
 paymentEvent(trade_state){

  //   let loading = this.loadingCtrl.create({
	//     showBackdrop: true,
  //   });
  // loading.present();


   this.housType = trade_state;
   var api = this.config.apiUrl + "/api/rental/list_type?pageSize=6&pageIndex=1&curCityCode=" + this.curCityCode + "&type=" + trade_state;
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
    //loading.dismiss();
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
  //   let loading = this.loadingCtrl.create({
	//     showBackdrop: true,
  //   });
  // loading.present();
    $(".showMore").css("display","none")
    var api = this.config.apiUrl + "/api/rental/list_type?pageSize=10&pageIndex=1&curCityCode=" + this.curCityCode + "&type=1";
    this.http.get(api).map(res => res.json()).subscribe(data => {
      //loading.dismiss();
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

  //跳转到租售详情页面
  goRentsaleInfo(id,type){
     this.navCtrl.push(RentsaleinfoPage,{
        rental_id:id,
        type:type
    });
  }

  doLoadMore(infiniteScrolle){
    this.getHouseInfo(infiniteScrolle);
  }

  getHouseInfo(infiniteScroll){
    var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=" + this.curCityCode + "&type=" + this.housType;
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
}
