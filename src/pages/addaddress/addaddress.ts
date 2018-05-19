import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { StorageProvider } from '../../providers/storage/storage';

//收货地址列表
import { AddressPage } from '../address/address';

@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {

  public provinces = [];
  public provinceCode = [];
  public cities = [];
  public cityCode = [];
  public districts = [];
  public provinceVal = ""; //省份id
  public cityVal = ""; //城市id
  public districtVal = ""; //街区id
  public addressInfo = [];

  public addressId ="";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public config:ConfigProvider,
    public storage:StorageProvider) {
  }

  ionViewWillEnter(){
    this.getRem();
    this.getProvinces();
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

  //添加收货地址（添加或编辑）
  addAddress(){
    var data = {
      'token' : this.storage.get("token"),
      'provinceVal' : this.addressList.provinceVal,
      'cityVal' : this.addressList.cityVal,
      'districtVal' : this.addressList.districtVal,
      'province' : this.getName(this.provinces,this.addressList.provinceVal),
      'city' : this.getName(this.cities,this.addressList.cityVal),
      'district' : this.getName(this.districts,this.addressList.districtVal),
      'address' : this.addressList.address,
      'code' : this.addressList.code,
      'mobile' : this.addressList.mobile,
      'tel' : this.addressList.tel,
      'default' : this.addressList.default,
    }
    if(!this.navParams.get('item')){  //新加还是修改判断
      var api = this.config.apiUrl + '/api/Address/add';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("添加成功！");
        this.navCtrl.push(AddressPage);
      } else {
        alert("添加失败！");
      }
    });
    } else { //api/Address/edit
      var api = this.config.apiUrl + '/api/Address/edit';
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

    //获取省份信息
  getProvinces(){
    var api = this.config.apiUrl + '/api/Address/dw_Province?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.provinces = data.list;
      } else {
        alert(data.errmsg);
      }
      console.log(data.list);
    });
  }

  //获取城市信息
  getCities(){
    var api = this.config.apiUrl + '/api/Address/dw_City?provinceCode=' + this.addressList.provinceVal;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.cities = data.list;
      } else {
        alert(data.errmsg);
      }
      console.log(data.list);
    });
  }

  //获取街区信息
  getDistricts(){
    var api = this.config.apiUrl + '/api/Address/dw_District?cityCode=' + this.addressList.cityVal;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.districts = data.list;
        alert(data.list);
      } else {
        alert(data.errmsg);
      }
      console.log(data.list);
    });
  }

  //根据code获取地区名
  getName(arr,code){
    for(var i=0;i<arr.length;i++){
      if(arr[i].code = code){
        return arr[i].name;
      }
    }
    return "";
  }
    //获取地址信息（地址详情）
  getAddressInfo(){
    var api = this.config.apiUrl + '/api/Address/info?token=' + this.storage.get('token') + '&addressId=' +this.addressId;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
         this.addressInfo = data.model;
         console.log(data.model);
      } else {
        console.log(data.errmsg);
      }
      console.log(data.moedel);
    })
  }
 
}
