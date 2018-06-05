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

  public cityName = '西安'
  public cityCode;
  public area;
  public areaCode;
  public aa;
  public Code;
  public RSadd={
  type:'0',
  title:'',
  space:'',
  room:'',
  restroom:'',
  halls:'',
  priceMin:'0',
  priceMax:'',
  phone:'',
  nature:'0',
  district:'',
  describe:'',
  contacts:'',
  street:'',
  region:'',
  city:'',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage :StorageProvider,public config:ConfigProvider,
  public http:Http,public loadingCtrl: LoadingController) {
  }
  ionViewWillEnter(){
    if(this.storage.get('token')){
    } else {
    this.navCtrl.push(LoginPage);
      }
      if(this.navParams.get('item')){

      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentsaleaddPage');
  }

  getRSInfo(){
    if(!this.navParams.get('item')){  //判断添加还是修改
    var j = 3;
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
     var RSadd = {
    "token":this.storage.get("token").toString(),
    "type":this.RSadd.type.toString(),
    "title":this.RSadd.title.toString(),
    "space":this.RSadd.space.toString(),
    "room":this.RSadd.halls.toString(),
    "restroom":this.RSadd.restroom.toString(),
    "halls":this.RSadd.halls.toString(),
    "priceMin":this.RSadd.priceMin.toString(),
    "priceMax": this.RSadd.priceMax.toString(),
    "phone":this.RSadd.phone.toString(),
    "nature":this.RSadd.nature.toString(),
    "district":this.RSadd.district.toString(),
    "describe":this.RSadd.describe.toString(),
    "contacts":this.RSadd.contacts.toString(),
    "street":this.RSadd.street.toString(),
    "region":this.RSadd.region.toString(),
    "city":this.RSadd.city.toString(),
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
     var RSadd = {
    "token":this.storage.get("token").toString(),
    "type":this.RSadd.type.toString(),
    "title":this.RSadd.title.toString(),
    "space":this.RSadd.space.toString(),
    "room":this.RSadd.halls.toString(),
    "restroom":this.RSadd.restroom.toString(),
    "halls":this.RSadd.halls.toString(),
    "priceMin":this.RSadd.priceMin.toString(),
    "priceMax": this.RSadd.priceMax.toString(),
    "phone":this.RSadd.phone.toString(),
    "nature":this.RSadd.nature.toString(),
    "district":this.RSadd.district.toString(),
    "describe":this.RSadd.describe.toString(),
    "contacts":this.RSadd.contacts.toString(),
    "street":this.RSadd.street.toString(),
    "region":this.RSadd.region.toString(),
    "city":this.RSadd.city.toString(),
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
