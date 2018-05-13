import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
/**
 * Generated class for the RepairevaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repairevaluate',
  templateUrl: 'repairevaluate.html',
})
export class RepairevaluatePage {
  public listId='';
   //评价post
  public evaluate={
  servicescore:'',
  timelyscore:'',
  qualityscore:'',
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
     //这里需要对工单状态的判断来修改CSS if(repairDetial.报修状态 == )
      }
      
    }
    //添加评价
    addevaluate(){
      this.evaluate.listId=this.listId;
      //this.evaluate.qualityscore= 通过ngmodel来获取
      var that =this;
      var api = this.config.apiUrl+'/api/list/edit_Score';
      this.http.post(api,this.evaluate).map(res => res.json()).subscribe(data =>{
        if(data.errcode===0&&data.errmsg==='OK'){
            alert("评价成功")
        }else{
          alert(data.errmsg)
        }
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairevaluatePage');
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
    $('.you').each(function () {
    $(this).find('.pj_xx p').on('click', function () {
      alert("123")
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
    });
    });
}



}
