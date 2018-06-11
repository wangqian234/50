import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

import { ChangeDetectorRef } from '@angular/core'; //更新页面

@IonicPage()
@Component({
  selector: 'page-tradegoods-addrefund',
  templateUrl: 'tradegoods-addrefund.html',
})
export class TradegoodsAddrefundPage {
  public SD_id;    
  public evaluateList={
    trade_Id:'',
    commentGroup:'',
    token : ''
  };

     //定义token
  public token=this.storage.get('token');
  //定义congfig中公共链接的变量aa
  public aa = this.config.apiUrl;//http://test.api.gyhsh.cn/api/tradegoods/add?pageSize=10&pageIndex=1&trade_State=0&token=111
 
  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http,
  public cd: ChangeDetectorRef, public jsonp:Jsonp ,public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {
     this.storage.set('tabs','false');
        this.SD_id=navParams.get('tradeId');
      
  }
  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
        this.getRem();
        this.getdetaillist();
  }
  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
  getdetaillist(){
  }
  addEvaluate(){
      var j=3;
      var api = this.aa+'/api/tradegoods/add';
      this.evaluateList.token = this.token;
      //var date = this.evaluateList;
      this.http.post(api,this.evaluateList).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加成功！");
        //this.navCtrl.push(ShoppinglistPage);
      }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.addEvaluate();
          }
      } else {
        alert("添加失败！");
      }
    });
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TradegoodsAddrefundPage');
  }

  backTo(){
    this.navCtrl.pop();
  }

}
