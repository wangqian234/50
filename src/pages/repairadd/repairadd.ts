import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RepairlistPage } from '../repairlist/repairlist';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import $ from 'jquery';
@Component({
  selector: 'page-repairadd',
  templateUrl: 'repairadd.html',
})
export class RepairaddPage {
  public selecttype='';
  public defRoomId;    /**默认房屋id */
  public iof_defList=[];  /*默认房屋列表 */

  public repairLimit:any = [];
  public roomidlist=[];
  public projectlist=[];
  public stypelist=[];
  public repairlist=[];
  public addlist={
    type:'',
    category:'',
    roomId:'',
    projectId:'',
    memo:'',
    mediaIds:'',
    token:'',
  }
  public roomId
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  
  }

  ionViewWillLoad(){
    if(this.navParams.get("type")){
      this.addlist.type=this.navParams.get("type")
      this.changeType();
    }
    this.getRem();
    this.getiof_def();
    //this.getproject();
  //  this.getcategory();
  //  this.showPopup();
  }

  httptest(){
  //     let json={
  //   uid:this.repairLimit.sort1,
  //   salt:this.repairLimit.sort1,
  // }
    console.log(this.repairLimit.sort1);
    console.log(this.repairLimit.sort2);
    console.log(this.repairLimit.add);
    this.navCtrl.push(RepairlistPage);
  }
  backToList(){
    this.navCtrl.pop();
  }
  //查询默认房屋
  getiof_def(){
    var j=3
    var api= this.config.apiUrl +'/api/userroom/info_def?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.iof_defList=data.model;
            this.defRoomId=data.model.House_Room_Id;
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


  //查询所有小区
  getproject(){
    var that=this;
    var api = this.config.apiUrl+'/api/project/dw';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.projectlist=data.list;
            console.log(this.projectlist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  changeType(){
        if(this.addlist.type==="4"){
        $('#aa').css('display','block');
       this.getproject();
    }else{
        $('#aa').css('display','none');
    }
    this.getcategory();
  }
  //根据工单类型查询类别
  getcategory(){
    var that=this;
    var api = this.config.apiUrl+'/api/category/dw?type='+this.addlist.type;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.stypelist=data.list;
            console.log(this.stypelist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  //添加工单
  showPopup(){
    if(this.addlist.type==="4"){
      this.addlist.roomId="0"
    }else{
      this.addlist.projectId="0"
      if(this.roomId==="defId"){
        this.addlist.roomId=this.defRoomId;
      }else{
        this.addlist.roomId=this.roomId;
      }  
    }
    this.addlist.token=this.storage.get('token')
    var that=this;
    var api = this.config.apiUrl+'/api/list/add?';
     this.http.post(api,this.addlist).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){ 
              this.navCtrl.pop();
          }else{
            alert(data.errmsg)
          }
     })
  }
   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }

}
