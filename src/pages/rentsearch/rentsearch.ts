import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
import {RentsaleinfoPage} from '../rentsaleinfo/rentsaleinfo';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-rentsearch',
  templateUrl: 'rentsearch.html',
})
export class RentsearchPage {
public LoginPage = LoginPage;
  houseInfo = [];
  houseType = "";
  nature = "";
  pageIndex = 1;
  item = "";
  flag=true;
  horder = "";
  search = "";
  public currentPlaceCode;
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http,public loadingCtrl: LoadingController) {
    
  }
 
    ionViewWillLoad() {
    
            this.houseType = "2";
            this.getSaleInfo('');
   
  }

  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  ionViewDidLoad() {
    this.currentPlaceCode = this.storage.get('currentPlaceCode')
    this.clickCSSTitle();
  }
//房屋类型
changeType(){
  this.houseInfo;
}
    //搜索
      onSearchKeyUp(event){
     if("Enter"==event.key){
       this.houseInfo=[];
       this.pageIndex=1;
      this.getSaleInfo("");
     }
  }
  getSaleList(){
    this.houseInfo=[];
       this.pageIndex=1;
      this.getSaleInfo("");

  }
  getSaleInfo(infiniteScroll){
    
    // var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=" + this.currentPlaceCode + "&type=" + this.houseType + 
        // '&pricemin=&pricemax=&room=&spacemin=&spacemax=&nature=' + this.nature + "&search=" + this.search + "&horder=" + this.horder;
    var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=4403&type=" + this.houseType + 
        '&pricemin=&pricemax=&room=&spacemin=&spacemax=&nature=' + this.nature + "&search=" + this.search + "&horder=" + this.horder;
    console.log(api)
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        // alert(this.search);
        this.houseInfo = this.houseInfo.concat(data.list);
        console.log(this.houseInfo);
        if(infiniteScroll){
            //告诉ionic 请求数据完成
              this.pageIndex++;
            infiniteScroll.complete();
            if(data.list.length<10){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
      } else {
        alert(data.errmsg)
      }
    }); 
  }

  doLoadMore(infiniteScroll){
    this.getSaleInfo(infiniteScroll);
  }

  clickCSSTitle(){
    var that = this;
    $('#time').click(function () {
      if($(this).attr("class") == "type"){
        $(this).attr("class","type current");
        $('#price').attr("class","type");
        $('#space').attr("class","type");
        that.flag = true;
        that.houseInfo = [];
      }
      if($('#space').children("img").length == 1){
        $('#space').children("img").remove();
        $('#space').prepend("<img src='assets/imgs/gray.png'>");
      }
      if($('#price').children("img").length == 1){
        $('#price').children("img").remove();
        $('#price').prepend("<img src='assets/imgs/gray.png'>")
      }
      if($(this).children("img").length == 1){
        $(this).children("img").remove();
        if(that.flag){
          $(this).prepend("<img src='assets/imgs/blue.png'>")
        } else {
          $(this).prepend("<img src='assets/imgs/blue.png' style='transform:rotate(180deg);margin-top:0.32rem;'>")
        }
        that.flag = !that.flag;
      }
      // $(this).append('<img src="assets/imgs/order.png">');

      if(that.flag){
        that.horder = "time"
      } else {
        that.horder = "time-"
      }
      that.houseInfo=[];
      that.pageIndex=1;
      that.getSaleInfo("");
    })

    $('#space').click(function () {
      if($(this).attr("class") == "type"){
        $(this).attr("class","type current");
        $('#price').attr("class","type");
        $('#time').attr("class","type");
        that.flag = true;
        that.houseInfo = [];
      }
      if($('#time').children("img").length == 1){
        $('#time').children("img").remove();
        $('#time').prepend("<img src='assets/imgs/gray.png'>");
      }
      if($('#price').children("img").length == 1){
        $('#price').children("img").remove();
        $('#price').prepend("<img src='assets/imgs/gray.png'>");
      }
      if($(this).children("img").length == 1){
        $(this).children("img").remove();
        if(that.flag){
          $(this).prepend("<img src='assets/imgs/blue.png'>")
        } else {
          $(this).prepend("<img src='assets/imgs/blue.png' style='transform:rotate(180deg);margin-top:0.32rem;'>")
        }
        that.flag = !that.flag;
      }

      // $(this).append('<img src="assets/imgs/order.png">');

      if(that.flag){
        that.horder = "space"
      } else {
        that.horder = "space-"
      }
      that.houseInfo=[];
      that.pageIndex=1;
      that.getSaleInfo("");
    })

    $('#price').click(function () {
      if($(this).attr("class") == "type"){
        $(this).attr("class","type current");
        $('#space').attr("class","type");
        $('#time').attr("class","type");
        that.flag = true;
        that.houseInfo = [];
      }
      if($('#space').children("img").length == 1){
        $('#space').children("img").remove();
        $('#space').prepend("<img src='assets/imgs/gray.png'>");
      }
      if($('#time').children("img").length == 1){
        $('#time').children("img").remove();
        $('#time').prepend("<img src='assets/imgs/gray.png'>");
      }
      if($(this).children("img").length == 1){
        $(this).children("img").remove();
        if(that.flag){
          $(this).prepend("<img src='assets/imgs/blue.png'>")
        } else {
          $(this).prepend("<img src='assets/imgs/blue.png' style='transform:rotate(180deg);margin-top:0.32rem;'>")
        }
        that.flag = !that.flag;
      }

      // $(this).append('<img src="assets/imgs/order.png">');

      if(that.flag){
        that.horder = "price"
      } else {
        that.horder = "price-"
      }
      that.houseInfo=[];
      that.pageIndex=1;
      that.getSaleInfo("");
    })
  }

    
    
    //跳转到详情
  goRentsaleInfo(id,type){
    if(this.storage.get('token')){
    this.navCtrl.push(RentsaleinfoPage,{
      houseId:id,
      houseType:type,
      quFen:1,
    })}else{
this.navCtrl.push(LoginPage);
}
 
  }

  backTo(){
    this.navCtrl.pop();
  }
   //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
      this.houseInfo=[];
      this.pageIndex=1;
      this.getSaleInfo("");
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }

}

