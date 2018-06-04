import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-rentsaleadd',
  templateUrl: 'rentsaleadd.html',
})
export class RentsaleaddPage {
  type='0';
  title;
  space;
  room;
  rstroom;
  halls;
  priceMin = '0';
  priceMax;
  phone;
  nature='0';
  district;
  describe;
  contacts;
  street;
  region;
  city = 4403;
  public cityName = '西安'
  public cityCode;
  public area;
  public areaCode;
  public aa;
  public Code;
  public RSadd;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage :StorageProvider,public config:ConfigProvider,
  public http:Http,public loadingCtrl: LoadingController) {
  }
  ionViewWillEnter(){
    if(this.storage.get('token')){

} else {
this.navCtrl.push(LoginPage);
}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentsaleaddPage');
  }

  getRSInfo(){
    if(1){  //判断添加还是修改
    var j = 3;
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    this.RSadd = {
    "token":this.storage.get("token").toString(),
    "type":this.type.toString(),
    "title":this.title.toString(),
    "space":this.space.toString(),
    "room":this.halls.toString(),
    "rstroom":this.rstroom.toString(),
    "halls":this.halls.toString(),
    "priceMin":this.priceMin.toString(),
    "priceMax": this.priceMax.toString(),
    "phone":this.phone.toString(),
    "nature":this.nature.toString(),
    "district":this.district.toString(),
    "describe":this.describe.toString(),
    "contacts":this.contacts.toString(),
    "street":this.street.toString(),
    "region":this.region.toString(),
    "city":this.city.toString(),
  }
    var api = this.config.apiUrl + "/api/rental/add";
    console.log(this.RSadd)
    this.http.post(api,this.RSadd).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert(data.errmsg)
       this.navCtrl.pop();
      } else if(data.errcode === 40002) {
        this.getRSInfo();
      } else {
        alert(data.errmsg);
      }
    });
  }else{
       var j = 3;
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    this.RSadd = {
    "token":this.storage.get("token").toString(),
    "type":this.type.toString(),
    "title":this.title.toString(),
    "space":this.space.toString(),
    "room":this.halls.toString(),
    "rstroom":this.rstroom.toString(),
    "halls":this.halls.toString(),
    "priceMin":this.priceMin.toString(),
    "priceMax": this.priceMax.toString(),
    "phone":this.phone.toString(),
    "nature":this.nature.toString(),
    "district":this.district.toString(),
    "describe":this.describe.toString(),
    "contacts":this.contacts.toString(),
    "street":this.street.toString(),
    "region":this.region.toString(),
    "city":this.city.toString()
  }
    var api = this.config.apiUrl + "/api/rental/edit";
    console.log(this.RSadd)
    this.http.post(api,this.RSadd).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert(data.errcode)
       this.navCtrl.pop();
      } else if(data.errcode === 40002) {
        this.getRSInfo();
      } else {
        alert(data.errmsg);
      }
    });
  }
}

//获取城市代码
getCityCode(){
  var api = this.config.apiUrl + '/api/rental/getCity?cityName='+this.cityName;
  this.http.get(api).map(res => res.json()).subscribe(data => {
    if(data.errcode == 0 && data.errmsg == 'OK'){
        this.cityCode = data.model;
        console.log(this.cityCode)
        this.area = this.cityCode.code;
        this.getAreaCode();
    }else{
      alert(data.errmsg);
    }
  })
}
//获取街道代码
getAreaCode(){
  var api = this.config.apiUrl + '/api/rental/arealist?pId='+this.area;
  this.http.get(api).map(res => res.json()).subscribe(data => {
    if(data.errcode == 0 && data.errmsg == 'OK'){
        this.areaCode = data.list;
        console.log(this.areaCode)
        this.aa = this.areaCode[1].code 
        this.getCode();
    }else{
      alert(data.errmsg);
    }
  })
}
getCode(){
  var api = this.config.apiUrl + '/api/rental/arealist?pId='+this.aa;
  this.http.get(api).map(res => res.json()).subscribe(data => {
    if(data.errcode == 0 && data.errmsg == 'OK'){
        this.Code = data.list;
        console.log(this.Code)
        this.aa = this.Code.code 
    }else{
      alert(data.errmsg);
    }
  })
}
  
  backTo(){
    this.navCtrl.pop();
  }
}
