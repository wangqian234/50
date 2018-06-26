import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import {NewinfoPage} from '../newinfo/newinfo'
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-newslist',
  templateUrl: 'newslist.html',
})
export class NewslistPage {
  //接收数据 get
  public newsList=[];
  //页面跳转
  public NewinfoPage = NewinfoPage;
  //接收传过来的新闻类型
  public act = '';
  public token;
  public type='0';
  public keywords='';
  public page=1;
  constructor(public navCtrl: NavController,public config:ConfigProvider, public navParams: NavParams,public http: Http,
  public storage:StorageProvider,public loadingCtrl: LoadingController) {
    
  }

  ionViewWillEnter(){
    this.getRem();
    this.getNews('');

  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  //获取最新资讯全部列表
    getNews(infiniteScroll){       
      if(this.navParams.get("act")){
        this.act = this.navParams.get("act");
        if(this.act=='gs'){
          $('.11').css('display','block')
          $('.22').css('display','block')
          $('.33').css('display','block')
          $('.44').css('display','none')
          $('.55').css('display','none')
        }else if(this.act == 'zx'){
          $('.11').css('display','none')
          $('.22').css('display','none')
          $('.33').css('display','none')
          $('.44').css('display','block')
          $('.55').css('display','block')
        }
      }
     if(this.storage.get('token')){
        this.token = this.storage.get('token')
      }else{
        this.token = '';
       }
        $(".spinnerbox").fadeIn(200);
        $(".spinner").fadeIn(200);
        var j = 3;
        var api = this.config.apiUrl + '/api/Nwes/list?pageIndex='+this.page +'&pageSize=10&keyWord='+this.keywords+'&type='+this.type+'&token=' + this.token+'&act='+this.act;
        console.log(api);
        this.http.get(api).map(res => res.json()).subscribe(data =>{
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
        if (data.errcode === 0 && data.errmsg === 'OK') {
          if(data.list.length<10){
           $('.nomore').css('display','block');
          }
        this.newsList=this.newsList.concat(data.list);
         console.log(this.newsList)
          console.log(this.page)
          this.page++;
        if(infiniteScroll){
          infiniteScroll.complete();
          if(data.list.length<10){
             infiniteScroll.enable(false);
           $('.nomore').css('display','block');
          }
       }      
      } else if(data.errcode === 40002){
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.newsList=[];
            this.page = 1;
            this.getNews(infiniteScroll);
          }
      } else {
        alert(data.errmsg)
      }
       console.log("获取最新资讯" , data)
    });
  }
  //切换type时重新查找新闻列表
  getNewsList(){
     this.newsList=[];
     this.page=1;
     this.getNews("");
  }
  //跳转到资讯详情页面
    getNewInfo(id){
    this.navCtrl.push(NewinfoPage,{
      id:id
    });
  }
  onSearchKeyUp(event){
    if("Enter"==event.key){
      this.newsList=[];
      this.page=1;
     this.getNews("");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewslistPage');
  }
    //加载更多
  doLoadMore(infiniteScroll){
    this.getNews(infiniteScroll);
  }

  backTo(){
    this.navCtrl.pop();
  }
  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
        this.getNewsList();
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }

}
