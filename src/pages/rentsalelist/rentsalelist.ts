import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rentsalelist',
  templateUrl: 'rentsalelist.html',
})
export class RentsalelistPage {

  houseInfo = [];
  houseType;
  pageIndex = 1;
  curCityCode = 4403;

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http,public loadingCtrl: LoadingController) {
  }

  ionViewWillLoad() {
    if(this.navParams.get('id')){
      switch(this.navParams.get('id')){
        case 1 : 
            this.houseType = 2;
            this.getRentInfo();
            break;
        case 2 : break;
        case 3 : break;
      }

    }
  }

  getRentInfo(){
    var api = this.config.apiUrl + "/api/rental/list?pageSize=10&pageIndex=" + this.pageIndex+"&curCityCode=" + this.curCityCode + "&type=" + this.houseType;
    console.log(api)
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.houseInfo = this.houseInfo.concat(data.list);
        console.log(this.houseInfo)
      } else {
        alert("data.errmsg")
      }
    });  
  }

  orderBy(item){

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
