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
 public defRoomId:'';
 public roomid;
   
    //获取费用明细
  public roomId={
    roomId:'',
  };/*  房屋id */
  //接收数据用
  public modellist=[];
  public expenselist=[];
  public prepayslist=[];
  public fundloglist=[];
  public roomidlist=[];
  public iof_defList=[];
  
  public PayprefeePage = PayprefeePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
    if(this.storage.get('roomId')){
      this.defRoomId=this.storage.get('roomId');
      this.roomid =this.defRoomId;
      this.getroomId();
      this.getallpaylist(this.defRoomId);   
    }
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
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
    }else{
      this.getallpaylist(roomid);
    }
  }

  //查询物业总费用列表
  getallpaylist(roomid){
    var that=this;
    var api = this.config.apiUrl+'/api/charge/list?roomId='+roomid;//获取前台界面上显示的房屋id
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.json.totalNum.errcode == 0){
          //总计金额
          that.modellist=data.json.totalNum.model;
          //代缴
          that.expenselist=data.json.expense.list;
          //预交剩余
          that.prepayslist=data.json.prepays.list;
          //半年缴费记录
          that.fundloglist=data.json.fundLog.list;   
       } else {
         alert(data.errmsg)
       }
     })
  }

 getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  //查询用户绑定的所有房屋
  getroomId(){   
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            if(data.list.length == 0){
              that.navCtrl.pop();
            }
            that.roomidlist=data.list;  
          }else if (data.errcode===4002){
            j--;
            this.config.doDefLogin();
            this.getroomId();
          } else{
            alert(data.errmsg)
          }
     })
  }
  // //查询默认房屋
  // getiof_def(){
  //   var j=3
  //   var api= this.config.apiUrl +'/api/userroom/info_def?token='+this.storage.get('token');
  //    this.http.get(api).map(res => res.json()).subscribe(data =>{
  //         if(data.errcode===0&&data.errmsg==='OK'){
  //           this.iof_defList=data.model;
  //           this.defRoomId=data.model.House_Room_Id;
  //           this.getallpaylist(data.model.House_Room_Id);
  //           this.getroomId();
  //         }else if (data.errcode===4002){
  //           j--;
  //           this.config.doDefLogin();
  //           this.getiof_def();
  //         }else{
  //           alert(data.errmsg)
  //           this.navCtrl.pop();
  //         }
  //    })
  // }

 }



