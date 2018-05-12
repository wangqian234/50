import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import {NewinfoPage} from '../newinfo/newinfo'
/**
 * Generated class for the NewslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newslist',
  templateUrl: 'newslist.html',
})
export class NewslistPage {
  //接收数据 get
  public newsList=[];
  //页面跳转
  public NewinfoPage = NewinfoPage;

 constructor(public navCtrl: NavController,public config:ConfigProvider, public navParams: NavParams,public http: Http,
  public storage:StorageProvider) {
  }

  ionViewWillEnter(){
    this.getRem();
    this.getNews();

  }
//获取最新资讯全部列表
    getNews(){
    var j = 3;
    var api = this.config.apiUrl + '/api/Nwes/list?pageIndex=1&pageSize=10&keyWord='+1+'&type='+1+'&token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.newsList = data.list;
        console.log(this.newsList);
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getNews();
          }
      } else {
        alert(data.errmsg)
      }
       console.log("获取最新资讯" , data)
    });
  }
  //跳转到资讯详情页面
    getNewInfo(id){
    this.navCtrl.push(NewinfoPage,{
      id:id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewslistPage');
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }

}
