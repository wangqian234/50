//高海乐
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,App, Slides  } from 'ionic-angular';
import $ from 'jquery';
import {Http,Jsonp}from '@angular/http';
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
import {ShopmalllistPage} from '../shopmalllist/shopmalllist';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//地区选择页
import { PersonalPage } from '../personal/personal';
//返回首页
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

//返回首页
import { HomePage } from '../home/home';


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
  public l=[];
  public SalePage = SalePage;

  public wid;
  public len=0;
  public lunboList=[];
  public tuangouList=[];
  public tubList=[];
  public tuijList=[];
  public shoplist=[];
  public keywords="";
  public currentPlace = "";
  public currentPlaceCode = "";
  public changePlace = "";
  public shopKeyList = [];
   HomePage = HomePage;
   tuiList = [];


  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;

    //定义token
  public token=this.storage.get('token');
    public TabsPage = TabsPage;
  //构造函数
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider,private geolocation: Geolocation,
  public app: App) {

  } 
  //主页面加载函数 
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    this.getShop();
    this.getShopGoods();
    if(this.storage.get("shopKewWords")){
        this.shopKeyList = this.storage.get("shopKewWords");
    }
    this.listenTouch();
  }
  
  //自带函数
  ionViewDidLoad() {
    $('.facediv li:nth-of-type(1)').attr("class","activety");
  }

  ionViewDidEnter(){
    this.currentPlace = this.storage.get("currentPlace");
    this.currentPlaceCode = this.storage.get('currentPlaceCode')
    alert(this.currentPlace)
    this.storage.set('tabs','444');
    this.clickFun();
    this.shopKeyList = this.storage.get("shopKewWords");
  }


    //获取商城首页
    getShop(){
      var api = this.aa+'/api/index/list?curCityCode='+this.currentPlaceCode;
      this.http.get(api).map(res => res.json()).subscribe(data =>{
        if(data.json['data_Banner'].errcode == 0 &&data.json['data_Banner'].errmsg == 'OK'){
          this.tuiList=data.json["data_Banner"].list;
          this.tuangouList=data.json['data_Modules'].list; 
          this.len=this.tuangouList.length;
          this.tubList=data.json['data_Sort'].list;
          this.tuijList=data.json['data_Recommend'].list;
          this.carousel();
        }else{
          alert(data.errmsg)
        }
      })
    }
    //获取商城首页分类的商品
    getShopGoods(){
     //初始显示旅游服务的商品列表
     var api = this.aa+'/api/goods/index_list?curCityCode='+ this.currentPlaceCode+'&goods_Type=21'; //21为旅游商品的id
        this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode === 0 && data.errmsg ==="OK"){
          this.shoplist=data.list; 
          console.log(data);
        }else{
          alert(data.errmsg);
        }
      })
    }

  clickFun(){
    $(".sos_tanc").click(function(){
        $(".sousuo").css("display","block")
        $(".shouye").css("display","none")
        $(".shopcontentdiv").css("display","none")
        $(".remen_sos").css("display","block")
        $(".ios .tabs .tabbar").css("display","none");
    })
  }

  //控制搜索页面的显示
  fanhui(){
      $(".sousuo").css("display","none")
       $(".shouye").css("display","block")
       $(".shopcontentdiv").css("display","block")
       $(".remen_sos").css("display","none")
       $(".ios .tabs .tabbar").css("display","flex");
  }
  doSomeThing(){
   this.doReserch();
  }

  //出发箭头
  clickEvent(){
    var index = $(event.target).attr("index");
    console.log(index);
    var rem = index * 7.5 + 'rem';
    console.log(rem)
    $('.jiantou_button').css("left",rem)
  }
  //商城首页查询商品列表
  getshoplist(id,i){
    $(".facediv li").removeAttr("class");
    var span = ".facediv li:nth-of-type(" + ++i +")"
    $(span).attr("class","activety");
    var that =this;
     var api = this.aa+'/api/goods/index_list?curCityCode='+this.currentPlaceCode+'&goods_Type='+id;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode=== 0 && data.errmsg==="OK"){
      that.shoplist=data.list;
    }else{
      alert(data.errmsg);
    }
    })
  }

  clearShopKey(){
    this.storage.remove("shopKewWords");
    this.shopKeyList = [];
  }
  //输入框搜索，跳转到列表详情界面
  doReserch(){
    var key = [];
    if(this.storage.get("shopKewWords")){
      key = this.storage.get("shopKewWords");
      key.push(this.keywords);
      this.storage.set("shopKewWords",key);
    } else {
      key.push(this.keywords)
      this.storage.set("shopKewWords",key);
    }
    this.navCtrl.push(ShopmalllistPage ,{
      keywords: this.keywords,
    })
  }

  searchFromKey(key){
    this.navCtrl.push(ShopmalllistPage ,{
      keywords: key,
    })
  }

  onSearchKeyUp(event){
    if("Enter"==event.key){
     this.doReserch();
    }
  }

  //跳转到商品详情页面
  goGoodsInfo(id){
    console.log(this)
    if(this.storage.get('token')){
      this.navCtrl.push(ShopgoodsinfoPage,{id:id});
      } else {
        this.navCtrl.push(LoginPage);
        return;
      }
  }

  gotoShopGood(id){
    this.navCtrl.push(ShopgoodsinfoPage,{
      id:id
    })
  }

  // ionViewWillLeave(){
  //  this.node.empty();
  // }

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
  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    console.log("w等于",w)
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  backToHere(){
     this.app.getRootNav().push(TabsPage);
  }
  backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }

    //轮播图开始
    width = $(window).width();
    height = 3.25;
    scroll = null;//滚动框div
    pagination = null;//页码容器
    currentIndex = 1;//当前图片索引
    timer = null;
    wait = 3000;//轮播间隔
    onMove = false;
    node = $(".vo_carousel");
    imgUrls = this.tuijList;
    height11 = "3.25rem";

    carousel(){
        //创建DOM结构
        this.createCarouselDom();
        //创建右下角图片索引
        this.createPagination();
        //开启轮播图
        this.start();
    }

    //创建轮播图的DOM结构
    createCarouselDom () {
        var len = this.tuijList.length;
        if (len == 0) {
            return;
        }
        this.scroll = $('<div class="scroll"></div>');
        var $imgUl = $('<ul></ul>');
        $imgUl.css({ 'width': this.width * len + 1, 'height': this.height +"rem" });
        for (var i = 0; i < len; i++) {
            var $li = $('<li></li>');
            var $img = $('<img src=' + this.tuijList[i].img + ' />');
            $img.on('click', this.gotoShopGood.bind(this,this.tuijList[i].url));
            $img.css({ 'width': this.width+"px", 'height': this.height11 });
            $li.css({ 'left': this.width * (i + 1) });
            $li.append($img);
            $imgUl.append($li);
        }
        var firstImg = $imgUl.children().first().clone(true);
        var lastImg = $imgUl.children().last().clone(true);
        lastImg.css('left', 0);
        firstImg.css('left',parseInt(this.width) * this.currentIndex)
        $imgUl.prepend(lastImg);
        $imgUl.append(firstImg);
        this.scroll.append($imgUl);
        this.node.append(this.scroll);
    }

    //创建页码容器
    createPagination () {
        var $pagination = $('<div class="pagination"></div>');
        for (var i = 0; i < this.tuijList.length; i++) {
            var $page = $('<div class="page"></div>');
            $page.on('click', this.handlePageClick.bind(this, i + 1));
            $pagination.append($page);
        }
        this.pagination = $pagination;
        this.node.append(this.pagination);
        $pagination.css("margin-left",-parseInt($pagination.width())/2)
    }

    //处理点击页码事件
    handlePageClick (i) {
        if (this.onMove) {
            return;
        }
        this.currentIndex = i;
        this.update(false);
    }

    //点击左箭头
    handleLeftArrowClick () {
        if (this.onMove) {
            return;
        }

        this.currentIndex--;
        if (this.currentIndex == -1) {
            this.currentIndex = this.tuijList.length - 1;
        }

        this.update(true);
    }

    //点击右箭头
    handleRightArrowClick () {
        if (this.onMove) {
            return;
        }

        this.currentIndex++;

        this.update(false);
    }

    update (boo) {
      var that = this;
      clearInterval(that.timer);
      that.updatePagination();
      that.onMove = true;
      that.scroll.animate({ scrollLeft: parseInt(that.width) * that.currentIndex }, 500, function () {
            that.onMove = false;
            console.log('update: ', that.currentIndex);
            if (that.currentIndex === that.tuijList.length) {
                that.currentIndex = 0;
                that.scroll.scrollLeft(0);
            }
            that.setTimer();
        });
    }

    //更新页码
    updatePagination () {
        this.pagination.children().eq(this.currentIndex - 1).addClass('active').siblings().removeClass('active');
    }

    //设置定时器
    setTimer () {
        var that = this;
        that.timer = setInterval(function () {

            //更新当前图片索引和页码
            that.currentIndex++;
            if (that.currentIndex > that.tuijList.length) {
                that.currentIndex = 1;
            }
            that.updatePagination();
            that.onMove = true;
            that.scroll.animate({ scrollLeft: parseInt(that.width) * that.currentIndex + "px" }, 500, function () {
                that.onMove = false;
                //如果是最后一张图片，直接跳到第0张
                if (that.currentIndex === that.tuijList.length) {
                    that.currentIndex = 0;
                    that.scroll.scrollLeft(0);
                }
            });
        }, 3000);
    }

    start () {
        //开始时先显示第一张图片
        this.scroll.scrollLeft(this.width);
        this.updatePagination();
        this.setTimer();

    }

//判断左右滑动事件
    listenTouch(){
      var startX;
      var startY;
      var moveEndX;
      var moveEndY;
      var that = this;
        //给body强制定义高度
    　　var $body = $(".vo_carousel");
    　　$body.css("height", "3.25rem"); //重要代码
        $body.on("touchstart", function(e) {
    　　　　//e.preventDefault();//会使所有的触屏都失效，不能用
    　　　　startX = e.originalEvent.changedTouches[0].pageX,
    　　　　startY = e.originalEvent.changedTouches[0].pageY;
    　　});
    　　$body.on("touchmove", function(e) {
            var X;
            var Y;
    　　　　//e.preventDefault();
    　　　　moveEndX = e.originalEvent.changedTouches[0].pageX,
    　　　　moveEndY = e.originalEvent.changedTouches[0].pageY,
    　　　　X = moveEndX - startX,
    　　　　Y = moveEndY - startY;
    　　　　if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
    　　　　　　that.handleLeftArrowClick();
    　　　　}
    　　　　else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
    　　　　　　that.handleRightArrowClick();
    　　　　}
    　　});
    }

}
