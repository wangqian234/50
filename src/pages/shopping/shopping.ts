//高海乐
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, App, Slides } from 'ionic-angular';
import $ from 'jquery';
import { Http, Jsonp } from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//商品分类页
import { ShopsortPage } from '../shopsort/shopsort';
//商品详情页

import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
//商品购物车

import { ShoppingdetailPage } from '../shoppingdetail/shoppingdetail';
//商品详情页
import { CartPage } from '../cart/cart';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//热卖界面
import { BigsalePage } from '../bigsale/bigsale';
//限时促销
import { SalePage } from '../sale/sale';
//团购界面

import { GroupbuylistPage } from '../groupbuylist/groupbuylist';
//搜索出的商品列表页
import { ShopmalllistPage } from '../shopmalllist/shopmalllist';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//地区选择页
import { PersonalPage } from '../personal/personal';
//返回首页
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

//返回首页
import { HomePage } from '../home/home';
import Swiper from 'swiper';


declare var BMap;
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  @ViewChild("shopslide") slides: Slides;
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;

  public ShoppingdetailPage = ShoppingdetailPage;
  public CartPage = CartPage;

  //页面跳转
  public ShopsortPage = ShopsortPage;
  public ShopgoodsinfoPage = ShopgoodsinfoPage;
  public BigsalePage = BigsalePage;
  public GroupbuylistPage = GroupbuylistPage;
  public PersonalPage = PersonalPage;
  public LoginPage = LoginPage;
  //定义接收数据的list
  public l = [];
  public SalePage = SalePage;

  public wid;
  public len = 0;
  public lunboList = [];
  public tuangouList = [];
  public tubList = [];
  public tuijList = [];
  public shoplist = [];
  public keywords = "";
  public currentPlace = "";
  public currentPlaceCode = "";
  public changePlace = "";
  public shopKeyList = [];
  HomePage = HomePage;
  tuiList = [];


  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;

  //定义token
  public token = this.storage.get('token');
  public TabsPage = TabsPage;
  //构造函数
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public jsonp: Jsonp,
    public httpService: HttpServicesProvider,/*引用服务*/public config: ConfigProvider, public storage: StorageProvider, private geolocation: Geolocation,
    public app: App) {

  }
  //主页面加载函数 
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    this.getShop(this.initSwiper);
    this.getShopGoods();
    if (this.storage.get("shopKewWords")) {
      this.shopKeyList = this.storage.get("shopKewWords");
    }
    // this.listenTouch();
  }

  initSwiper() {
    var mySwiper = new Swiper('.shopswiper', {
      direction: 'horizontal',
      loop: true,
      autoplayDisableOnInteraction: false,
      preventLinksPropagation: true,
      freeMode : false,
      freeModeMomentum : true,
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      // 如果需要分页器
      pagination: {
        el: '.shoppagination',
        paginationClickable :true,
        clickable :true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
      },
    })

    //判断左右滑动事件
    // var startX;
    // var startY;
    // var moveEndX;
    // var moveEndY;
    // var that = this;
    // var $body = $(".shopswiper");
    // $body.css("height", "3.25rem");
    // $body.on("touchstart", function (e) {
    //   startX = e.originalEvent.changedTouches[0].pageX,
    //   startY = e.originalEvent.changedTouches[0].pageY;
    // });
    // $body.on("touchmove", function (e) {
    //   var X;
    //   var Y;
    //   moveEndX = e.originalEvent.changedTouches[0].pageX,
    //   moveEndY = e.originalEvent.changedTouches[0].pageY,
    //   X = moveEndX - startX,
    //   Y = moveEndY - startY;
    //   if (Math.abs(X) > Math.abs(Y) && X > 0) {
    //     if(mySwiper.slidePrev()){
    //       mySwiper.slidePrev();
    //     }
    //   }
    //   else if (Math.abs(X) > Math.abs(Y) && X < 0) {
    //     console.log(mySwiper.slideNext)
    //     if(mySwiper.slideNext){
    //       mySwiper.slideNext();
    //     }
    //   }
    // });
  }

  //自带函数
  ionViewDidLoad() {
    this.currentPlace = this.storage.get("currentPlace");
    this.currentPlaceCode = this.storage.get('currentPlaceCode')
    $('.facediv li:nth-of-type(1)').attr("class","activety");
  }

  ionViewDidEnter() {
    this.currentPlace = this.storage.get("currentPlace");
    this.currentPlaceCode = this.storage.get('currentPlaceCode');
    this.storage.set('tabs', '444');
    this.clickFun();
    this.shopKeyList = this.storage.get("shopKewWords");
    $('.swiper-container').autoplay = {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      };
  }

  //获取商城首页
  getShop(callback) {
    // $(".spinnerbox").fadeIn(200);
    // $(".spinner").fadeIn(200);(200);
    var api = this.aa + '/api/index/list?curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data => {
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.json['data_Banner'].errcode == 0 && data.json['data_Banner'].errmsg == 'OK') {
        this.tuiList = data.json["data_Banner"].list;
        this.tuangouList = data.json['data_Modules'].list;
        this.len = this.tuangouList.length;
        this.tubList = data.json['data_Sort'].list;
        this.tuijList = data.json['data_Recommend'].list;
        if (callback) {
          callback();
        }
        // this.carousel();
      } else {
        alert(data.errmsg)
      }
    })
  }
  //获取商城首页分类的商品
  getShopGoods() {
    //初始显示旅游服务的商品列表
    var api = this.aa + '/api/goods/index_list?curCityCode="4403"&goods_Type=21';
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === "OK") {
        this.shoplist = data.list;
        console.log(data);
      } else {
        alert(data.errmsg);
      }
    })
  }

  clickFun() {
    $(".sos_tanc").click(function () {
      $(".sousuo").css("display", "block")
      $(".shouye").css("display", "none")
      $(".shopcontentdiv").css("display", "none")
      $(".remen_sos").css("display", "block")
      $(".ios .tabs .tabbar").css("display", "none");
    })
  }

  //控制搜索页面的显示
  fanhui() {
    $(".sousuo").css("display", "none")
    $(".shouye").css("display", "block")
    $(".shopcontentdiv").css("display", "block")
    $(".remen_sos").css("display", "none")
    $(".ios .tabs .tabbar").css("display", "flex");
  }
  doSomeThing() {
    this.doReserch();
  }

  //出发箭头
  clickEvent() {
    var index = $(event.target).attr("index");
    console.log(index);
    var rem = index * 7.5 + 'rem';
    console.log(rem)
    $('.jiantou_button').css("left", rem)
  }
  //商城首页查询商品列表
  getshoplist(id, i) {
    $(".facediv li").removeAttr("class");
    var span = ".facediv li:nth-of-type(" + ++i + ")"
    $(span).attr("class", "activety");
    var that = this;
    var api = this.aa + '/api/goods/index_list?curCityCode="4403"&goods_Type=' + id;
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === "OK") {
        that.shoplist = data.list;
      } else {
        alert(data.errmsg);
      }
    })
  }

  clearShopKey() {
    this.storage.remove("shopKewWords");
    this.shopKeyList = [];
  }
  //输入框搜索，跳转到列表详情界面
  doReserch() {
    var key = [];
    if (this.storage.get("shopKewWords")) {
      key = this.storage.get("shopKewWords");
      key.push(this.keywords);
      this.storage.set("shopKewWords", key);
    } else {
      key.push(this.keywords)
      this.storage.set("shopKewWords", key);
    }
    this.navCtrl.push(ShopmalllistPage, {
      keywords: this.keywords,
    })
  }

  searchFromKey(key) {
    this.navCtrl.push(ShopmalllistPage, {
      keywords: key,
    })
  }

  onSearchKeyUp(event) {
    if ("Enter" == event.key) {
      this.doReserch();
    }
  }

  //跳转到商品详情页面
  goGoodsInfo(id) {
    if (this.storage.get('token')) {
      this.navCtrl.push(ShopgoodsinfoPage, { id: id });
    } else {
      this.navCtrl.push(LoginPage);
      return;
    }
  }

  gotoShopGood(id) {
    this.navCtrl.push(ShopgoodsinfoPage, {
      id: id
    })
  }

  gotoPlace() {
    this.navCtrl.push(PersonalPage, {
      callback: this.myCallbackFunction
    })
  }

  myCallbackFunction = (params) => {
    var that = this;
    return new Promise((resolve, reject) => {
      if (typeof (params) != 'undefined') {
        resolve('ok');
        that.currentPlace = params.changePlace;
        that.currentPlaceCode = params.changePlaceCode;
      } else {
        reject(Error('error'))
      }

    });
  }
  getRem() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    console.log("w等于", w)
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  backToHere() {
    this.app.getRootNav().push(TabsPage);
  }
  backToHome() {
    this.app.getRootNav().push(TabsPage);
  }

}
