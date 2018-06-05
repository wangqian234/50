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
import { LoadingController } from 'ionic-angular';
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
  public stop :boolean;
  public evaluate : boolean;
  public stateName;
  public finish:boolean;
  public evaluateContent:boolean;
  public app:boolean;
  public finishRepaired:boolean;
public background:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider
  ,public config:ConfigProvider,public storage:StorageProvider,public http:Http,public loadingCtrl: LoadingController) {
  }

  ionViewWillLoad() {
    this.getRem();
    if(this.navParams.get('item')){
      this.repairDetial=this.navParams.get('item');
    }
    console.log($(".arrow-past .arrow-next"));
    $(".arrow-past .arrow-next").css({'border-top': '15px solid #00a2ca', 'border-bottom': '15px solid #00a2ca'});
    $(".arrow-current .arrow-pre").css('border-left', '15px solid #00a2ca');
    $(".step-container li.step-current").css('background-color', '#00a2ca');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairdetailsPage');
  }
  ionViewDidEnter(){
    this.getrepairdetails();
  }
  //获取工单详情信息
  getrepairdetails(){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    var that = this;
    var api = this.config.apiUrl+'/api/list/list_IdGroup?crmListId='+this.repairDetial+'&token='+this.storage.get('token');
    this.http.get(api).map(res =>res.json()).subscribe(data =>{
      loading.dismiss();
      if(data.errcode===0&&data.errmsg==='OK'){
        var listStr;
        if(data.list[0].time)
        data.list[0].time = data.list[0].time.toString().replace("T"," ").substring(0,19);
        this.repairdetaillist=data.list[0];
        if(data.list[0].disposememo){
          listStr = data.list[0].disposememo;
          this.disposememo = listStr.split("<br />");
          console.log(this.disposememo)
        }
         this.stateName=data.list[0].statename;
        this.stateRepaird();
      }else{
        alert(data.errmsg)
      }
    })
  }
  //确认工单状态
  stateRepaird(){
        switch(this.stateName)
    {
      case "待派工":
      this.stop = true;
      this.finish = false;
       this.evaluate = false;
       this.evaluateContent = false;
      this.app = false;
      break;
      case "待接单":
       this.stop = true;
      this.finish = false;
       this.evaluate = false;
       this.evaluateContent = false;
      this.app = false;
      break;
      case "处理中":
       this.stop = true;
      this.finish = true;
       this.evaluate = false;
       this.evaluateContent = false;
      this.app = true;
      break;
      case "待评价":
       this.stop = false;
      this.finish = false;
       this.evaluate = true;
       this.evaluateContent = false;
      this.app = true;
      break;
      case "已完成":
       this.stop = true;
      this.finish = false;
       this.evaluate = false;
       this.evaluateContent = true;
      this.app = true;
      break;
      case "已终止":
       this.stop = false;
       this.finish = false;
       this.evaluate = false;
       this.evaluateContent = false;
       this.app = true;
      break;
      default:
    }
  }
//终止工单
 enSureStop(){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
   this.editcloselist.listId=this.repairDetial;
   this.editcloselist.token=this.storage.get('token');
   this.editcloselist.act="close";
   console.log(this.editcloselist)
    var that = this;
    var api = this.config.apiUrl+'/api/list/edit_close';
    this.http.post(api,this.editcloselist).map(res =>res.json()).subscribe(data =>{
      loading.dismiss();
      if(data.errcode===0&&data.errmsg==='OK'){
        this.closePopup();
        this.getrepairdetails(); 
      }else{
        alert(data.errmsg)
      }
    }) 
 }
//完成工单
 enSureFinish(){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
   this.editcloselist.listId=this.repairDetial;
   this.editcloselist.token=this.storage.get('token');
   this.editcloselist.act="finish";
   if(this.editcloselist.stopType=="0"){
    this.editcloselist.memo=this.editcloselist.memo;
   }else{
     this.editcloselist.memo=" ";
   }
   console.log(this.editcloselist)
    var that = this;
    var api = this.config.apiUrl+'/api/list/edit_close';
    this.http.post(api,this.editcloselist).map(res =>res.json()).subscribe(data =>{
      loading.dismiss();
      if(data.errcode===0&&data.errmsg==='OK'){
        alert(data.errmsg)
        this.closeFinishPopup();
        this.getrepairdetails();
      }else{
        alert(data.errmsg)
      }
    }) 
 }
 //工单处理
 showFinishPopup(){
  //this.finishRepaired.style.display = "block"
 }
 closeFinishPopup(){
    //this.finishRepaired.style.display = "none"
 }
 showPopup(){
  //this.div.style.display = "block"; 
 }
  closePopup(){
   //this.div.style.display = "none";
 }
 //跳转到
 showevaluate(){
  this.navCtrl.push(RepairevaluatePage,{id:this.repairDetial})
 }
  backToRepair(){
    this.navCtrl.pop();
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  

}
