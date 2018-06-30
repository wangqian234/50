import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  public storage:StorageProvider, public toastCtrl:ToastController,private alertCtrl: AlertController) {
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
    var j = 3;
    var api = this.config.apiUrl + '/api/UserRoom/info?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
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
    var api = this.config.apiUrl + '/api/VUserRoom/info?roomId=' + this.houseId;
    console.log(api)
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.projectinfo=data.model;
      } else {
        console.log(data.errmsg);
          }
      })
  }

  //根据房屋获取绑定的用户列表
  getRoomUser(){
    var j = 3;
    var api = this.config.apiUrl +'/api/VUserRoom/list?token=' + this.storage.get('token') + '&roomId=' + this.houseId;
    console.log(api);
    this.http.get(api).map(res => res.json()).subscribe(data =>{
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
    var data = {
      'token':this.storage.get('token'),
      'roomId':this.houseId,
    };
    var j = 3;
    let alert1 = this.alertCtrl.create({
      title: '',
      message: '确认解除绑定吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: '确认',
          handler: () => {
            var api = this.config.apiUrl + '/api/UserRoom/del?';
            this.http.post(api,data).map(res => res.json()).subscribe(data =>{
              if (data.errcode === 0 && data.errmsg === 'OK') {
                // console.log("成功解绑"+JSON.stringify(data))
                let toast = this.toastCtrl.create({
                  message: '解除绑定成功',
                  duration: 2000,
                  position: 'bottom'
                });
                  toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });
              toast.present();
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
      ]
    });
    alert1.present();
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
        var r= confirm("确认将该房屋设置为默认房屋吗？")
        if (r!=true)
        {
          return;
        }
    var data ={
      'token': this.storage.get('token'),
      'roomId':this.houseId,
    };
    var j = 3;
    var api = this.config.apiUrl + '/api/userroom/edit_Default?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        // console.log("成功设置默认房屋"+JSON.stringify(data));
        let toast = this.toastCtrl.create({
          message: '设置默认房屋成功',
          duration: 2000,
          position: 'bottom'
        });
          toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });
      toast.present();
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
      var r= confirm("确认删除该成员与此房屋的绑定")
      if (r!=true) {
          return;
      }
    var data = {
      'token': this.storage.get('token'),
      'roomId':this.houseId,
      'delUserId':id,
    };
    var j = 3;
    var api = this.config.apiUrl + '/api/UserRoom/del_User?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("成功解除其他用户的绑定"+JSON.stringify(data));
        let toast = this.toastCtrl.create({
          message: '解除其他用户成功',
          duration: 2000,
          position: 'bottom'
        });
          toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });
      toast.present();
         this.getRoomUser();
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.delOtherUser(id);
          }
      } else {
        alert(data.errmsg)
      }
    });
  }

}