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
  public defRoomId;    /**默认房屋id */
  public iof_defList=[];  /*默认房屋列表 */
  public roomid;       /**选择的房屋ngModel值 */
  public projectlist=[];  /**项目列表 */
  public edificelist=[];  /**楼栋列表 */
  public roomlist=[];     /**房屋列表 */
  public roomidlist=[];   /**用户绑定的房屋列表 */
  public roomId;       /**为其他房屋交费时选择的房屋id */
  public allPrices=0;

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
    this.getiof_def();   
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
  //查询默认房屋
  getiof_def(){
    var j=3
    var api= this.config.apiUrl +'/api/userroom/info_def?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.iof_defList=data.model;
            this.defRoomId=data.model.House_Room_Id;
            console.log(this.iof_defList)
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
  //计算总钱数
  sumPrices(){
    //  var totalPrice = this.payrefeeList.electricity+this.payrefeeList.management+this.payrefeeList.parking+this.payrefeeList.rubbish+this.payrefeeList.water;
    //  this.allPrices=totalPrice;
  }

//结算函数 
 gopay(){

   if(this.roomid==="add"){
      this.payrefeeList.roomId=this.roomId;
   }else if(this.roomid==="defId"){
     this.payrefeeList.roomId=this.defRoomId;
   }else{
     this.payrefeeList.roomId=this.roomid;
   }
    this.payrefeeList.token=this.storage.get("token")
    console.log(this.payrefeeList)
    var api = this.config.apiUrl+'/api/charge/add?';
     this.http.post(api,this.payrefeeList).map(res => res.json()).subscribe(data =>{
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
            this.roomlist=data.list;
            console.log(this.roomlist)
          }else{
            alert(data.errmsg)
          }
     })
 }

}
