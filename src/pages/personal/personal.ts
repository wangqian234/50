import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  public token = "";
  public personInfo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public storage:StorageProvider,public config:ConfigProvider, public http: Http) {
  }

  ionViewDidLoad() {
    this.getUserInfo();
  }

  getUserInfo(){
    var api = this.config.apiUrl + '/user/user/info?token=' +  this.token;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      this.personInfo = data.model
    });
  }

  loginOut(){

    //用户信息保存在localstorage
    this.storage.remove('userinfo');

    //跳转到用户中心
    this.navCtrl.popToRoot();

  }
}
