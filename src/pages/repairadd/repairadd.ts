import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RepairlistPage } from '../repairlist/repairlist';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

@Component({
  selector: 'page-repairadd',
  templateUrl: 'repairadd.html',
})
export class RepairaddPage {

  public repairLimit:any = [];
  public roomidlist=[];
  public stypelist=[];
  public repairlist=[];
  public addlist={
    type:'',
    category:'',
    roomId:'',
    projectId:'',
    memo:'',
    mediaIds:'',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  
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

    //查询所有小区
  getroomId(){
    var that=this;
    var api = this.config.apiUrl+'/api/project/dw';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.roomidlist=data.list;
            console.log(this.roomidlist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  //根据工单类型查询类别
  getcategory(i){
    var that=this;
    var api = this.config.apiUrl+'/api/category/dw?type='+i;
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
    var that=this;
    var api = this.config.apiUrl+'/api/list/add?';
     this.http.post(api,this.addlist).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.repairlist=data.list;//怎么知道那个是默认房屋
            console.log(this.repairlist)
          }else{
            alert(data.errmsg)
          }
     })
  }
}
