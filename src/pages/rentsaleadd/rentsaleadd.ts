import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rentsaleadd',
  templateUrl: 'rentsaleadd.html',
})
export class RentsaleaddPage {
  type;
  title;
  space;
  room;
  rstroom;
  halls;
  priceMin = '0';
  priceMax;
  phone;
  nature;
  district;
  describe;
  contacts;
  street;
  region;
  city = '深圳';

  public RSadd;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage :StorageProvider,public config:ConfigProvider,
  public http:Http,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentsaleaddPage');
  }

  getRSInfo(){
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
    var api = this.config.apiUrl + "/api/rental/add";
    this.http.post(api,this.RSadd).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      alert(data.errcode)
      if (data.errcode === 0 && data.errmsg === 'OK') {
       this.navCtrl.pop();
      } else if(data.errcode === 40002) {
        this.getRSInfo();
      } else {
        alert(data.errmsg);
      }
    });
  }
  
  backTo(){
    this.navCtrl.pop();
  }
}
