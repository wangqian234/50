import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';

import { ShoppingPage } from '../shopping/shopping';

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  public token = "";
  public personInfo = {};
  public currentPlace = "";
  public keywords = "";
  public callback;

  public ShoppingPage = ShoppingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public storage:StorageProvider,public config:ConfigProvider) {
    this.callback = this.navParams.get("callback");
  }
  

  ionViewDidLoad() {
    this.currentPlace = this.storage.get("currentPlace");
    this.gotoHere();
    this.getKeyWord();
  }

  gotoHere(){
    var that = this;
      $('.container').show();
      //选择城市 start
      $('ion-content').on('click', '.city-list p', function () {
          let change = {
            changePlace : $(this).html(),
            changePlaceCode : $(this).attr("data-id")
          }
         that.callback(change).then(()=>{
            that.navCtrl.pop();
          });
      });
      //点击索引查询城市
      $('ion-content').on('click', '.letter a', function () {
        $('.scroll-content').scrollTop(0);
          var s = $(this).html();
          $('.scroll-content').scrollTop($('#' + s + '1').offset().top);
          $("#showLetter span").html(s);
          $("#showLetter").show().delay(500).hide(0);
      });
      //中间的标记显示
      $('ion-content').on('onMouse', '.showLetter span', function () {
          $("#showLetter").show().delay(500).hide(0);
      });
  }

  backTo(){
    this.navCtrl.pop();
  }

  onSearchKeyUp(e){

                var val = this.keywords;
                if(!val || val.trim().length === 0){
                    $('.city-list p[data-id]').removeClass('hidden');
                    return;
                }
                $('.city-list p[data-id]').each(function(){
                    var $cityItem = $(this);
                    if($cityItem.html().indexOf(val) < 0){
                        $cityItem.addClass('hidden');
                    } else{
                        $cityItem.removeClass('hidden');
                    }
                });

    }

    getKeyWord(){

    }

}
