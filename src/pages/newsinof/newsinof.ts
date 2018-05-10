import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the NewsinofPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newsinof',
  templateUrl: 'newsinof.html',
})
export class NewsinofPage {
  //新闻接收数据list
  public newslist=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider, public storage:StorageProvider, public http:Http,public jsonp:Jsonp) {
  }

//主页面加载函数 
   ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 18) + 'px';

    var that=this;
    var api = this.config.apiUrl+'/hsh/news/info?nId='+this.navParams.get('id');   
   this.http.get(api).map(res => res.json()).subscribe(data =>{
     if(data.errcode===0&&data.errmsg==='OK'){
     this.newslist =data.model;
     console.log(this.newslist)
     alert(this.newslist)
     }else{
       alert(data.errmsg)
     }
   })

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsinofPage');
  }

}
