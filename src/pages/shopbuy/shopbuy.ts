//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the ShopbuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopbuy',
  templateUrl: 'shopbuy.html',
})
export class ShopbuyPage {
  public wid;
  public list=[];
  public dtlist=[];
  public goodSlist=[];
  public addlist=[];

  public shoplist=[];
  public carriagelist=[];
  public creditslist=[];
  public totalPrice=0;  /*总价*/
  public test=123;
  public te=123;
  //定义congfig中公共链接的变量aa
  public wdh = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
    this.wid=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopbuyPage');
  }
ionViewWillLoad() {
    //商品内容
    var that=this;
    var api=this.wdh+'/api/goods/buy_list?caId=1&token='+this.token;//id目前写死
            this.http.get(api).map(res => res.json()).subscribe(data =>{
       console.log(data);
      that.dtlist=data.json.dt.model;
      //购买数量限制goodslimitnum、库存数量goodsnum、积分、价格totalprice
      //alert(JSON.stringify(that.dtlist));
      console.log(that.dtlist);
      that.addlist=data.json.address_List.list[0];//（默认）收获地址相关
      //alert(JSON.stringify(that.addlist));
      console.log(that.addlist);
       that.goodSlist = data.json.dt_GoodsSize.list[0];
       //商品内容（名称title、图片img、购买数量buynum）
      //alert(JSON.stringify(that.goodSlist));
     
this.test=data.json.dt_GoodsSize.list[0].buynum;
//this.test=that.goodSlist[0].buynum;
      
this.te= data.json.dt.model.totalprice;
//alert(this.test);
this.totalPrice=this.test*this.te;
      
    
    })

     //店铺信息
      var api2=this.wdh+'/api/shop/info?sId=1';
            this.http.get(api2).map(res => res.json()).subscribe(data2 =>{
               
            console.log(data2);
      that.shoplist = data2.model;
      
      console.log(data2);
    })

     
    this.post();
}
post(){
    //alert("进入post");
    var that=this;
     //运费postage
     var api=this.wdh+'/api/trade/info?addressId=1&gId=1&gsId=1&goodsNum=1&token='+this.token;
            this.http.get(api).map(res => res.json()).subscribe(data =>{
            
            console.log(data);
      that.carriagelist = data.model;
      console.log(data);
       })
     //积分抵扣pricemax
         
  var api4=this.wdh+'/api/userintegral/info?preDecimal=111&token='+this.token;
            this.http.get(api4).map(res => res.json()).subscribe(data4 =>{
            console.log(data4);
      that.creditslist = data4.model;
      
      console.log(data4);})
    
       
     //提交订单
   
     //this.sumPrice();
    
  }
  

    backTo(){
    this.navCtrl.pop();
  }
//计算总价
//  sumPrice(){
//        var tempAllPrice=0;
       //var test=0;
       //alert(test);
       //test=this.dtlist['totalprice'];

//       for(let i=0;i<this.list.length;i++){
//         if(this.list[i].checked==true){
//           tempAllPrice=parseInt(this.goodSlist['buynum'])*parseInt(this.dtlist['totalprice']);
           //还需加运费
//         }
//       }
  //     this.totalPrice=tempAllPrice;
  //  }

}
