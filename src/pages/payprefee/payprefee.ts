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

    //结算函数 
    gopay(){
    this.getRem();
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

}
