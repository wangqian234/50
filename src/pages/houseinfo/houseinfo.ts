import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

//wq房屋信息
@Component({
  selector: 'page-houseinfo',
  templateUrl: 'houseinfo.html',
})
export class HouseinfoPage {

  token = '';
  private houseInfo = [];
  houseId = '';
  houseUser = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public config:ConfigProvider, public http: Http,
  public storage:StorageProvider) {
  }

  ionViewWillLoad() {
    this.getRem();
    if(this.navParams.get('item')){
      this.houseId=this.navParams.get('item');
    }
  }

  ionViewDidLoad() {
  }

  //获取用户房屋信息
  getUserRoom(){
    var j = 3;
    var api = this.config.apiUrl + 'api/UserRoom/info?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        for(var i=0; i< data.model.length(); i++){
          if(data.model.mobile != this.storage.get('userName')) {
            this.houseInfo.push(data.model);
          }
        }
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getUserRoom();
          }
      } else {
        alert("data.errmsg")
      }
    });
  }

  //根据房屋获取绑定的用户列表
  getRoomUser(){
    var j = 3;
    var api = this.config.apiUrl + 'api/VUserRoom/list?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseUser = data.list;
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getUserRoom();
          }
      } else {
        alert("data.errmsg")
      }
    });
  }

  //解除用户自己的绑定
  delUserRoom(houseId){
    var j = 3;
    var api = this.config.apiUrl + 'api/UserRoom/del?token=' + this.storage.get('token') + '&roomId=' + houseId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert('解除绑定成功');
        this.navCtrl.pop();
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.delUserRoom(houseId);
          }
      } else {
        alert("data.errmsg")
      }
    });
  }

  appearOtherUser(){
    if($('.otherUser_content').css('display') == 'block'){
      $('.otherUser_content').css('display','none');
      $('.appear img').css('transform', 'rotate(180deg)')
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
    var data;
    var j = 3;
    var api = this.config.apiUrl + 'api/crm/srq/userroom/edit_Default?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    this.http.post(api,JSON.stringify(data)).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("成功设置默认房屋");
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getUserRoom();
          }
      } else {
        alert(data.errmsg)
      }
    });
  }
    //解除其他用户的绑定(要解除的用户id怎么知道)'&delUserId' +this.delUserId
  delOtherUser(){
    var data;
    var j = 3;
    var api = this.config.apiUrl + '/api/UserRoom/del_User?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("成功解除其他用户的绑定");
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getUserRoom();
          }
      } else {
        alert(data.errmsg)
      }
    });
  }

}