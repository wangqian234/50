import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-repairevaluate',
  templateUrl: 'repairevaluate.html',
})
export class RepairevaluatePage {
  public listId='';
   //评价post
  public evaluate={
  servicescore:0,
  timelyscore:0,
  qualityscore:0,
  listId:'',
  txtScoreMemo:'',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider
  ,public config:ConfigProvider,public storage:StorageProvider,public http:Http) {
  }
    ionViewWillLoad() {
    this.getRem();
    if(this.navParams.get('id')){
      this.listId=this.navParams.get('id');
      }
    }
    //添加评价
    addevaluate(){
      this.getNum();
      this.evaluate.listId=this.listId;
      console.log(this.evaluate)
      var api = this.config.apiUrl+'/api/list/edit_Score';
      this.http.post(api,this.evaluate).map(res => res.json()).subscribe(data =>{
        if(data.errcode===0&&data.errmsg==='OK'){
            alert("评价成功")
        }else{
          alert(data.errmsg)
        }
      })
    }

    // enSureSub(){
    //   alert(JSON.stringify(this.evaluate));
    // }

  ionViewDidLoad() {
    this.getNum();
  }
  backToRepair(){
    this.navCtrl.pop();
  }
    getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  getNum(){
    var _this = this;
      $('#service').each(function () {
        $(this).find('.pj_xx p').on('click', function () {
          var clickedStar = $(this);
          var stars = clickedStar.parent().find('p');
          var score = +clickedStar.attr('data-score');
          for (var i = 0; i < stars.length; i++) {
            if (i < score) {
              stars.eq(i).addClass('no');
            } else {
              stars.eq(i).removeClass('no');
            }
          }
          _this.evaluate.servicescore = score;
        });
      });

      $('#sertime').each(function () {
        $(this).find('.pj_xx p').on('click', function () {
          var clickedStar = $(this);
          var stars = clickedStar.parent().find('p');
          var score = +clickedStar.attr('data-score');
          for (var j = 0; j < stars.length; j++) {
            if (j < score) {
              stars.eq(j).addClass('no');
            } else {
              stars.eq(j).removeClass('no');
            }
          }
          _this.evaluate.timelyscore = score;
        });
      });

      $('#quility').each(function () {
        $(this).find('.pj_xx p').on('click', function () {
          var clickedStar = $(this);
          var stars = clickedStar.parent().find('p');
          var score = +clickedStar.attr('data-score');
          for (var k = 0; k < stars.length; k++) {
            if (k < score) {
              stars.eq(k).addClass('no');
            } else {
              stars.eq(k).removeClass('no');
            }
          }
          _this.evaluate.qualityscore = score;
        });
      });
  }

}
