import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
@IonicPage()
@Component({
  selector: 'page-payprefee',
  templateUrl: 'payprefee.html',
})
export class PayprefeePage {

  public projectlist=[];
  public edificelist=[];
  public roomidlist=[];
  
  //post请求
  public payrefeeList={
    management:'',
    water:'',
    electricity:'',
    parking:'',
    rubbish:'',

  }

 constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }

    
    ionViewWillLoad(){
    this.getRem();

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayprefeePage');
  }

  backTo(){
    this.navCtrl.pop();
  }

  changeRoom(roomid){
    if(roomid === "add"){
      $('#selectOther').css('display','block');
    } else {
      $('#selectOther').css('display','none');
    }
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
//结算函数 
 gopay(){
    var that=this;
    var api = this.config.apiUrl+'/house/charge/add?';
     this.http.post(api,this.payrefeeList).map(res => res.json()).subscribe(data =>{
         alert("高海乐支付成功")
          if(data.errcode===0&&data.errmsg==='OK'){
            console.log("支付成功")
          }else{
            alert(data.errmsg)
          }
     })
 }
 //项目下拉列表
 dw_Project(){
      var that=this;
    var api = this.config.apiUrl+'/house/house/dw_Project?';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.projectlist=data.list;
          }else{
            alert(data.errmsg)
          }
     })
 }
  //项目下拉列表
 dw_Edifice(id){
      var that=this;
    var api = this.config.apiUrl+'/house/house/dw_Edifice?projectId='+id;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.edificelist=data.list;
          }else{
            alert(data.errmsg)
          }
     })
 }
  //项目下拉列表
 dw_Room(id){
      var that=this;
    var api = this.config.apiUrl+'/house/house/dw_Room?edificeId='+id;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;
          }else{
            alert(data.errmsg)
          }
     })
 }

}
