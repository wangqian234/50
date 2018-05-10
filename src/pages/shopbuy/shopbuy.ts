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
       that.goodSlist = data.json.dt_GoodsSize.list[0];//list为空
      //alert(JSON.stringify(that.goodSlist));

      that.dtlist=data.json['dt'].model;
      //alert(JSON.stringify(that.dtlist));
      console.log(that.dtlist);

      that.addlist=data.json.address_List.list[0];
      //alert(JSON.stringify(that.addlist));
      console.log(that.addlist);
    })
  
     //店铺信息
      var api2=this.wdh+'/api/shop/info?sId=1';
            this.http.get(api2).map(res => res.json()).subscribe(data2 =>{
            console.log(data2);
      that.shoplist = data2.model;
      console.log(data2);
      })
     //运费
     var api3=this.wdh+'/api/trade/info?addressId=1&gId=1&gsId=1&goodsNum=1'+this.token;
            this.http.get(api3).map(res => res.json()).subscribe(data3 =>{
            console.log(data3);
      that.carriagelist = data3.model;
      console.log(data3);
       })
     //积分抵扣
     var api4=this.wdh+'/api/userintegral/info?preDecimal=111'+this.token;
            this.http.get(api4).map(res => res.json()).subscribe(data4 =>{
            console.log(data4);
      that.creditslist = data4.model;
      console.log(data4);
       })
     //提交订单

     
  }
//计算总价

}
