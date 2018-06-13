import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

//登录页面
import { LoginPage } from '../login/login';

//wq房屋信息
@Component({
  selector: 'page-houseinfo',
  templateUrl: 'houseinfo.html',
})
export class HouseinfoPage {

  token = '';
  private houseInfo = [];
  public houseId;
  houseUser = [];
  projectinfo = [];
  public LoginPage = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config:ConfigProvider, public http: Http,
  public storage:StorageProvider) {
  }

  ionViewWillLoad() {
    this.getRem();
    if(this.navParams.get('id')){
      this.houseId=this.navParams.get('id');
      console.log(this.houseId)
    }
    this.getProjectInfo();
    this. getUserRoom();
    this.getRoomUser();

    //确认登录状态
    if(this.storage.get('token')){

    } else {
    this.navCtrl.push(LoginPage);
    }
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }

  //获取用户房屋信息
  getUserRoom(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var j = 3;
    var api = this.config.apiUrl + '/api/UserRoom/info?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        // for(var i=0; i< data.model.length(); i++){
        //   if(data.model.mobile != this.storage.get('userName')) {
        //     this.houseInfo.push(data.model);
        //   }
        // }
        data.model.date = data.model.date.replace("T"," ")
        this.houseInfo=data.model; 
        console.log(JSON.stringify(this.houseInfo)+"用户房屋信息")
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getUserRoom();
          }
      } else {
        console.log(data.errmsg);
      }
    });
  }

  //获取用户楼栋信息
  getProjectInfo(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var api = this.config.apiUrl + '/api/VUserRoom/info?roomId=' + this.houseId;
    console.log(api)
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.projectinfo=data.model;
      } else {
        console.log(data.errmsg);
          }
      })
  }

  //根据房屋获取绑定的用户列表
  getRoomUser(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var j = 3;
    var api = this.config.apiUrl +'/api/VUserRoom/list?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    console.log(api);
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log(JSON.stringify(data)+"用户列表");
        this.houseUser = data.list;
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getRoomUser();
          }
      } else {
        console.log(data.errmsg)
      }
    });
  }

  //解除用户自己的绑定
  delUserRoom(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var data = {
      'token':this.storage.get('token'),
      'roomId':this.houseId,
    };
    var j = 3;
    if(confirm("确定解除绑定吗？")){
    var api = this.config.apiUrl + '/api/UserRoom/del?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("成功解绑"+JSON.stringify(data))
        this.navCtrl.pop();
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.delUserRoom();
          }
      } else {
        console.log(data.errmsg)
      }
    });
    }
  }

  appearOtherUser(){
    if($('.otherUser_content').css('display') == 'block'){
      $('.otherUser_content').css('display','none');
      $('.appear img').css('transform', 'rotate(180deg)')
      this.getRoomUser();
    } else {
      $('.otherUser_content').css('display','block');
      $('.appear img').css('transform', 'rotate(270deg)')
    }
  }

  backTo(){
    this.navCtrl.pop();
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }

  //设置默认房屋
  setDefaultHouse(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var data ={
      'token': this.storage.get('token'),
      'roomId':this.houseId,
    };
    var j = 3;
    var api = this.config.apiUrl + '/api/userroom/edit_Default?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("成功设置默认房屋"+JSON.stringify(data));
        this.getUserRoom();
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getUserRoom();
          }
      } else {
        console.log(data.errmsg)
      }
    });
  }
  //解除其他用户的绑定(要解除的用户id怎么知道)'&delUserId' +this.delUserId
  delOtherUser(id){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var data = {
      'token': this.storage.get('token'),
      'roomId':this.houseId,
      'delUserId':id,
    };
    var j = 3;
    var api = this.config.apiUrl + '/api/UserRoom/del_User?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("成功解除其他用户的绑定"+JSON.stringify(data));
         this.getRoomUser();
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.delOtherUser(id);
          }
      } else {
        console.log(data.errmsg)
      }
    });
  }

}