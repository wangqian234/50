//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';

//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

public ShopgoodsinfoPage=ShopgoodsinfoPage;
public list = [];
public mode = 0 ;
public page = 2;
public lefttime = "";
 public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",
   
  };
public wdh=this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config:ConfigProvider,public loadingCtrl: LoadingController) {
  }
//抢购时间判断
ifontime(mode){
  this.list = [];
  this.mode = mode;
    $("#typediv ul li").removeAttr("class");
    var span = "#typediv ul li:nth-of-type(" + ++mode +")"
    $(span).attr("class","activety");
  let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
   loading.present();
    var api = this.wdh+'/api/goods/list?pageSize=10&pageIndex=1&mode='+ --mode +'&curCityCode=4403';
     loading.dismiss(); 
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
}

ifontime2(infiniteScroll){
    var api = this.wdh+'/api/goods/list?pageSize=10&pageIndex='+ this.page +'&mode='+ this.mode +'&curCityCode=4403';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
        this.list=this.list.concat(data.list); /*数据拼接*/
         console.log(data);
          if(infiniteScroll){
            //告诉ionic 请求数据完成
              this.page++;
            infiniteScroll.complete();
            if(data.list.length<10){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
     } else {
        alert(data.errmsg);
     }
     })
}
 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

   let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
   loading.present();
     var api = this.wdh+'/api/goods/list?pageSize=10&pageIndex=1&mode=0&curCityCode=4403';
     loading.dismiss();
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         for(var i=0;i<data.list.length;i++){
           this.list[i].lefttime = this.leftTimer(data.list[i].endtime);
         }
     } else {
        alert(data.errmsg);
     }
     })
  }
  ionViewDidLoad() {
   
  }

  backTo(){
    this.navCtrl.pop();
  }

  leftTimer(str){ 
    var newDate = new Date(str).getTime();
    var now = new Date().getTime();
    var leftTime:any = newDate - now;
    if(leftTime < 0){
      return "已结束";
    }

    var days = parseInt((leftTime / 1000 / 60 / 60 % 24).toString()); //计算剩余的天数 
    var hours = parseInt((leftTime / 1000 / 60 / 60 % 24).toString()); //计算剩余的小时 
    var minutes = parseInt((leftTime / 1000 / 60 % 60).toString());//计算剩余的分钟 
    var seconds = parseInt((leftTime / 1000 % 60).toString());//计算剩余的秒数 
    // days = this.checkTime(days); 
    // hours = this.checkTime(hours); 
    // minutes = this.checkTime(minutes); 
    // seconds = this.checkTime(seconds); 
    //setInterval("leftTimer(2016,11,11,11,11,11)",1000); 
    return days+"天" + hours+"小时" + minutes+"分";  
  } 
checkTime(i){ //将0-9的数字前面加上0，例1变为01 
  if(i<10) 
  { 
    i = "0" + i; 
  } 
  return i; 
} 

doLoadMore(infiniteScroll){
  this.ifontime2(infiniteScroll);
}



}
