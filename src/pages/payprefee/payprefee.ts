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
  public roomlist=[];
  public roomidlist=[];

  //post请求
  public payrefeeList={
    management:'',
    water:'',
    electricity:'',
    parking:'',
    rubbish:'',
    roomId:'',
    token:'',
  }

 constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }

    
    ionViewWillLoad(){
    this.getRem();
    this.getroomId();   
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
      this.dw_Project();
    } else {
      $('#selectOther').css('display','none');
    }
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
  //查询用户绑定的所有房屋
  getroomId(){
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;//怎么知道那个是默认房屋,得到前台显示的房屋
            console.log(this.roomidlist)
          } else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.getroomId();
          }
      }else{
            alert(data.errmsg)
          }
     })
  }

//结算函数 
 gopay(){
    var that=this;
    // this.payrefeeList.roomId=roomid;
    // this.payrefeeList.token=this.storage.get("token")
    var api = this.config.apiUrl+'/api/charge/add?';
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
            alert(1)
            console.log(this.edificelist)
          }else{
            alert(data.errmsg)
          }
     })
 }
  //房屋下拉列表
 getRoom(edificeId){
     var that=this;
    var api = this.config.apiUrl+'/api/house/dw_Room?edificeId='+edificeId;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            alert("房屋")
            this.roomlist=data.list;
            console.log(this.roomlist)
          }else{
            alert(data.errmsg)
          }
     })
 }

}
