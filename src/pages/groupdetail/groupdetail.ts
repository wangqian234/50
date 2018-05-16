//wdh
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';

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
 //定义需要隐藏的标志变量
    public showpingj =false;
  
  public wid;
  public list=[];
  public dataGlist=[];
  public goodMlist=[];
  public dataSlist=[];
  public strs=[];
  public goodSize;
  public buylist={
    type:'',
    gId:'',
    gsId:'',
    goodsNum:1,
    token:'',
  }
  //定义congfig中公共链接的变量aa
  public wdh = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
    this.wid=navParams.get('id');
    alert(this.wid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupdetailPage');
  }
ionViewWillLoad() {
    
    var that=this;
    var api=this.wdh+'/api/goods/info?goods_Id='+this.wid+'&token='+this.token;
        this.http.get(api).map(res => res.json()).subscribe(data =>{
       console.log(data);
       that.dataGlist = data.json.data_group.list;//有些list为空
       console.log(that.dataGlist);
      
      that.goodMlist=data.json['good_Model'].model;
      $("#tuwen").html(data.json['good_Model'].model.detail);//图文html
      //alert(JSON.stringify(that.goodMlist));
      this.fenge(data.json['good_Model'].model.imgsrc_list);//分割轮播图字段
      //alert(data.json['good_Model'].model.imgsrc_list);
      console.log(that.goodMlist);
      that.dataSlist=data.json.data_Sizes.list[0];

      that.goodSize=data.json.data_Sizes.list[0].id;//获得商品规格id
      console.log(that.dataSlist);
     
     
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
         alert(JSON.stringify(this.list));
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
    // alert(JSON.stringify(date))
    var api = this.wdh+'/api/goods_param/add'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        alert("post成功!");
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
        alert("post成功!");
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


//轮播图分割
fenge(str){ 
 
 this.strs=str.split(","); //字符分割
//alert(this.strs[0]);

}


incCount(){    
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
