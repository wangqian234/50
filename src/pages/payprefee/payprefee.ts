import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//登录页面
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-payprefee',
  templateUrl: 'payprefee.html',
})
export class PayprefeePage {
  url = {
    tId:'',
    token:'',
    tags:'',
    act:'',
    createip:'',
  }
  public weixinUrl;
  public payAct;
  public paytId;
  public surePay;
  public defRoomId;    /**默认房屋id */
  public iof_defList=[];  /*默认房屋列表 */
  public roomid;       /**选择的房屋ngModel值 */
  public projectlist=[];  /**项目列表 */
  public edificelist=[];  /**楼栋列表 */
  public roomlist=[];     /**房屋列表 */
  public roomidlist=[];   /**用户绑定的房屋列表 */
  public roomId;       /**为其他房屋交费时选择的房屋id */
  public allPrice=0;

  public LoginPage = LoginPage;

  //post请求
  public cip;
  public payrefeeList={
    management:0,
    water:0,
    electricity:0,
    parking:0,
    rubbish:0,
    roomId:'',
    token:'',
    tags:'android',
    createip:'',
    act:'Prepay',
  }

    management:number;
    water:number;
    electricity:number;
    parking:number;
    rubbish:number;
    public outTradeNo;

 constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
    if(this.navParams.get('item')){
      this.defRoomId=this.navParams.get('item');
      this.roomid=this.defRoomId;
      this.getroomId();
    }else{
      if(this.storage.get('roomId')){
      this.defRoomId=this.storage.get('roomId');
      this.roomid=this.defRoomId;
      this.getroomId();
    }
    }
  }
    ionViewDidEnter(){
      this.storage.set('tabs','false');
    }
    ionViewWillLoad(){
    this.getRem();
    //确认登录状态
    if(this.storage.get('token')){

    } else {
    this.navCtrl.push(LoginPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayprefeePage');
    this.getTotal();
  }

  getTotal(){
    var that =  this;
    $("input").change(function(){
          var num1 = 0;
          var num2 = 0;
          var num3 = 0;
          var num4 = 0;
          var num5 = 0;
          if(that.management){
            num1 = that.management;
          }
          if(that.water){
            num2 = that.water;
          }
          if(that.electricity){
            num3 = that.electricity;
          }
          if(that.parking){
            num4 = that.parking;
          }
          if(that.rubbish){
            num5 = that.rubbish;
          }
         that.allPrice = num1+num2+num3+num4+num5;
    })
  }

  backTo(){
    this.navCtrl.pop();
  }

  changeRoom(roomid){
    if(roomid === "add"){
      $('#selectOther').css('display','block');

      this.dw_Project();      
    } else {
      $('#selectOther').css('display','none');
    }
  }
   //查询用户绑定的所有房屋
  getroomId(){   
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.roomidlist=data.list; 
            console.log(that.roomidlist) 
          }else if (data.errcode===4002){
            j--;
            this.config.doDefLogin();
            this.getroomId();
          } else{
            alert(data.errmsg)
          }
     })
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
     clickme(){
      var that = this;
      $.ajax({
          url: 'http://freegeoip.net/json/',
          success: function(data){
            that.cip = data.ip;
            that.gopay();
          },
          type: 'get',
          dataType: 'JSON'
      });
     }
//结算函数 
 gopay(){
   if(this.roomid==="add"){
      this.payrefeeList.roomId=this.roomId;
   }else{
     this.payrefeeList.roomId=this.roomid;
   }
   this.payrefeeList.createip = this.cip;
    this.payrefeeList.token=this.storage.get("token")
    this.payrefeeList.management = this.management;
    this.payrefeeList.water = this.water;
    this.payrefeeList.electricity = this.electricity;
    this.payrefeeList.parking = this.parking;
    this.payrefeeList.rubbish = this.rubbish;
    var api = this.config.apiUrl+'/api/charge/prepay?';
    console.log(this.payrefeeList)
    this.http.post(api,this.payrefeeList).map(res => res.json()).subscribe(data =>{
     if(data.errcode===0){
       this.payAct = data.model.act;
       this.paytId = data.model.tId;
       this.surePay = 'http://test.gyhsh.cn/Public/H5Pay.html?act='+this.payAct+'&tId='+this.paytId+'&tags=web&token='+this.storage.get('token')+'&createip='+this.cip+'&title=费用预存&money='+this.allPrice ;
       console.log(data)
       location.href = this.surePay;
      // this.getmwebUrl();
      //this.navCtrl.pop();
     }else{
        console.log(data)
        alert("预付款失败")
       // this.navCtrl.pop();
          }
     })
   }
  //调用支付获取mweb_url
    getmwebUrl(){
      this.url.act = this.payAct;
      this.url.createip = this.cip;
      this.url.tags = 'android';
      this.url.tId = this.paytId;
      this.url.token = this.storage.get('token');
      var api =  this.config.apiUrl + '/api/weixinpay/unifiedorder';
      this.http.post(api,this.url).map(res => res.json()).subscribe(data =>{
        console.log(data);
        if(data.errcode == 0){
          this.weixinUrl = data.model.mweb_url; 
          this.goWeixiPay();
         // (<any>window).cordova.InAppBrowser.open(this.weixinUrl,'_blank','location=yes');
        }
     })
    }
      //跳转到微信支付页面
   goWeixiPay(){
    location.href=this.surePay;
  //   this.gotoUrl(this.weixinUrl)
    //(<any>window).cordova.InAppBrowser.open(this.weixinUrl,'_top','location=yes');
  }

      //微信查询接口
   checkPayment(){
    //  var api = this.config.apiUrl + '/api/weixinpay/queryorder?out_trade_no='+this.outTradeNo;
    //  this.http.get(api).map(res => res.json()).subscribe(data =>{
    //    if(data.errmsg === 'OK'){
    //       alert("支付成功")
    //    }
    //  })
   }

    clickmeToOut(){
      if(this.allPrice == 0){
        alert("缴费金额不能为0")
        return;
      }
      $("#enSureMon").fadeIn(200)
    }
    clickmeToIn(){
      $("#enSureMon").css("display","none")
    }

 
 //项目下拉列表
 dw_Project(){
    var api = this.config.apiUrl+'/api/house/dw_Project?';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.projectlist=data.list;
            console.log(this.projectlist)
          }else{
            alert(data.errmsg)
          }
     })
     
 }
  //楼栋下拉列表
 getEdifice(projectId){
    var that=this;
    var api = this.config.apiUrl+'/api/house/dw_Edifice?projectId='+projectId;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.edificelist=data.list;
            console.log(this.edificelist)
          }else{
            alert(data.errmsg)
          }
     })
 }
  //房屋下拉列表
 getRoom(edificeId){
    var api = this.config.apiUrl+'/api/house/dw_Room?edificeId='+edificeId;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomlist=data.list;
            console.log(this.roomlist)
          }else{
            alert(data.errmsg)
          }
     })
 }

}
