import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-newinfo',
  templateUrl: 'newinfo.html',
})
export class NewinfoPage {

  newInfo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public config:ConfigProvider, public http: Http) {
  }

  ionViewWillLoad() {
    if(this.navParams.get('id')){
      this.getNewInfo(this.navParams.get('id'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewinfoPage');
  }

  getNewInfo(id){
    var api = this.config.apiUrl + '/api/Nwes/info?nId=' + id;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.newInfo = data.model;
        alert(this.newInfo)
      } else {
        alert("data.errmsg")
      }
    });
  }

}
