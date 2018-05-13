import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http, Jsonp, Headers, RequestOptions } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';

//房屋报修
import { RepairaddPage } from '../repairadd/repairadd';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';
//跳入登录页面
import { LoginPage } from '../login/login';

//新闻详情页面
import { NewinfoPage } from '../newinfo/newinfo';

//费用明细页面
import { PayfeePage } from '../payfee/payfee';
//费用预存页面
import { PayprefeePage } from '../payprefee/payprefee';
//资讯列表页面
import { NewslistPage } from '../newslist/newslist';
//工单详情页
import { RepairlistPage } from '../repairlist/repairlist';
//商城订单
import { ShoppinglistPage } from '../shoppinglist/shoppinglist';


//测试页面跳转到shopmallist
import { TestPage } from '../test/test';
import { ShopmalllistPage } from '../shopmalllist/shopmalllist';



declare var BMap;
declare var BMAP_STATUS_SUCCESS;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;
  myIcon: any;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  public roomid: any;
  public enSureLoginHome: boolean;

  //发送数据
  public token = '';

  //获得数据
  public roomname = []; /*数组 获取房屋列表*/
  public house = {};    /*对象 默认房屋*/
  public prearr = {};   /*对象 欠费金额与预存款金额*/
  public focusList = [];  /*数组 轮播图*/
  public newsList = [];   /*数组 最新资讯*/
  public publicget = [];  /*数组 公示公告*/

  //跳转页面
  public RepairaddPage = RepairaddPage;
  public BindroomPage = BindroomPage;
  public payfeePage=PayfeePage;
  public NewslistPage=NewslistPage;
  public RepairlistPage = RepairlistPage;
  public PayprefeePage = PayprefeePage;
  public ShoppinglistPage = ShoppinglistPage;

  constructor(public navCtrl: NavController, public config: ConfigProvider, public navParams: NavParams, public http: Http,
    public storage: StorageProvider, private geolocation: Geolocation) {
  }

  ionViewWillEnter() {
    //将PX转换为REM
    this.getRem();
    //获取首页轮播图
     this.getFocus();
    // if (this.storage.get('token')) {
    //   this.token = this.storage.get('token');
    //   this.enSureLoginHome = true;
    //   //获取默认房屋
    //   this.getHouseDefault();
    //   //获取最新资讯
       this.getNews();
    //   //获取最新公告
    //   this.getPublic();
    // } else {
    //   this.enSureLoginHome = false;
    // }
  }

  // ionViewDidEnter() {
    // let map =
    //   this.map =
    //   new BMap.Map(
    //     this.map_container.nativeElement
    //   );//创建地图实例

    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    // map.addControl(new BMap.MapTypeControl());//地图类型切换
    // map.setCurrentCity("广州"); //设置当前城市

    /*let point = new BMap.Point(34.23615, 108.913014);//坐标可以通过百度地图坐标拾取器获取
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    map.centerAndZoom(point, 18);*///设置中心和地图显示级别

    // let sizeMap = new BMap.Size(10, 80);//显示位置
    // map.addControl(new BMap.NavigationControl());

    // let myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(300, 157));
    // let marker = this.marker = new BMap.Marker(point, { icon: myIcon });
    // map.addOverlay(marker);

    /*this.getLocationByIp()*/
  // }

  // getLocationByBrowser() {
  //   let geolocation1 = this.geolocation1 = new BMap.Geolocation();
  //   geolocation1.getCurrentPosition((r) => {
  //     let mk = this.marker = new BMap.Marker(r.point, { icon: this.myIcon });
  //     if (geolocation1.getStatus() == BMAP_STATUS_SUCCESS) {
  //       this.map.addOverlay(mk);
  //       this.map.panTo(r.point, 16);
  //       console.log('浏览器定位：您的位置是 ' + r.point.lng + ',' + r.point.lat);
  //     }
  //     else {
  //       alert('failed' + this.geolocation1.getStatus());
  //     }
  //   }, { enableHighAccuracy: false })
  // }

  // getLocationByIp() {
  //   let myCity = new BMap.LocalCity();
  //   myCity.get(result => {
  //     console.log("jieguo结果:" + JSON.stringify(result));
  //     let cityName = result.name;
  //     this.map.setCenter(cityName);
  //     console.log("当前定位城市:" + cityName);
  //     alert("当前定位城市:" + cityName);
  //   });
  // }
  // getLocationByCity() {
  //   let city = "广州";
  //   if (city != "") {
  //     this.map.centerAndZoom(city, 16);      // 用城市名设置地图中心点
  //   }
  // }
  // getLocationByLatLon() {
  //   let point = new BMap.Point(113.38028471135, 23.129702256122);
  //   let marker = this.marker = new BMap.Marker(point, { icon: this.myIcon });
  //   this.map.addOverlay(marker);
  //   this.map.centerAndZoom(point, 16);
  // }
  // getLocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     alert(resp.coords.longitude + "sdsds" + resp.coords.latitude);
  //     let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
  //     let convertor = new BMap.Convertor();
  //     let pointArr = [];
  //     pointArr.push(locationPoint);
  //     convertor.translate(pointArr, 1, 5, (data) => {
  //       if (data.status === 0) {
  //         let marker = this.marker = new BMap.Marker(data.points[0], { icon: this.myIcon });
  //         this.map.panTo(data.points[0]);
  //         marker.setPosition(data.points[0]);
  //         this.map.addOverlay(marker);
  //       }
  //     })
  //     console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
  //   })
  // }

  //轮播图
  getFocus() {
    var that = this;
    that.focusList = [
      'assets/imgs/slide01.png',
      'assets/imgs/slide02.png',
      'assets/imgs/slide03.jpg',
      'assets/imgs/rent1.png'
    ];
  }
  // //测试跳转至商品  
  // goShop() {

  //   this.navCtrl.push(TestPage);
  // }


  // getHouseDefault() {
  //   // var j = 3;  //确定递归次数，避免死循环
  //   // var api = this.config.apiUrl + '/crm/srq/vuserroom/list_User?token=' + this.storage.get('token');
  //   // this.http.get(api).map(res => res.json()).subscribe(data =>{
  //   //   if (data.errcode === 0 && data.errmsg === 'OK') {
  //   //     this.roomname = data.list;
  //   //     for ( var i = 0; i <data.list.length; i++){
  //   //       if(data.list[i].Default == 0){ //状态待定
  //   //         this.house = data.list[i];
  //   //         this.roomid = this.roomname[2].Id;
  //   //         this.getPreArrFee(data.list[i]);
  //   //         break;
  //   //       }
  //   //       console.log(data)
  //   //     }
  //   //   } else if(data.errcode === 40002) {
  //   //       j--;
  //   //       if(j>0){
  //   //         this.config.doDefLogin();
  //   //         this.getHouseDefault();
  //   //       }
  //   //   } else {
  //   //     alert(data.errmsg);
  //   //   }
  //   //   console.log("获取房屋" + data)
  //   // });
  // }

  // //获取到房屋信息后获取预交费
  // getPreArrFee(data) {
  //   // var roomId = {'roomId' : data};
  //   // var api = this.config.apiUrl + '/house/charge/list';方法不确定
  //   // this.http.post(api,(data)).map(res => res.json()).subscribe(data =>{
  //   // });
  // }

  getNews() {
    var j = 3;
    var api = this.config.apiUrl + '/api/Nwes/list?pageIndex=1&pageSize=3&keyWord=&type=1&token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.newsList = data.list;
        console.log(this.newsList);
      } else if (data.errcode === 40002) {
        j--;
        if (j > 0) {
          this.config.doDefLogin();
          this.getNews();
        }
      } else {
        alert("data.errmsg")
      }
      console.log("获取最新资讯", data)
    });
  }

  // getPublic() {

  // }

  getNewInfo(nid) {
    this.navCtrl.push(NewinfoPage, {
      id: nid
    });
  }

  // changeRoom() {
  //   if (this.roomid === "add") {
  //     this.navCtrl.push(BindroomPage);
  //   }
  // }

  getRem() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
}
