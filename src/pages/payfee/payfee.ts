import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//费用预存页面
import { PayprefeePage } from '../payprefee/payprefee';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';
//在线缴费
import { OnlinepaymentPage } from '../onlinepayment/onlinepayment';

@Component({
  selector: 'page-payfee',
  templateUrl: 'payfee.html',
})
export class PayfeePage {
   
    //获取费用明细
  public paymentList={
    roomId:''
  }
  //接收数据用
  public modellist=[];
  public expenselist=[];
  public prepayslist=[];
  public fundloglist=[];
  public roomidlist=[];
  
  public PayprefeePage = PayprefeePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
    this.getroomId();
    this.getallpaylist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayfeePage');
  }

  appearPayFee(){
    if($('#payFee').css('display') == 'block'){
      $('#payFee').css('display','none');
      $('#payFeeimg').css('transform', 'rotate(180deg)')
    } else {
      $('#payFee').css('display','block');
      $('#payFeeimg').css('transform', 'rotate(270deg)')
    }
  }

  appearPreDetail(){
    if($('#preDetail').css('display') == 'block'){
      $('#preDetail').css('display','none');
      $('#preDetailimg').css('transform', 'rotate(180deg)')
    } else {
      $('#preDetail').css('display','block');
      $('#preDetailimg').css('transform', 'rotate(270deg)')
    }
  }

  appearFeeList(){
    if($('#feeList').css('display') == 'block'){
      $('#feeList').css('display','none');
      $('#feeListimg').css('transform', 'rotate(180deg)')
    } else {
      $('#feeList').css('display','block');
      $('#feeListimg').css('transform', 'rotate(270deg)')
    }
  }

  backTo(){
    this.navCtrl.pop();
  }

  goOnlinePayfee(){
     this.navCtrl.push(OnlinepaymentPage,{
      //item: this.room;
    })
  }
  
  goPrefee(){
    this.navCtrl.push(PayprefeePage,{
      //item: this.room;
    })
  }
    changeRoom(roomid){
    if(roomid === "add"){
      this.navCtrl.push(BindroomPage);
    }
  }
  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  //查询物业总费用列表
  getallpaylist(){
      this.paymentList.roomId='1';
    var that=this;
    var api = this.config.apiUrl+'/house/charge/list?';
     this.http.post(api,this.paymentList).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
              //总计金额
              this.modellist=data.json.totalNum.model;
              //代缴
              this.expenselist=data.expense.list;
              //预交剩余
              this.prepayslist=data.prepays.list;
              //半年缴费记录
              this.fundloglist=data.fundLog.list;
          }
     })
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

}
