//高海乐
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
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

//返回首页
import { HomePage } from '../home/home';



declare var BMap;
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

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


  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;

    //定义token
  public token=this.storage.get('token');
    public TabsPage = TabsPage;
  //构造函数
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider,private geolocation: Geolocation,
  public app: App) {
      this.geolocation1 = Geolocation;
      this.storage.set("currentPlace","深圳市")
    // this.getLunbo();
  } 
  //主页面加载函数 
   ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    this.currentPlace = this.storage.get("currentPlace");
    var that=this;
    var api = this.aa+'/api/index/list?curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
    console.log(data);
     that.lunboList=data.json["data_Banner"].list;
    // alert(JSON.stringify(that.lunboList));

     // console.log(this.lunboList);
     that.tuangouList=data.json['data_Modules'].list; 
        that.len=that.tuangouList.length;
       // console.log(this.tuangouList[1]);
     that.tubList=data.json['data_Sort'].list;
     console.log(that.tubList);
     that.tuijList=data.json['data_Recommend'].list;
     // console.log(this.tuijList);
     })
      //初始显示旅游服务的商品列表
     var api = this.aa+'/api/goods/index_list?curCityCode="4403"&goods_Type=21';
        this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode === 0 && data.errmsg ==="OK"){
          that.shoplist=data.list; 
          console.log(data);
        }else{
          alert(data.errmsg);
        }
      })
      if(this.storage.get("shopKewWords")){
        this.shopKeyList = this.storage.get("shopKewWords");
      }
    }
  //自带函数
  ionViewDidLoad() {
     //this.getPosition();
    //给第一个商品分类hr
    $('.facediv li:nth-of-type(1)').attr("class","activety");
  }

  ionViewDidEnter(){
    $("#sos_tanc").focus(function(){
      $(".remen_sos").css("display","block")
      $(".caid_img").css("display","none")
      $(".fanhui").css("display","block")
    })
    this.shopKeyList = this.storage.get("shopKewWords");
  }

  //控制搜索页面的显示
  fanhui(){
      $(".remen_sos").css("display","none")
      $(".caid_img").css("display","block")
      $(".fanhui").css("display","none")
  }
  doSomeThing(){
   
  }

    getPosition() {
    var that = this;
     this.geolocation.getCurrentPosition().then((resp) => {
      var point = new BMap.Point(resp.coords.longitude,resp.coords.latitude);
      var gc = new BMap.Geocoder();
      gc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        console.log(addComp.city)
        that.storage.set("currentPlace",addComp.city);
      });
       });
}

  /**轮播图 */
  getLunbo(){
   var that=this;  
      that.l=[
        '../assets/imgs/hua.jpg',
        '../assets/imgs/jiaju.jpg',
        '../assets/imgs/hongjiu.jpg',       
      ];   
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
     var api = this.aa+'/api/goods/index_list?curCityCode="4403"&goods_Type='+id;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode=== 0 && data.errmsg==="OK"){
      that.shoplist=data.list;    
      console.log(data);
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

  onSearchKeyUp(event){
    if("Enter"==event.key){
     this.doReserch();
    }
  }

  //跳转到商品详情页面
  goGoodsInfo(id){
     this.navCtrl.push(ShopgoodsinfoPage,{id:id});
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

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    console.log("w等于",w)
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  backToHere(){
     this.app.getRootNav().push(TabsPage);
  }

}
