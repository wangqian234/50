import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-rentsalemy',
  templateUrl: 'rentsalemy.html',
})
export class RentsalemyPage {

  pageSize = 10;
  pageIndex = 1;
  curCityCode = "4403"
  type;
  mylist = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http) {
  }

  ionViewDidLoad() {
    this.clickCSS();
    this.myPublish(1);
  }

  myPublish(type){
    this.pageIndex = 1;
    this.type = type;
    var api = this.config.apiUrl + "/api/rental/mylist?pageSize=" + this.pageSize + "&pageIndex=" + this.pageIndex +
     "&curCityCode=" + this.curCityCode + "&type=" + this.type + "&token=" + this.storage.get("token");
      this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        if(data.list.length == 0){
          $('.nomore').css("display","block")
        }
      } else {
        alert(data.errmsg)
      }
    });
  }

  myPublishList(infiniteScroll){
    var api = this.config.apiUrl + "/api/rental/mylist?pageSize=" + this.pageSize + "&pageIndex=" + this.pageIndex +
     "&curCityCode=" + this.curCityCode + "&type=" + this.type + "&token=" + this.storage.get("token");
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
          this.mylist = this.mylist.concat(data.list);
          if(infiniteScroll) {
              //告诉ionic 请求数据完成
              this.pageIndex++;
              infiniteScroll.complete();
            if(data.list.length<11){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
      } else {
        alert(data.errmsg)
      }
    });
          

  }

  doLoadMore(infiniteScroll){
    this.myPublishList(infiniteScroll);  
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
