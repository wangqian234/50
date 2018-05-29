import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Jsonp}from '@angular/http';
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//商品详情页
import {ShoppingevaluatePage} from '../shoppingevaluate/shoppingevaluate'
//购物车
import { CartPage} from '../cart/cart'
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';
//店铺详情页面
import { ShopinfoPage } from '../shopinfo/shopinfo';
/**
 * Generated class for the ShopgoodsinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopgoodsinfo',
  templateUrl: 'shopgoodsinfo.html',
})
export class ShopgoodsinfoPage {
  //跳转页面
    public ShoppingevaluatePage=ShoppingevaluatePage;
    public CartPage = CartPage;
    public ShopbuyPage=ShopbuyPage;
    public ShopinfoPage=ShopinfoPage;
    public ShopgoodsinfoPage=ShopgoodsinfoPage;

    public sid;
    public wid;
    //定义需要隐藏的标志变量
    public showpingj =false;
    //接收数据的 list
    public list =[];
    public rlist =[];
    public goodMlist=[];
    public dataGlist=[];
    public dataSlist =[];
    public strs=[];
    public goodSize;
    public buylist={
    type:'',
    gId:'',
    gsId:'',
    goodsNum:1,
    token:'',
  }
  //库存数量判断
  public ifList={
    gId:"",
    gsId:"",
    goodsNum:1,
  }
  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
    //定义token
  public token=this.storage.get('token');
    //post方法添加购物车时传的数据
  public addcarList={
    gId: "1",
    gsId: "1",
    goodsNum: 1,
    token: "",
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider,
  public loadingCtrl: LoadingController) {

    this.wid=this.navParams.get("id")
      alert(this.wid)
}
    ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
      let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
loading.present();
      //显示商品详情页面
      this.goodsInfo();
      this.recommend();
      loading.dismiss();
  }
  //显示商品详情页面
  goodsInfo(){
    var that =this;
    var j=3;
    var api = this.aa +'/api/Goods/info?goods_Id='+this.navParams.get("id")+'&token='+this.token
    console.log(this.token)
    this.http.get(api).map(res =>res.json()).subscribe(data =>{  //缺少成功和失败的判断
        that.goodMlist = data.json['good_Model'].model;
        $("#tuwen").html(data.json['good_Model'].model.detail);
        console.log($("#tuwen"));
        this.sid=data.json['good_Model'].model.shopid;
        this.fenge(data.json['good_Model'].model.imgsrc_list);

        that.dataGlist = data.json.data_group.list;

        that.dataSlist = data.json.data_Sizes.list[0]; 
        this.addcarList.gsId=data.json.data_Sizes.list[0].id; //获取商品规格id        
        that.goodSize=data.json.data_Sizes.list[0].id;
      
    })
  }
//购买数量判断
ifEnough(){
  this.ifList.gId=this.wid;
  this.ifList.gsId=this.goodSize;
  this.ifList.goodsNum=this.buylist.goodsNum;
  var date = this.ifList;
  var api = this.aa+'/api/goods_size/update'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
       
         //alert("可以继续添加!");
      }else{
        alert(data.errmsg);
      }
     })

}

//推荐商品列表
 recommend(){   
    var api2 = this.aa+'/api/goods/list?curCityCode=4403';
     
     this.http.get(api2).map(res => res.json()).subscribe(data2 =>{
       if(data2.errmsg == 'OK'){
         this.rlist = data2.list;
         console.log(data2);
     } else {
        alert(data2.errmsg);
     }
     })
 }
//进入店铺
enterShop(wid,sid){
//  alert("店铺id"+this.sid);
//   alert("id"+this.wid);
  this.navCtrl.push(ShopinfoPage,{
    wid: this.wid,
    sid: this.sid,
    

  });
}

//轮播图
fenge(str){ 
 
 this.strs=str.split(","); //字符分割
//alert(this.strs[0]);

}
  //加入购物车函数
   addcart(){ 
    this.addcarList.token=this.token;
    this.addcarList.gId=this.navParams.get("id");
        
    console.log(this.token)
    var date = this.addcarList;
    var api = this.aa+'/api/usercart/add'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
         alert("成功加入购物车");
      }else{
        alert(data.errmsg);
      }
     })
  }
  //显示商品评价列表
  getshopinfo(id){
    this.showpingj=!this.showpingj;
    var that = this;
    var api = this.aa +'/api/tradegoods/list?pageSize=10&pageIndex=1&goodsId='+id;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
         this.list= data.list;
      }else{
        alert(data.errmsg);
      }
    })
  }
 //购买
   buygoods(){ 
    this.buylist.token=this.token;
    this.buylist.gId=this.navParams.get('id');
    this.buylist.type="detail";
    this.buylist.gsId=this.goodSize;
        var j=3;
    console.log(this.token)
    var date = this.buylist;
     //alert(JSON.stringify(date));
    var api = this.aa+'/api/goods_param/add'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        //alert("post成功!");
         //跳转前验证
      var api=this.aa+'/api/goods/buy_list?caId=1&token='+this.token;
            this.http.get(api).map(res => res.json()).subscribe(data =>{
               //if(data.errcode === 0 && data.errmsg === 'OK'){
                  //alert("可以购买!");
        this.navCtrl.push(ShopbuyPage,{
          wid: this.buylist.gId,
          sid: this.buylist.gsId,
          gnum:this.buylist.goodsNum,

  });
      
            })
      }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.buygoods();
          }
      }
      else{
        alert(data.errmsg);
      }
     });
   
     
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopgoodsinfoPage');
  }

  incCount(){    
    ++this.addcarList.goodsNum;
    ++this.buylist.goodsNum;
    this.ifEnough();
  }

  //数量变化  双向数据绑定
  decCount(){
    if(this.addcarList.goodsNum>1){
      --this.addcarList.goodsNum;
      --this.buylist.goodsNum;

    }
  }

  backTo(){
    this.navCtrl.pop();
  }
}
