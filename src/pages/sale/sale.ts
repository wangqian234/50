//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';

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
 public tabTest={
    li00:"type current",
    li01:"type",
    li02:"type",
    li03:"type",
   
  };
public wdh=this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config:ConfigProvider) {
  }
//抢购时间判断
ifontime(mode){
  
    $("#typediv ul li").removeAttr("class");
    var span = "#typediv ul li:nth-of-type(" + ++mode +")"
    $(span).attr("class","activety");

    var api = this.wdh+'/api/goods/list?pageSize=10&pageIndex=1&mode='+mode+'&curCityCode=4403';
     
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
}
 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

   
     var api = this.wdh+'/api/goods/list?pageSize=10&pageIndex=1&mode=0&curCityCode=4403';
     
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
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



}
