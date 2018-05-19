import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rentsalelist',
  templateUrl: 'rentsalelist.html',
})
export class RentsalelistPage {

  houseInfo = [];
  houseType;
  nature;
  pageIndex = 1;
  curCityCode = 4403;
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http,public loadingCtrl: LoadingController) {
  }

  ionViewWillLoad() {
    if(this.navParams.get('id')){
      switch(this.navParams.get('id')){
        case 1 : 
            this.houseType = 2;
            this.getRentInfo('');
            break;
        case 2 : 
          this.nature = 2;
          this.houseType = 1;
          this.getSaleInfo('');
          break;
        case 3 : 
          this.nature = 1;
          this.houseType = 1;
          this.getSaleInfo('');
          break;;
      }

    }
  }

  getRentInfo(infiniteScroll){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();

    if(this.item){
      var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" 
          + this.pageIndex+"&curCityCode=" + this.curCityCode + "&type=" + this.houseType + "&horder=" + this.item;
    } else {
      var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=" 
        + this.curCityCode + "&type=" + this.houseType;
    }
    this.http.get(api).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseInfo = this.houseInfo.concat(data.list);
        if(infiniteScroll){
            //告诉ionic 请求数据完成
              this.pageIndex++;
            infiniteScroll.complete();
            if(data.list.length<10){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
      } else {
        alert("data.errmsg")
      }
    });  
  }

  getSaleInfo(infiniteScroll){
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    if(this.item){
      var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" 
          + this.pageIndex+"&curCityCode=" + this.curCityCode + "&type=" + this.houseType + "&nature=" + this.nature + "&horder=" + this.item;
    } else {
      var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=" + this.curCityCode
          + "&nature=" + this.nature + "&type=" + this.houseType;
    }
    console.log(api)
    this.http.get(api).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseInfo = this.houseInfo.concat(data.list);
        console.log(this.houseInfo);
        if(infiniteScroll){
            //告诉ionic 请求数据完成
              this.pageIndex++;
            infiniteScroll.complete();
            if(data.list.length<10){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
      } else {
        alert("data.errmsg")
      }
    }); 
  }

  orderBy(item){
    this.houseInfo = [];
    this.pageIndex = 1;
    this.item = item;
    this.getRentInfo('');
  }

  doLoadMore(infiniteScroll){
    if(this.navParams.get('id') == 1){
      this.getRentInfo(infiniteScroll);
    } else {
      this.getSaleInfo(infiniteScroll);
    }
  }

  ionViewDidLoad() {
    this.clickCSS();
  }

    clickCSS(){
    $("#test li").click(function(){
      $("#test li").each(function(){
        $(this).attr("class","type");
      })
      $(this).attr("class","type current");
    })
  }

  backTo(){
    this.navCtrl.pop();
  }

}
