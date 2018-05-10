import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import {CityDataProvider} from "../../providers/city-data/city-data";

//收货地址列表
import { AddressPage } from '../address/address';

@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {

  public token = "";
  public areaList;
  public provice = [];
  public city = [];
  public district = [];

  public addressList={
    provinceVal:'',
    cityVal:'',
    districtVal:'',
    province:'',
    city:'',
    district:'',
    address:'',
    code:'',
    mobile:'',
    tel:'',
    default:'',
    token : ''
  }

  cityColumns: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public config:ConfigProvider,
    public cityDataProvider: CityDataProvider) {
    this.cityColumns = this.cityDataProvider.cities;
  }

  ionViewWillEnter(){
    this.getRem();
    if(this.navParams.get('item')){
      this.addressList=this.navParams.get('item');
      var ss = this.addressList.address.split("〡");
      this.addressList.province = ss[0];
      this.addressList.city = ss[1];
      var ss1 = ss[2].split("〢");
      this.addressList.district = ss1[0];
      this.addressList.address = ss1[1];
      console.log(this.addressList);
    }
  }

  backToAddress(){
    this.navCtrl.pop();
  }

  ionViewDidEnter(){
    
  }

  
  addAddress(){
    // var data = {
    //   'token' : this.token,
    //   'provinceVal' : this.addressList.provinceVal,
    //   'cityVal' : this.addressList.cityVal,
    //   'districtVal' : this.addressList.districtVal,
    //   'province' : this.addressList.province,
    //   'city' : this.addressList.city,
    //   'district' : this.addressList.district,
    //   'address' : this.addressList.address,
    //   'code' : this.addressList.code,
    //   'mobile' : this.addressList.mobile,
    //   'tel' : this.addressList.tel,
    //   'default' : this.addressList.default,
    // }
    this.addressList.token = this.token;
    var data = this.addressList;
    if(!this.navParams.get('item')){  //新加还是修改判断
      var api = this.config.apiUrl + '/user/address/add';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加成功！");
        this.navCtrl.push(AddressPage);
      } else {
        alert("添加失败！");
      }
    });
    } else {
      var api = this.config.apiUrl + '/user/address/edit';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加成功！");
        this.navCtrl.push(AddressPage);
      } else {
        alert("添加失败！");
      }
    });
    }
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
 
}
