import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Jsonp}from '@angular/http';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
/**
 * Generated class for the ShoppingevaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoppingevaluate',
  templateUrl: 'shoppingevaluate.html',
})
export class ShoppingevaluatePage {

   //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;
  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public config: ConfigProvider,public http : Http) {
  }

  ionViewWillLoad(){//钩子函数，将要进入页面的时候触发
    this.getRem();
    var that = this;
    var api = this.aa +'/api/tradegoods/list?pageSize=10&pageIndex=1&goodsId=26';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
         this.list= data.list;
         alert(JSON.stringify(this.list));
      }else{
        alert(data.errmsg);
      }
    })
  }
  //大小单位rem
  getRem(){
     var w = document.documentElement.clientWidth || document.body.clientWidth;
     document.documentElement.style.fontSize = (w / 750 * 18) + 'px';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingevaluatePage');
  }

}
