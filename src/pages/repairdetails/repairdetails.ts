import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import {RepairevaluatePage} from '../repairevaluate/repairevaluate'
import{RepairlistPage}from '../repairlist/repairlist'
@Component({
  selector: 'page-repairdetails',
  templateUrl: 'repairdetails.html',
})
export class RepairdetailsPage {

  public repairDetial ;
  public repairdetaillist =[];
  public disposememo = [];
  
  //工单处理post
  public editcloselist={
    listId:'',
    token:'',
    memo:'',
    stopType:'-1',
    act:'',
  };
  public cd;
  public btn:any;  
  public div :any;  
  public close :any;  
  public stop :any;
  public evaluate : any;
  public stateName;
  public finish:any;
  public evaluateContent:any;
  public app:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider
  ,public config:ConfigProvider,public storage:StorageProvider,public http:Http) {
  }

  ionViewWillLoad() {
    this.getRem();
    if(this.navParams.get('item')){
      this.repairDetial=this.navParams.get('item');
    }
    this. getrepairdetails();
    console.log($(".arrow-past .arrow-next"));
    $(".arrow-past .arrow-next").css({'border-top': '15px solid #00a2ca', 'border-bottom': '15px solid #00a2ca'});
    $(".arrow-current .arrow-pre").css('border-left', '15px solid #00a2ca');
    $(".step-container li.step-current").css('background-color', '#00a2ca');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairdetailsPage');
      this.btn = document.getElementById('open_btn');  
      this.div = document.getElementById('background');
      this.close = document.getElementById('close-button'); 
      this.stop = document.getElementById('stop');
      this.evaluate=document.getElementById('evaluate');
      this.finish =document.getElementById('finish');
      this.evaluateContent =document.getElementById('evaluateContent')
      this.app=document.getElementById('app')
  }
  
  //获取工单详情信息
  getrepairdetails(){
    var that = this;
    var api = this.config.apiUrl+'/api/list/list_IdGroup?crmListId='+this.repairDetial+'&token='+this.storage.get('token');
    console.log(api)
    this.http.get(api).map(res =>res.json()).subscribe(data =>{
      if(data.errcode===0&&data.errmsg==='OK'){
        var listStr;
        this.repairdetaillist=data.list[0];
        console.log(this.repairdetaillist)
        if(data.list[0].disposememo){
          listStr = data.list[0].disposememo;
          this.disposememo = listStr.split("<br />");
        }
         this.stateName=data.list[0].statename;
         this.repairdState();
      }else{
        alert(data.errmsg)
      }

    })
    
  }
//终止工单
 enSureStop(){
   this.editcloselist.listId=this.repairDetial;
   this.editcloselist.token=this.storage.get('token');
   this.editcloselist.act="close";
   console.log(this.editcloselist)
    var that = this;
    var api = this.config.apiUrl+'/api/list/edit_close';
    this.http.post(api,this.editcloselist).map(res =>res.json()).subscribe(data =>{
      if(data.errcode===0&&data.errmsg==='OK'){
        alert(data.errmsg)
        this.closePopup();
        //this.cd.detectChanges();
        this.navCtrl.push("RepairlistPage");
      }else{
        alert(data.errmsg)
      }
    }) 
 }
 //工单处理
 showPopup(){
  this.div.style.display = "block"; 
 }
 //工单处理应该显示的状态                   
 repairdState(){
    switch(this.stateName)
    {
      case "待派工":
      this.stop.style.display = "block";
      break;
      case "待接单":
      this.stop.style.display = "block";
      break;
      case "处理中":
      this.stop.style.display = "block";
      this.finish.style.display = "block";
      this.app.style.display = "block";
      break;
      case "待评价":
      this.app.style.display = "block";
      this.evaluate.style.display = "block";
      break;
      case "已完成":
      this.app.style.display = "block";
      this.evaluateContent.style.display = "block";
      break;
      case "已终止":
      this.app.style.display = "block";
      break;
      default:
    }
 }
 //
 //跳转到
 showevaluate(){
  this.navCtrl.push(RepairevaluatePage,{id:this.repairDetial})
 }
 closePopup(){
   this.div.style.display = "none";
 }
 
  // enSureStop(){

  //   // let json={
  //   //   uid:userinfo._id,   /*注意用户id   _id*/
  //   //   salt:userinfo.salt
  //   // }
  //   // let sign=this.tools.sign(json);
  //   // var api='api/addressList?uid='+userinfo._id+'&sign='+sign;

  //   //请求数据
  //     var api='api/pcate'
  //     this.httpService.requestData(api,(data)=>{
  //     // if(data.success){
  //     //   this.list=data.result;
  //     //   console.log(this.list)
  //     // }else{
  //     //   alert(data.message);
  //     // }
   
  //     })
  // }

  backToRepair(){
    this.navCtrl.pop();
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  

}
