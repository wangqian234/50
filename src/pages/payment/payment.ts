import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  //获取费用明细
  public paymentList={
    roomId:''
  }
  //接收数据用
  public modellist=[];
  public expenselist=[];
  public prepayslist=[];
  public fundloglist=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }
    //主页面加载函数 
   ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 18) + 'px';
    this.paymentList.roomId='1';
    var that=this;
    var api = this.config.apiUrl+'/api/index/list?';
     this.http.post(api,this.paymentList).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            //总计
              this.modellist=data.json.totalNum.model;
              
              this.expenselist=data.expense.list;
              this.prepayslist=data.prepays.list;
              this.fundloglist=data.fundLog.list;
          }
     })
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
