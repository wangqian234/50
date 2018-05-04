import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import {Jsonp} from "@angular/http";
//房屋报修
import { RepairaddPage } from '../repairadd/repairadd';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //跳转页面
  public RepairaddPage=RepairaddPage;

  public BindroomPage=BindroomPage

  public focusList=[];  /*数组 轮播图*/
  public roomname = 1;

  constructor(public navCtrl: NavController,public config:ConfigProvider,public jsonp:Jsonp,public httpService:HttpServicesProvider) {

    //调用轮播图

    this.getFocus();
    this.setFontSize();

  }

  //轮播图
  getFocus(){ 
    var that=this;  

      that.focusList=[
        '../assets/imgs/slide01.png',
        '../assets/imgs/slide02.png',
        '../assets/imgs/slide03.jpg',
        '../assets/imgs/rent1.png'
      ];

  }

  setFontSize(){
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      document.documentElement.style.fontSize = (w / 750 * 18) + 'px';
  }

}
