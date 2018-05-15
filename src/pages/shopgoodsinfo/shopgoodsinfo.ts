import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Jsonp}from '@angular/http';
import $ from 'jquery';
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
    //定义需要隐藏的标志变量
    public showpingj =false;
    //接收数据的 list
    public list =[];
    public goodMlist=[];
    public dataGlist=[];
    public dataSlist =[];
    public strs=[];
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
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }
    ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
          var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
      //显示商品详情页面
      this.goodsInfo();
  }
  //显示商品详情页面
  goodsInfo(){
    var that =this;
    var api = this.aa +'/api/Goods/info?goods_Id='+this.navParams.get("id")+'&token='+this.token
    console.log(this.token)
    this.http.get(api).map(res =>res.json()).subscribe(data =>{  //缺少成功和失败的判断
        console.log(JSON.stringify(data))
        that.goodMlist = data.json['good_Model'].model;
        $("#tuwen").html(data.json['good_Model'].model.detail);
        this.fenge(data.json['good_Model'].model.imgsrc_list);
        that.dataGlist = data.json.data_group.list;
        that.dataSlist = data.json.data_Sizes.list[0];  
      
    })
  }

fenge(str){ 
 
 this.strs=str.split(","); //字符分割
//alert(this.strs[0]);

}
  //加入购物车函数
   addcart(){ 
    this.addcarList.token=this.token;
    console.log(this.token)
    var date = this.addcarList;
    alert(JSON.stringify(date))
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
         alert(JSON.stringify(this.list));
      }else{
        alert(data.errmsg);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopgoodsinfoPage');
  }

  incCount(){    
    ++this.addcarList.goodsNum;
  }

  //数量变化  双向数据绑定
  decCount(){
    if(this.addcarList.goodsNum>1){
      --this.addcarList.goodsNum;
    }
  }

  backTo(){
    this.navCtrl.pop();
  }
}
