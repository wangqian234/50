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
import{BindroomPage}from '../bindroom/bindroom'
import { LoadingController } from 'ionic-angular';

//登录页面
import { LoginPage } from '../login/login';

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
    type:'55',
    category:'55',
    roomId:'',
    projectId:'',
    memo:'',
    mediaIds:'',
    token:'',
  }
  //工单文件管理
  public file={
    File_Guid:'',
    Tabs:'1',
    Files:'',
  }
  public guidFile;
  //public roomid;
  public roomId

  public LoginPage = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider,public loadingCtrl: LoadingController) {
      if(this.storage.get('roomId')){
        this.defRoomId=this.storage.get('roomId')
        this.roomId= this.defRoomId;
        this.getroomId();
      }
  }
  ionViewWillLoad(){
    if(this.navParams.get("type")){
      this.addlist.type=this.navParams.get("type")
      this.changeType();
    }
      //确认登录状态
      if(this.storage.get('token')){

      } else {
        this.navCtrl.push(LoginPage);
      }
    this.getRem();
  }

  httptest(){
    console.log(this.repairLimit.sort1);
    console.log(this.repairLimit.sort2);
    console.log(this.repairLimit.add);
    this.navCtrl.push(RepairlistPage);
  }
  backToList(){
    this.navCtrl.pop();
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
  changeRoom(roomid){
    if(roomid === "add"){
         this.navCtrl.push(BindroomPage);
    } 
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
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    if(this.addlist.type==="4"){
      this.addlist.roomId="0"
    }else{
      this.addlist.projectId="0"  
      this.addlist.roomId=this.roomId;    
    }
    this.addlist.token=this.storage.get('token')
    console.log(this.addlist)
    var api = this.config.apiUrl+'/api/list/add?';
     this.http.post(api,this.addlist).map(res => res.json()).subscribe(data =>{
          loading.dismiss();
          if(data.errcode===0&&data.errmsg==='OK'){ 
              console.log(data)
              this.guidFile=data.model;
              this.navCtrl.pop();
          }else{
            alert(data.errmsg)
          }
     })
  }
  添加上传的文件
  addFile(guid){
      // var api = this.config.apiUrl+'/api/files/Upload_SRQ'
      // this.file.File_Guid=guid;
      // //this.file.Files=this
      // this.http.post(api,)
  }
   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

}
