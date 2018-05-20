import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import $ from 'jquery';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';

@IonicPage()
@Component({
  selector: 'page-onlinepayment',
  templateUrl: 'onlinepayment.html',
})
export class OnlinepaymentPage {
  public isChencked=false;
  public allprice ;
  //接收数据list
  public list =[];
  public roomidlist=[];
  public iof_defList=[];
  public defRoomId='';
  public roomid;
  dest = [];
  checkNum = 0;
  pay={
    roomId:'',
    idG:'',
    token:'',   
  };
  onlinepaymentList={
    roomId:''
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
    if(this.storage.get('roomId')){
      this.defRoomId=this.storage.get('roomId');
      this.roomid=this.defRoomId;
      this.getroomId();
      this.getPayList(this.defRoomId);
    }
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlinepaymentPage');
  }

  ionViewDidEnter() {
    this.appearSome();
    this.getTotal();
  }

  backTo(){
    this.navCtrl.pop();
  }
   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  changeRoom(roomid){
    if(roomid==="add"){
      this.navCtrl.push(BindroomPage);
    }else{
      this.getPayList(roomid);
    }
  }
  // //查询默认房屋
  // getiof_def(){
  //   var j=3
  //   var api= this.config.apiUrl +'/api/userroom/info_def?token='+this.storage.get('token');
  //    this.http.get(api).map(res => res.json()).subscribe(data =>{
  //         if(data.errcode===0&&data.errmsg==='OK'){
  //           this.iof_defList=data.model;
  //           this.defRoomId=data.model.House_Room_Id;
  //           this.getPayList(data.model.House_Room_Id);
  //           this.getroomId();
  //         }else if (data.errcode===4002){
  //           j--;
  //           this.config.doDefLogin();
  //           this.getiof_def();
  //         }else{
  //           alert(data.errmsg)
  //         }
  //    })
  // }
   //查询用户绑定的所有房屋
  getroomId(){   
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
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
  //获取房屋费用收取表
  getPayList(roomid){
    var that=this;
    var api = this.config.apiUrl+'/api/Charge/list_Table?roomId='+roomid;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.list= data.list;

            var map = {};
            that.dest = [];
            for(var i = 0; i < that.list.length; i++){
                var ai = that.list[i];
                if(!map[ai.date]){
                    that.dest.push({
                        date: ai.date,
                        data: [ai]
                    });
                    map[ai.date] = ai;
                }else{
                    for(var j = 0; j < that.dest.length; j++){
                        var dj = that.dest[j];
                        if(dj.date == ai.date){
                            dj.data.push(ai);
                            break;
                        }
                    }
                }
            }
            
            for(var j = 0; j < that.dest.length; j++){
              var total = 0;
              for(var k = 0; k < that.dest[j].data.length; k++){
                total = total + that.dest[j].data[k].price;
              }
              that.dest[j].totalNum = total;
            }
            console.log(that.dest)
          }else{
            alert(data.errmsg);
          }
     })
  }

  appearSome(){
    $(".user_titlediv").click(function(){
      console.log($(this).next('div'))
      if($(this).next('div').css("display") == "none"){
        $(this).next('div').css("display","block");
      } else {
        $(this).next('div').css("display","none");
      }
    })
  }

  //结算账单
  gopay(){
    this.pay.roomId=this.roomid;
    this.pay.token=this.storage.get('token');
    this.pay.idG="02645301cb,02645302cb,02645305cb,02645303cb"
    var that=this;
    console.log(this.pay)
    var api = this.config.apiUrl+'/api/charge/edit_Save?';
     this.http.post(api,this.pay).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0 ){
            console.log(data.errmsg+"支付成功")
          }else{
            alert(data.errmsg+"支付失败")
          }
     })
  }

  getTotal(){
    var that = this;
    $("input:checkbox").change(function() {
        if ($(this).is(':checked')) {
          that.checkNum++;
        } else {
          that.checkNum--;
        }

        if(that.checkNum == that.dest.length){
          that.isChencked=true;
        }else{
          that.isChencked=false;
        }
        that.sumPrice();
    });
  }

  //通过全选按钮进行全选、全消
  checkAll(){
    if(this.isChencked){
      for(let i=0; i<this.dest.length;i++){
        this.dest[i].checked=false;
      }
      this.isChencked=false;
    }else{
      for(let i=0;i<this.dest.length;i++){
        this.dest[i].checked=true;
      }
      this.isChencked=true;
    }
    this.sumPrice();
  }
  //计算选中的总共多少钱
  sumPrice(){
    var totalprice = 0;
    for(let i=0;i<this.dest.length;i++){
      if(this.dest[i].checked==true){
          totalprice += this.dest[i].totalNum;
      }
    }
    this.allprice = totalprice.toFixed(2).toString();
  }

}
