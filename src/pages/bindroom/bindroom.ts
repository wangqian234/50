import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import $ from 'jquery' 
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public http: Http,
  public storage:StorageProvider,public toastCtrl:ToastController) {

}

  ionViewWillLoad() {
    this.getProject();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BindroomPage');
    this.bindRoom.token = this.storage.get('token');
  }

  //新添加要绑定的房屋
  addBindInfo(){
    if(this.bindRoom.projectId == "" || this.bindRoom.edificeId == "" || this.bindRoom.roomId == ""){
      alert("请选择所要绑定的房屋信息");
      return;
    }
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
     var api = this.config.apiUrl + '/api/UserRoom/add';
      this.http.post(api,(this.bindRoom)).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        let toast = this.toastCtrl.create({
          message: '成功绑定房屋',
          duration: 2000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
        console.log("成功绑定房屋");
        this.navCtrl.pop();
      } else {
        alert(data.errmsg);
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
