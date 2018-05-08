//商品退款申请

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
  selector: 'page-tradegoods-reap',
  templateUrl: 'tradegoods-reap.html',
})
export class TradegoodsReapPage {
  //public token = "";
  public addressList={
    mode:'',
    type:'',
    price:'',
    tgId:'',
    city:'',
    memo:'',
    act:'',
    token : ''
  }

  public list = [];

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
    //定义token
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {

  }

    ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

    if(this.navParams.get('item')){
      this.addressList=this.navParams.get('item');
    } 
    this.addressList.token = this.token;
    var data = this.addressList;
     //var api =this.aa+ '/api/tradegoods_refund/info?tgId=1'+this.token;
     var api =this.aa+ '/api/tradegoods/add?tgId=1&token=111';
    
    if(!this.navParams.get('item')){  //新加还是修改判断
      //var api = this.config.apiUrl + '/user/address/add';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加成功！");
        this.navCtrl.push(TradegoodsReapPage);
      } else {
        alert("添加失败！");
      }
    });
    } else {
     // var api = this.config.apiUrl + '/user/address/edit';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加成功！");
        this.navCtrl.push(TradegoodsReapPage);
      } else {
        alert("添加失败！");
      }
    });
    }



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
