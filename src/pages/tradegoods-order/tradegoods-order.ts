//商品订单页
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-tradegoods-order',
  templateUrl: 'tradegoods-order.html',
})
export class TradegoodsOrderPage {
  public list=[];

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
    //定义token
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {

  }

ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

     //var api = this.aa+'/api/trade/list?'+'trade_Id=1'+this.token;
     var api = this.aa+'/api/trade/list?'+'pageSize=10&pageIndex=1&trade_State=0&token=111';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         this.list=data.list;
         alert(data);
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
  }
  ionViewDidLoad() {
   this.onload2();
  }
onload2 = function(){
    var Sos=document.getElementById('sos_tanc');
		var ShouYe=document.getElementById('yemnr');
		var SosYe=document.getElementById('shous_yem');
		var SosFanHui=document.getElementById('sous_fanh_sy');
		Sos.onclick=function()
		{
			ShouYe.style.display=('none');
			SosYe.style.display=('block');
		}
		SosFanHui.onclick=function()
		{
			ShouYe.style.display=('block');
			SosYe.style.display=('none');
		}
  }

}
