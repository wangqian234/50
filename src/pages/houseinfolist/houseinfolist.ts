import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import $ from 'jquery';


import { HouseinfoPage } from '../houseinfo/houseinfo';
import { BindroomPage } from '../bindroom/bindroom';

import { LoginPage } from '../login/login';
/**
 * Generated class for the HouseinfolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-houseinfolist',
  templateUrl: 'houseinfolist.html',
})
export class HouseinfolistPage {
  public data = {
    token:'',
    roomId:''
  }
  houseId = '';
  public houseList = [];

  public BindroomPage = BindroomPage;

  public HouseinfoPage = HouseinfoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config:ConfigProvider, public http:Http, public storage: StorageProvider, public toastCtrl:ToastController) {
    
}
  
  getHouseInfo(id){
    this.navCtrl.push(HouseinfoPage,{id:id});
  }

  backTo(){
    this.navCtrl.pop();
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter HouseinfolistPage');
        //确认登录状态
    if(this.storage.get('token')){

    } else {
    this.navCtrl.push(LoginPage);
    }
    this.getHouseList();
  }

  ionViewDidEnter(){
    this.storage.set('tabs','false');
    $('.curstate').each(function(){
      var $item = $(this);
      if($item.html() === '未通过审核'){
        $item.addClass('unchecked');
      }else if($item.html() === '审核通过'){
        $item.addClass('checked');
      }
    });

  }
 

  getHouseList(){
    var j = 3;
    console.log(this.storage.get('token'));
    var api = this.config.apiUrl + '/api/VUserRoom/list_User?token='+ this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseList = data.list;
        console.log(this.houseList)
      } else if(data.errcode === 40002){
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.getHouseList();
        }
      } else {
        console.log(data.errmsg);
      }
    });
  }
    //设置默认房屋
  setDefaultHouse(id){
    var data ={
      'token': this.storage.get('token'),
      'roomId':id,
    };
    var j = 3;
    var api = this.config.apiUrl + '/api/userroom/edit_Default?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("成功设置默认房屋"+JSON.stringify(data));
        let toast = this.toastCtrl.create({
          message: '设置默认房屋成功',
          duration: 2000,
          position: 'bottom'
        });
          toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });
      toast.present();
        this.getHouseList();
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.setDefaultHouse(id);
          }
      } else {
        console.log(data.errmsg)
      }
    });
  }

   //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
        this.getHouseList();
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }
 

}
