import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import {RepairevaluatePage} from '../repairevaluate/repairevaluate'
@Component({
  selector: 'page-repairdetails',
  templateUrl: 'repairdetails.html',
})
export class RepairdetailsPage {

  public repairDetial = {List_Id:''};
  public repairdetaillist =[];
  
  //工单处理post
  public editcloselist={
    listId:'',
    token:'',
    memo:'',
    stopType:'',
    act:'',
  };
 

  public btn:any;  
  public div :any;  
  public close :any;  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider
  ,public config:ConfigProvider,public storage:StorageProvider,public http:Http) {

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
      this.btn = document.getElementById('open_btn');  
      this.div = document.getElementById('background');
      this.close = document.getElementById('close-button'); 
  }
  
  //获取工单详情信息
  getrepairdetails(){
    var that = this;
    var api = this.config.apiUrl+'/api/list/list_IdGroup?crmListId='+this.repairDetial.List_Id;
    this.http.get(api).map(res =>res.json()).subscribe(data =>{
      if(data.errcode===0&&data.errmsg==='OK'){
        this.repairdetaillist=data.list;
      }else{
        alert(data.errmsg)
      }
    })
  }
//终止工单
 stopRepaird(){
   this.div.style.display = "block"; 
   this.editcloselist.listId=this.repairDetial.List_Id;
   this.editcloselist.token=this.storage.get('token');
    var that = this;
    var api = this.config.apiUrl+'/api/list/edit_close';
    this.http.post(api,this.editcloselist).map(res =>res.json()).subscribe(data =>{
      if(data.errcode===0&&data.errmsg==='OK'){
        alert(data.errmsg)
      }else{
        alert(data.errmsg)
      }
    })
 }
 //跳转到
 showevaluate(){
  this.navCtrl.push(RepairevaluatePage,{id:this.repairDetial.List_Id})
 }
 closePopup(){
   this.div.style.display = "none";
 }
 
  enSureStop(){

    // let json={
    //   uid:userinfo._id,   /*注意用户id   _id*/
    //   salt:userinfo.salt
    // }
    // let sign=this.tools.sign(json);
    // var api='api/addressList?uid='+userinfo._id+'&sign='+sign;

    //请求数据
      var api='api/pcate'
      this.httpService.requestData(api,(data)=>{
      // if(data.success){
      //   this.list=data.result;
      //   console.log(this.list)
      // }else{
      //   alert(data.message);
      // }
   
      })
  }

  backToRepair(){
    this.navCtrl.pop();
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  

}
