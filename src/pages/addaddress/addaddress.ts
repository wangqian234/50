import { Component } from '@angular/core';
import { NavController, NavParams,App,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { StorageProvider } from '../../providers/storage/storage';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
//收货地址列表
import { AddressPage } from '../address/address';
//返回首页
import { TabsPage } from '../tabs/tabs'

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
  public provinceVal ; //省份id
  public cityVal ; //城市id
  public districtVal ; //街区id
  public addressInfo = [];

  public addressId ="";
  public token = "";
  public areaList;
  public provice = [];
  public city = [];
  public district = [];

  public addressList={
    name : '',
    provinceVal:'pre',
    cityVal:'pre',
    districtVal:'pre',
    province:'',
    city:'',
    district:'',
    address:'',
    code:'',
    mobile:'',
    tel:'',
    cbdefault:false,
    token : '',
    id :'',
  };
    TabsPage = TabsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public config:ConfigProvider,
    public storage:StorageProvider,public loadingCtrl: LoadingController,public app: App, public toastCtrl: ToastController,
    private alertCtrl: AlertController) {
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
    }
  }

  backTo(){
    this.navCtrl.pop();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }


  //添加收货地址（添加或编辑）
  addAddress(){
    if(this.addressList.provinceVal == "" || this.addressList.provinceVal == "pre"){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请选择要添加地址的省份',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }
    if(this.addressList.cityVal == "" || this.addressList.cityVal == "pre"){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请选择要添加地址的城市',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }
    if(this.addressList.districtVal == "" || this.addressList.districtVal == "pre"){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请选择要添加地址的区县',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }
    if(this.addressList.address == ""){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请选择要添加地址的详细地址',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }
    if(this.addressList.name == ""){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请填写您的姓名',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }
    if(this.addressList.mobile == "" || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.addressList.mobile))){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请检查手机号码',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }
    if(this.addressList.code == ""  || !(/^[0-9]{6}$/.test(this.addressList.code))){
        let alert1 = this.alertCtrl.create({
          title: '',
          subTitle: '请检查邮政编码',
          buttons: ['确认']
        });
        alert1.present();
        return;
    }

    for(var i=0;i<this.provinces.length;i++){
      if(this.addressList.provinceVal == this.provinces[i].code){
        this.addressList.province = this.provinces[i].name;
      }
    }

    for(var i=0;i<this.cities.length;i++){
      if(this.addressList.cityVal == this.cities[i].code){
        this.addressList.city = this.cities[i].name;
      }
    }

    for(var i=0;i<this.districts.length;i++){
      if(this.addressList.districtVal == this.districts[i].code){
        this.addressList.district = this.districts[i].name;
      }
    }
    var data = {}; //定义空对象
    if(!this.navParams.get('item')){  //新加还是修改判断
      data = {
      'token' : this.storage.get("token"),
      'name' : this.addressList.name,
      'provinceVal' : this.addressList.provinceVal,
      'cityVal' : this.addressList.cityVal,
      'districtVal' : this.addressList.districtVal,
      'province' : this.addressList.province,
      'city' : this.addressList.city,
      'district' : this.addressList.district,
      'address' : this.addressList.address,
      'code' : this.addressList.code,
      'mobile' : this.addressList.mobile,
      'cbdefault' : this.addressList.cbdefault
    }
      var j = 3;
      var api = this.config.apiUrl + '/api/Address/add';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        let toast = this.toastCtrl.create({
        message: '成功添加地址',
        duration: 2000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
        this.navCtrl.pop();
      } else if(data.errcode === 40002){
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.addAddress();
        }
      } else {
        alert("添加地址失败！")
        console.log("添加失败！");
      }
    });
  } else {
    data = {
      'name' : this.addressList.name,
      'provinceVal' : this.addressList.provinceVal,
      'cityVal' : this.addressList.cityVal,
      'districtVal' : this.addressList.districtVal,
      'province' : this.addressList.province,
      'city' : this.addressList.city,
      'district' : this.addressList.district,
      'address' : this.addressList.address,
      'code' : this.addressList.code,
      'mobile' : this.addressList.mobile,
      'cbdefault' : this.addressList.cbdefault,
      'addressId' :this.addressList.id
    }
      var api = this.config.apiUrl + '/api/Address/edit';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        let toast = this.toastCtrl.create({
          message: '成功修改地址',
          duration: 2000,
          position: 'bottom'
        });
          toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });
      toast.present();
        this.navCtrl.pop();
      } else {
        alert("编辑失败！")
      }
    });
    }
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  //获取省份信息
  getProvinces(){
    var j = 3;
    var api = this.config.apiUrl + '/api/Address/dw_Province?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.provinces = data.list;
      } else if(data.errcode === 40002){
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.addAddress();
      }
    } else {
       alert("获取省份失败")
        console.log(data.errmsg);
      }
    });
  }

  //获取城市信息
  getCities(){
    var api = this.config.apiUrl + '/api/Address/dw_City?provinceCode=' + this.addressList.provinceVal;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.cities = data.list;
      } else {
        alert("获取城市失败")
        console.log(data.errmsg);
      }
    });
  }

  //获取街区信息
  getDistricts(){
    var api = this.config.apiUrl + '/api/Address/dw_District?cityCode=' + this.addressList.cityVal;
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.districts = data.list;
      } else {
        alert("获取街区失败")
        console.log(data.errmsg);
      }
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
    })
  }
 
}
