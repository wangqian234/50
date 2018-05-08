//商品订单详情
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

//商品订单详情
import { GoodsoderdetailPage } from '../goodsoderdetail/goodsoderdetail';

@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {
     //定义token
  public token=this.storage.get('token');

  public list=[];
  public good_list=[];
  public SD_id;
  public paymentlist=[];
  public receivelist=[];
  public GoodsoderdetailPage=GoodsoderdetailPage;
  public a;

  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;//http://test.api.gyhsh.cn/api/trade/list?pageSize=10&pageIndex=1&trade_State=0&token=111
 
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
        this.SD_id=navParams.get('id');
        //alert(this.SD_id);

  }
  paymentEvent(aa){
    this.a=aa;
     var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&trade_State='+this.a+'&token='+this.token;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.paymentlist=data.list;
         alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         //this.good_list=data.list[0].goods_list;
         //alert(JSON.stringify(data.list[0].goods_list));
         // alert(JSON.parse(data));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })

  }
  // receiveEvent(){
  //    var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&trade_State='+this.SD_id+'&token='+this.token;
  //    this.http.get(api).map(res => res.json()).subscribe(data =>{
  //      if(data.errcode === 0 &&data.errmsg == 'OK'){
  //        //this.goods_list=data.list.goods_list;
  //        this.receivelist=data.list;
  //        alert(JSON.stringify(data));
  //         //alert(JSON.stringify(data.list));
  //        //this.good_list=data.list[0].goods_list;
  //        //alert(JSON.stringify(data.list[0].goods_list));
  //        // alert(JSON.parse(data));
  //        console.log(data);
  //    } else {
  //       alert(data.errmsg);
  //    }
  //    })
  // }

ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

     var api = this.aa+'/api/trade/list?pageSize=10&pageIndex=1&trade_State='+this.SD_id+'&token='+this.token;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 &&data.errmsg == 'OK'){
         //this.goods_list=data.list.goods_list;
         this.list=data.list;
         alert(JSON.stringify(data));
          //alert(JSON.stringify(data.list));
         //this.good_list=data.list[0].goods_list;
         //alert(JSON.stringify(data.list[0].goods_list));
         // alert(JSON.parse(data));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
  }
  ionViewDidLoad() {
   //this.onload2();
  }
// onload2 = function(){
//     var Sos=document.getElementById('sos_tanc');
// 		var ShouYe=document.getElementById('yemnr');
// 		var SosYe=document.getElementById('shous_yem');
// 		var SosFanHui=document.getElementById('sous_fanh_sy');
// 		Sos.onclick=function()
// 		{
// 			ShouYe.style.display=('none');
// 			SosYe.style.display=('block');
// 		}
// 		SosFanHui.onclick=function()
// 		{
// 			ShouYe.style.display=('block');
// 			SosYe.style.display=('none');
// 		}
//   }

}
