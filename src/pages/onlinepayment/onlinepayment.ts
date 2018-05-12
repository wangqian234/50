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
  selector: 'page-onlinepayment',
  templateUrl: 'onlinepayment.html',
})
export class OnlinepaymentPage {

  //接收数据list
  public list =[];
  public roomidlist=[];
  pay={
    roomId:'',


    
  };
  onlinepaymentList={
    roomId:''
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
    this.getroomId();
    this.getpaylist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlinepaymentPage');
  }

  backTo(){
    this.navCtrl.pop();
  }
   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
    //查询用户绑定的所有房屋
  getroomId(){
    var that=this;
    var api = this.config.apiUrl+'/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;//怎么知道那个是默认房屋
            console.log(this.roomidlist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  //获取房屋费用收取表
  getpaylist(){
        this.onlinepaymentList.roomId='1';
    var that=this;
    var api = this.config.apiUrl+'/house/charge/list_Table?';
     this.http.post(api,this.onlinepaymentList).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.list= data.list;
          }else{
            alert(data.errmsg);
          }
     })
  }
  //结算账单
  gopay(allprice){
    var that=this;
    var api = this.config.apiUrl+'/house/charge/edit_Save?';
     this.http.post(api,this.pay).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;//怎么知道那个是默认房屋
            console.log(this.roomidlist)
          }else{
            alert(data.errmsg)
          }
     })
  }

}
