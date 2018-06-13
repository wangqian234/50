import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { StorageProvider } from '../../providers/storage/storage';
@Component({
  selector: 'page-newinfo',
  templateUrl: 'newinfo.html',
})
export class NewinfoPage {

  newInfo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public config:ConfigProvider, public http: Http,public storage:StorageProvider,) {
        
  }

  ionViewWillLoad() {
    if(this.navParams.get('id')){
      this.getNewInfo(this.navParams.get('id'));
    }
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewinfoPage');
  }

  getNewInfo(id){
     $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var api = this.config.apiUrl + '/api/Nwes/info?nId=' + id;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.newInfo = data.model;
        $("#content").html(data.model.addDate)
        $("#content").html(data.model.body)
        console.log(JSON.stringify(data))
      } else {
        alert("data.errmsg")
      }
    });
  }

  backTo(){
    this.navCtrl.pop();
  }

}
