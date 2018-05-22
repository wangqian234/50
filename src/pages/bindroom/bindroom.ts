import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-bindroom',
  templateUrl: 'bindroom.html',
})
export class BindroomPage {

  public project = [];
  public edifice = [];
  public room = [];

  public bindRoom = {
    token: '',
    projectId : '',
    edificeId : '',
    roomId : '',
    relation : '',
    memo:"",
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public http: Http,public storage:StorageProvider) {
  }

  ionViewWillLoad() {
    this.getProject();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BindroomPage');
    this.bindRoom.token = this.storage.get('token');
  }

  //新添加要绑定的房屋
  addBindInfo(){
    console.log(JSON.stringify(this.bindRoom))
     var api = this.config.apiUrl + '/api/UserRoom/add';
      this.http.post(api,(this.bindRoom)).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("成功绑定房屋");
        this.navCtrl.pop();
      } else {
        console.log(data.errmsg);
      }
    });

  }
  //获取项目下拉列表（小区信息）
  getProject(){
    var api = this.config.apiUrl + '/api/House/dw_Project';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.project = data.list;
        console.log(data.list);
      } else {
        console.log(data.errmsg);
      }
      console.log(this.project);
    });
  }
  //根据projectId获取楼栋下拉列表
  getEdifice(){
    var api = this.config.apiUrl + '/api/House/dw_Edifice?projectId=' + this.bindRoom.projectId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.edifice = data.list;
        console.log(data.list);
      } else {
        console.log(data.errmsg);
      }
      console.log(this.edifice);
    });
  }
  //根据edificeId获取房间下拉列表
  getRoom(){
    var api = this.config.apiUrl + '/api/House/dw_Room?edificeId=' + this.bindRoom.edificeId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.room = data.list;
        console.log(data.list);
      } else {
        console.log(data.errmsg);
      }
      console.log(this.room);
    });
  }

  backTo(){
    this.navCtrl.pop();
  }


}
