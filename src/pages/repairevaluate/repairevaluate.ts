import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import $ from 'jquery';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';


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
  ,public config:ConfigProvider,public storage:StorageProvider,public http:Http,public loadingCtrl: LoadingController, 
  public toastCtrl: ToastController) {
    
  }
    ionViewWillLoad() {
    this.getRem();
    if(this.navParams.get('id')){
      this.listId=this.navParams.get('id');
      }
    }
    ionViewDidEnter(){
      this.storage.set('tabs','false');
    }
    //添加评价
    addevaluate(){
      // let loading = this.loadingCtrl.create({
	    //   showBackdrop: true,
      // });
      // loading.present();
       $(".spinnerbox").fadeIn(200);
       $(".spinner").fadeIn(200);
      this.evaluate.listId=this.listId;
      console.log(this.evaluate)
      var api = this.config.apiUrl+'/api/list/edit_Score';
      this.http.post(api,this.evaluate).map(res => res.json()).subscribe(data =>{
        // loading.dismiss();
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
        console.log(data)
        if(data.errcode===0&&data.errmsg==='OK'){
            alert("评价成功")
            let toast = this.toastCtrl.create({
            message: '评价成功',
            duration: 2000,
            position: 'bottom'
          });
            toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        toast.present();
            this.navCtrl.pop();
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
