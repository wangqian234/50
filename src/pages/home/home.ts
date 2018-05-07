import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

//房屋报修
import { RepairaddPage } from '../repairadd/repairadd';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';
//跳入登录页面
import { LoginPage } from '../login/login';
//测试页面跳转到shopmallist
import {TestPage}from '../test/test';
import {ShopmalllistPage}from '../shopmalllist/shopmalllist';
import {ShopsortPage}from '../shopsort/shopsort';
import {SalePage}from '../sale/sale';
import {BigsalePage}from '../bigsale/bigsale';
import {GroupbuyPage}from '../groupbuy/groupbuy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public roomid:any;
  public enSureLoginHome:boolean;

  //发送数据
  public token = '';

  //获得数据
  public roomname = []; /*数组 获取房屋列表*/
  public house = {};    /*对象 默认房屋*/
  public prearr = {};   /*对象 欠费金额与预存款金额*/
  public focusList=[];  /*数组 轮播图*/
  public newsList=[];   /*数组 最新资讯*/
  public publicget=[];  /*数组 公示公告*/

  //跳转页面
  public RepairaddPage=RepairaddPage;
  public BindroomPage=BindroomPage

  constructor(public navCtrl: NavController,public config:ConfigProvider, public navParams: NavParams,public http: Http,public storage:StorageProvider) {
  }

  ionViewWillEnter(){
      //将PX转换为REM
      this.getRem();
      //获取首页轮播图
      this.getFocus();
      if(this.storage.get('token')){
          this.token = this.storage.get('token');
          this.enSureLoginHome = true;
          //获取默认房屋
          this.getHouseDefault();
          //获取最新资讯
          this.getNews();
          //获取最新公告
          this.getPublic();
      } else {
          this.enSureLoginHome = false;
      }

  }
  //轮播图
  getFocus(){ 
    var that=this;  
      that.focusList=[
        '../assets/imgs/slide01.png',
        '../assets/imgs/slide02.png',
        '../assets/imgs/slide03.jpg',
        '../assets/imgs/rent1.png'
      ];
  }
  //测试跳转至商品  
goShop(){

  this.navCtrl.push(TestPage);
}
//测试跳转至分类
goShopSort(){

  this.navCtrl.push(ShopsortPage);
}
  
  getHouseDefault(){
    // var j = 3;  //确定递归次数，避免死循环
    // var api = this.config.apiUrl + '/crm/srq/vuserroom/list_User?token=' + this.storage.get('token');
    // this.http.get(api).map(res => res.json()).subscribe(data =>{
    //   if (data.errcode === 0 && data.errmsg === 'OK') {
    //     this.roomname = data.list;
    //     for ( var i = 0; i <data.list.length; i++){
    //       if(data.list[i].Default == 0){ //状态待定
    //         this.house = data.list[i];
    //         this.roomid = this.roomname[2].Id;
    //         this.getPreArrFee(data.list[i]);
    //         break;
    //       }
    //     }
    //   } else if(data.errcode === 40002) {
    //       j--;
    //       if(j>0){
    //         this.config.doDefLogin();
    //         this.getHouseDefault();
    //       }
    //   } else {
    //     alert(data.errmsg);
    //   }
    //   console.log("获取房屋" + data)
    // });
  }

  //获取到房屋信息后获取预交费
  getPreArrFee(data){
    // var roomId = {'roomId' : data};
    // var api = this.config.apiUrl + '/house/charge/list';方法不确定
    // this.http.post(api,(data)).map(res => res.json()).subscribe(data =>{
    // });
  }

  getNews(){
    // var j = 3;
    // var api = this.config.apiUrl + '/hsh/news/list?pageIndex=1&pageSize=3&type=1&token=' + this.storage.get('token');
    // this.http.get(api).map(res => res.json()).subscribe(data =>{
    //   if (data.errcode === 0 && data.errmsg === 'OK') {
    //     this.newsList = data.list;
    //   } else if(data.errcode === 40002){
    //       j--;
    //       if(j>0){
    //         this.config.doDefLogin();
    //         this.getNews();
    //       }
    //   } else {
    //     alert("data.errmsg")
    //   }
    //    console.log("获取最新资讯" + data)
    // });
  }

  getPublic(){

  }

  changeRoom(){
    alert(this.roomid);
    if(this.roomid === "add"){
      this.navCtrl.push(BindroomPage);
    }
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 50) + 'px';
  }

}
