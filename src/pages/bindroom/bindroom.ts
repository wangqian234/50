import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-bindroom',
  templateUrl: 'bindroom.html',
})
export class BindroomPage {

  public project = [];
  public edifice = [];
  public room = [];

  public bindRoom = {
    projectId : '',
    edificeId : '',
    roomId : '',
    relation : ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public http: Http) {
  }

  ionViewWillLoad() {
    //this.getProject();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BindroomPage');
  }

  getProject(){
    var api = this.config.apiUrl + '/house/house/dw_Project';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.project = data.list;
        console.log(data.list);
      } else {
        alert(data.errmsg);
      }
      console.log(this.project);
    });
  }

  getEdifice(){
    var api = this.config.apiUrl + '/house/house/dw_Edifice?projectId=' + this.bindRoom.projectId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.edifice = data.list;
        console.log(data.list);
      } else {
        alert(data.errmsg);
      }
      console.log(this.edifice);
    });
  }

  getRoom(){
    var api = this.config.apiUrl + '/house/house/dw_Room?edificeId=' + this.bindRoom.edificeId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.room = data.list;
        console.log(data.list);
      } else {
        alert(data.errmsg);
      }
      console.log(this.room);
    });
  }


}
