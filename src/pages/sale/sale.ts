//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';

//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
//返回首页
import { TabsPage } from '../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

public ShopgoodsinfoPage=ShopgoodsinfoPage;
public list = [];
public mode = 0 ;

public page = 1;

public wdh=this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config:ConfigProvider,public loadingCtrl: LoadingController,public app: App) {
  }
//抢购时间判断
ifontime(mode){
  $('ion-infinite-scroll').css('display','block');
  
  this.list = [];
  this.page=1;
  this.mode = mode;
     $("#typediv ul li").removeAttr("class");
    var span = "#typediv ul li:nth-of-type(" + ++mode +")"
    $(span).attr("class","activety");
    this.ifontime2("");


}

ifontime2(infiniteScroll){
   let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
   loading.present();
   var api = this.wdh+'/api/goods/list?pageSize=10&pageIndex='+ this.page +'&mode='+ this.mode +'&curCityCode=4403';

   loading.dismiss();
     this.http.get(api).map(res => res.json()).subscribe(data =>{
            if(data.errcode===0 && data.errmsg==="OK"){

        this.list=this.list.concat(data.list);  /*数据拼接*/
        console.log(this.list)
        for(var i=0;i<this.list.length;i++){
          this.list[i].lefttime = this.leftTimer(this.list[i].endtime);
        }
        
        if(data.list.length<10){
          $('ion-infinite-scroll').css('display','none')
        }else{
            this.page++;
        }
        if(infiniteScroll){         
          infiniteScroll.complete();        //告诉ionic 请求数据完成
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            // infiniteScroll.enable(false);
            $('ion-infinite-scroll').css('display','none')
            $('.nomore').css('display','block');
          }
        }
      } else {
        alert(data.errmsg);
     }
     })
}
//  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
//   }
  ionViewDidLoad() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    this.ifontime2("");
   
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

  backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }



}
