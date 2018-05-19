//wdh
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ChangeDetectorRef } from '@angular/core'; //更新页面
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';
//店铺详情页面
import { ShopinfoPage } from '../shopinfo/shopinfo';
//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';

/**
 * Generated class for the GroupdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-groupdetail',
  templateUrl: 'groupdetail.html',
})
export class GroupdetailPage {

  public ShopbuyPage=ShopbuyPage;
  public ShopinfoPage=ShopinfoPage;
  public ShopgoodsinfoPage=ShopgoodsinfoPage;
 //定义需要隐藏的标志变量
    public showpingj =false;
  
  public wid;
  public sid;
  public lnum=0;
  public list=[];
  public dataGlist=[];
  public goodMlist=[];
  public dataSlist=[];
  public rlist=[];
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
  public wdh = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,public cd: ChangeDetectorRef,/*引用服务*/public config:ConfigProvider,public loadingCtrl: LoadingController) {
    this.wid=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupdetailPage');
  }
ionViewWillLoad() {

   let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
loading.present();
    
    var that=this;
    var api=this.wdh+'/api/goods/info?goods_Id='+this.wid+'&token='+this.token;
loading.dismiss();
        this.http.get(api).map(res => res.json()).subscribe(data =>{
       console.log(data);
       that.dataGlist = data.json.data_group.list;//有些list为空
       console.log(that.dataGlist);
      
      that.goodMlist=data.json['good_Model'].model;
      $("#tuwen").html(data.json['good_Model'].model.detail);//图文html
      //alert(JSON.stringify(that.goodMlist));
      this.sid=data.json['good_Model'].model.shopid;
      this.lnum=data.json['good_Model'].model.limitNum;//限购数量
      this.fenge(data.json['good_Model'].model.imgsrc_list);//分割轮播图字段
      //alert(data.json['good_Model'].model.imgsrc_list);
      console.log(that.goodMlist);
      that.dataSlist=data.json.data_Sizes.list[0];

      that.goodSize=data.json.data_Sizes.list[0].id;//获得商品规格id
      console.log(that.dataSlist);
     
     this.recommend();
     })
     
  }
//进入店铺
enterShop(wid,sid){
//  alert("店铺id"+this.sid);
//   alert("id"+this.wid);
  this.navCtrl.push(ShopinfoPage,{
    wid: this.wid,
    sid: this.sid

  });
}
//购买数量判断
ifEnough(){
  this.ifList.gId=this.wid;
  this.ifList.gsId=this.goodSize;
  this.ifList.goodsNum=this.buylist.goodsNum;
  var date = this.ifList;
  var api = this.wdh+'/api/goods_size/update'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
       
         //alert("可以继续添加!");
      }else{
        alert(data.errmsg);
      }
     })

}
    //显示商品评价列表
  getshopinfo(id){
    this.showpingj=!this.showpingj;
    var that = this;
    var api = this.wdh +'/api/tradegoods/list?pageSize=10&pageIndex=1&goodsId='+id;
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
    this.buylist.gId=this.navParams.get("id");
    this.buylist.type="detail";
    this.buylist.gsId=this.goodSize;
        var j=3;
    console.log(this.token)
    var date = this.buylist;
     //alert(JSON.stringify(date));
    console.log(date);
    var api = this.wdh+'/api/goods_param/add'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
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
     //跳转前的判断
      var api=this.wdh+'/api/goods/buy_list?caId=1&token='+this.token;
            this.http.get(api).map(res => res.json()).subscribe(data =>{
              //  if(data.errcode === 0 && data.errmsg === 'OK'){
              //    alert("可以购买!");
       this.navCtrl.push(ShopbuyPage);
      // }
      // else{
      //   alert(data.errmsg);
      // }
            })
     
  }
   
   //团购
   gbuygoods(){ 
    this.buylist.token=this.token;
    this.buylist.gId=this.navParams.get("id");
    this.buylist.type="groupBuy";
    this.buylist.gsId=this.goodSize;
        var j=3;
    console.log(this.token)
    var date = this.buylist;
    // alert(JSON.stringify(date))
    var api = this.wdh+'/api/goods_param/add'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
      }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.gbuygoods();
          }
      }
      else{
        alert(data.errmsg);
      }
     });
      var api=this.wdh+'/api/goods/buy_list?caId=1&token='+this.token;
            this.http.get(api).map(res => res.json()).subscribe(data =>{})
     this.navCtrl.push(ShopbuyPage);
  }
//推荐商品列表
 recommend(){   
    var api2 = this.wdh+'/api/goods/list?curCityCode=4403';
     
     this.http.get(api2).map(res => res.json()).subscribe(data2 =>{
       if(data2.errmsg == 'OK'){
         this.rlist = data2.list;
         console.log(data2);
     } else {
        alert(data2.errmsg);
     }
     })
 }
//轮播图分割
fenge(str){ 
 
 this.strs=str.split(","); //字符分割
//alert(this.strs[0]);

}


incCount(){  
  if(this.lnum==0){  
    ++this.buylist.goodsNum;
    //console.log("更新！");
    //this.cd.detectChanges();//更新页面
    //console.log("更新成功！");
    this.ifEnough();}
    else if(this.buylist.goodsNum>this.lnum)
    {
      alert("该商品限购"+this.lnum+"件!");
    }
    else
    ++this.buylist.goodsNum;
  }
  //数量变化  双向数据绑定
  decCount(){
    if(this.buylist.goodsNum>1){
      --this.buylist.goodsNum;
    }
  }

  backTo(){
    this.navCtrl.pop();
  }

}
