import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';
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
  public isChencked=false;
  public allprice= 0 ;
  //接收数据list
  public list =[];
  public roomidlist=[];
  public iof_defList=[];
  public defRoomId='';
  public roomid;
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
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
    this.getiof_def(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlinepaymentPage');
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
  //查询默认房屋
  getiof_def(){
    var j=3
    var api= this.config.apiUrl +'/api/userroom/info_def?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.iof_defList=data.model;
            this.defRoomId=data.model.House_Room_Id;
            this.getPayList(data.model.House_Room_Id);
            this.getroomId();
          }else if (data.errcode===4002){
            j--;
            this.config.doDefLogin();
            this.getiof_def();
          }else{
            alert(data.errmsg)
          }
     })
  }
   //查询用户绑定的所有房屋
  getroomId(){   
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            for(var i=0;i<data.list.length;i++){
              if(data.list[i].id == this.defRoomId){
                data.list.splice(i,1)
              }
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
  //获取房屋费用收取表
  getPayList(roomid){
    if(roomid==="defId"){
      roomid=this.defRoomId;
    }
    var that=this;
    var api = this.config.apiUrl+'/api/Charge/list_Table?roomId='+roomid;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.list= data.list;
            for(var i=0;i<this.list.length;i++){
              this.list[i].checked = false;
            }
            console.log(this.list)
          }else{
            alert(data.errmsg);
          }
     })
  } 

  //结算账单
  gopay(){
     if(this.roomid==="defId"){
      this.pay.roomId=this.defRoomId;
    }else{
      this.pay.roomId=this.roomid;
    }
    this.pay.token=this.storage.get('token');
    this.pay.idG="2450790"
    var that=this;
    var api = this.config.apiUrl+'/api/charge/edit_Save?';
     this.http.post(api,this.pay).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;//怎么知道那个是默认房屋
            console.log(this.roomidlist)
          }else{
            alert(data.errmsg)
          }
     })
  }


  //获取选中的数量
  getcheckNum(){
    let sum=0;
    for(let i=0;i<this.list.length;i++){
      console.log(this.list[i].checked)
      if(this.list[i].checked==true){
        console.log("进来了")
        sum+=1;;
      }
    }
    console.log("wang123"+sum)
    return sum;
  }
  //当全选中时，全选按钮也被选中
  changePays(){
    if(this.getcheckNum()==this.list.length){
      this.isChencked=true;
    }else{
      this.isChencked=false;
    }
    this.sumPrice();
  }
  //通过全选按钮进行全选、全消
  checkAll(){
    if(this.isChencked){
      for(let i=0; i<this.list.length;i++){
        this.list[i].checked=false;
      }
    }else{
      for(let i=0;i<this.list.length;i++){
        this.list[i].checked=true;
      }
    }
    this.sumPrice();
  }
  //计算选中的总共多少钱
  sumPrice(){
    var totalprice =0;
    for(let i=0;i<this.list.length;i++){
        if(this.list[i].checked==true){
            totalprice+=this.list[i].price;
        }
    }
    this.allprice=totalprice;
  }

}
