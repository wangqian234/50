import { Component,ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import { LoadingController } from 'ionic-angular';

//商品购物列表
import { ShoppinglistPage } from '../shoppinglist/shoppinglist';
// import { ChangeDetectorRef } from '@angular/core'; //更新页面


@IonicPage()
@Component({
  selector: 'page-goodsoderevaluate',
  templateUrl: 'goodsoderevaluate.html',
})

export class GoodsoderevaluatePage {


    public list=[];
    public ShoppinglistPage=ShoppinglistPage;

    public SD_id;//订单编号
    public tradegoods_id;//商品订单编号
    public item;
    public evaluateList={
    trade_Id:'',
    commentGroup:'',
    token : ''
  };
    public shopgrade={
    commentgroup:'',
    goods_satisfactionlevel:0,
    goods_serviceattitude:0,
    goods_deliveryspeed:0
  };

     //定义token
  public token=this.storage.get('token');
  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;//http://test.api.gyhsh.cn/api/tradegoods/add?pageSize=10&pageIndex=1&trade_State=0&token=111
 
  constructor(public storage:StorageProvider,public navCtrl: NavController,public navParams: NavParams,public http:Http,public loadingCtrl: LoadingController
,public cd: ChangeDetectorRef, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        this.SD_id=navParams.get('tradeId');//订单编号
        this.tradegoods_id=navParams.get('tradegoodsId');//商品订单编号
        this.item=navParams.get('item');//商品

  }
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
        this.getRem();
        this.getdetaillist();
        //this.getNum();
  }
    ionViewWillEnter() {//钩子函数，将要进入页面的时候触发
  }
  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
  getdetaillist(){
  }
  addEvaluate(){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
      var j=3;
      var api = this.aa+'/api/tradegoods/add';
      this.evaluateList.commentGroup="〢"+this.tradegoods_id+"〡"+this.shopgrade.goods_satisfactionlevel+"〡"+
      this.shopgrade.goods_serviceattitude+"〡"+this.shopgrade.goods_deliveryspeed+"〡"+this.shopgrade.commentgroup;
      this.evaluateList.trade_Id=this.SD_id;
      this.evaluateList.token = this.token;
      var date = this.evaluateList;
      this.http.post(api,this.evaluateList).map(res => res.json()).subscribe(data =>{
      loading.dismiss();
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加评论成功！");
        this.navCtrl.setRoot(ShoppinglistPage,{id:4});
      }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.addEvaluate();
          }
      } else {
        alert("添加失败！");
        this.navCtrl.setRoot(ShoppinglistPage,{id:4});
      }
    });
  }
  ionViewDidLoad() {
    this.getNum();
  }
    getNum(){
    var _this = this;
      $('#serlevel').each(function () {
        $(this).find('.pj_xx p').on('click', function () {
          var clickedStar = $(this);
          var stars = clickedStar.parent().find('p');
          var score = +clickedStar.attr('data-score');
          for (var i = 0; i < stars.length; i++) {
            if (i < score) {
              stars.eq(i).addClass('no');
            } else {
              stars.eq(i).removeClass('no');
            }
          }
          _this.shopgrade.goods_satisfactionlevel= score;//shopgrade.goods_satisfactionlevel
        });
      });

      $('#serattitude').each(function () {
     
        $(this).find('.pj_xx p').on('click', function () {
          var clickedStar = $(this);
          var stars = clickedStar.parent().find('p');
          var score = +clickedStar.attr('data-score');
          for (var j = 0; j < stars.length; j++) {
            if (j < score) {
              stars.eq(j).addClass('no');
            } else {
              stars.eq(j).removeClass('no');
            }
          }
          _this.shopgrade.goods_serviceattitude = score;//shopgrade.goods_serviceattitude
        });
      });

      $('#serspeed').each(function () {
        $(this).find('.pj_xx p').on('click', function () {
          var clickedStar = $(this);
          var stars = clickedStar.parent().find('p');
          var score = +clickedStar.attr('data-score');
          for (var k = 0; k < stars.length; k++) {
            if (k < score) {
              stars.eq(k).addClass('no');
            } else {
              stars.eq(k).removeClass('no');
            }
          }
          _this.shopgrade.goods_deliveryspeed = score;
        });
      });
  }

  backTo(){
    this.navCtrl.pop();
  }

}
