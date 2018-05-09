import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public config:ConfigProvider) {

  }

  ionViewWillEnter(){
    this.getRem();
    if(this.navParams.get('item')){
      this.addressList=this.navParams.get('item');
      '天津市〡天津市〡和平区〢123123123'
      this.addressList.province = this.addressList.address
    }
    this.areaList = $("#areaList")
    this.intProvince();
  }

  backToAddress(){
    this.navCtrl.pop();
  }

  ionViewDidEnter(){
    /*打开省市区选项*/
      $("#expressArea").click(function() {
        $("#areaMask").fadeIn();
        $("#areaLayer").animate({"bottom": 0});
      });
      /*关闭省市区选项*/
      $("#areaMask, #closeArea").click(function() {
        this.clockArea();
      });
  }

  /*初始化省份*/
intProvince() {
	var areaCont = "";
	for (var i=0; i<this.config.province.length; i++) {
		areaCont += '<li (click)="selectP(' + i + ');">' + this.config.province[i] + '</li>';
	}
	this.areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").removeAttr("click").hide();
}

/*选择省份*/
selectP(p) {
	var areaCont = "";
	this.areaList.html("");
	for (var j=0; j<this.config.city[p].length; j++) {
		areaCont += '<li (click)="selectC(' + p + ',' + j + ');">' + this.config.city[p][j] + '</li>';
	}
	this.areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	var expressArea = this.config.province[p] + " > ";
	$("#backUp").attr("(click)", "intProvince();").show();
}

/*选择城市*/
selectC(p,c) {
	var areaCont = "";
	for (var k=0; k<this.config.district[p][c].length; k++) {
		areaCont += '<li onClick="selectD(' + p + ',' + c + ',' + k + ');">' + this.config.district[p][c][k] + '</li>';
	}
	this.areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	var sCity = this.config.city[p][c];
	if (sCity != "省直辖县级行政单位") {
		if (sCity == "东莞市" || sCity == "中山市" || sCity == "儋州市" || sCity == "嘉峪关市") {
			var expressArea = expressArea + sCity;
			$("#expressArea dl dd").html(expressArea);
			this.clockArea();
		} else if (sCity == "市辖区" || sCity == "市辖县" || sCity == "香港岛" || sCity == "九龙半岛" || sCity == "新界" || sCity == "澳门半岛" || sCity == "离岛" || sCity == "无堂区划分区域") {
			expressArea += "";
		} else {
			expressArea += sCity + " > ";
		}
	}
	$("#backUp").attr("(click)", "selectP(" + p + ");");
}

/*选择区县*/
selectD(p,c,d) {
	this.clockArea();
	var expressArea = expressArea + this.config.district[p][c][d];
	$("#expressArea dl dd").html(expressArea);
}

/*关闭省市区选项*/
clockArea() {
	$("#areaMask").fadeOut();
	$("#areaLayer").animate({"bottom": "-100%"});
	this.intProvince();
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
