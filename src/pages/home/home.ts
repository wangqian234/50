import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http, Jsonp, Headers, RequestOptions } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { NavController, NavParams, Slides, App } from 'ionic-angular';
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

//房屋明细
import { HouseinfolistPage } from '../houseinfolist/houseinfolist';
//loading
import { LoadingPage } from '../loading/loading';
//在线缴费
import { OnlinepaymentPage } from '../onlinepayment/onlinepayment';
import { LoadingController } from 'ionic-angular';
//测试页面跳转到shopmallist
// import { TestPage } from '../test/test';
import { ShopmalllistPage } from '../shopmalllist/shopmalllist';
import { RentsaleaddPage } from '../rentsaleadd/rentsaleadd';
import { RentsalePage } from '../rentsale/rentsale';
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
import { ShopinfoPage } from '../shopinfo/shopinfo';
import { RentsaleinfoPage } from '../rentsaleinfo/rentsaleinfo';
import { TabsPage } from '../tabs/tabs';
import $ from 'jquery';
declare var BMap;
declare var BMAP_STATUS_SUCCESS;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
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
  //当前页、一页显示的个数
  public cityCode = 4004;
  public city;
  public url;
  public Id;
  public pageIndex = 1;
  public pageSize = 3;
  //获得数据
  public roomname = []; /*数组 获取房屋列表*/
  public house = {};    /*对象 默认房屋*/
  public prearr = {};   /*对象 欠费金额与预存款金额*/
  public focusList = [];  /*数组 轮播图*/
  public newsList = [];   /*数组 最新资讯*/
  public publicget = [];  /*数组 公示公告*/
  public paymentList = [];/*数组 物业缴费明细 */
  public iof_defList = [];/**数组 默认房屋 */
  defRoomId = "";
  public roomidlist = [];/**数组  所有房屋 */
  //跳转页面
  // public TestPage =TestPage
  public RepairaddPage = RepairaddPage;
  public BindroomPage = BindroomPage;
  public PayfeePage = PayfeePage;
  public NewslistPage = NewslistPage;
  public RepairlistPage = RepairlistPage;
  public PayprefeePage = PayprefeePage;
  public ShoppinglistPage = ShoppinglistPage;
  public LoginPage = LoginPage;
  public TabsPage = TabsPage;
  //轮播图的页面跳转
  public RentsalePage = RentsalePage;
  //轮播图的页面跳转
  //public RentsalePage = RentsalePage;

  public HouseinfolistPage = HouseinfolistPage;
  public LoadingPage = LoadingPage;

  public OnlinepaymentPage = OnlinepaymentPage;
  public RentsaleaddPage = RentsaleaddPage;

  constructor(public navCtrl: NavController, public config: ConfigProvider, public navParams: NavParams, public http: Http, public jsonp: Jsonp,
    public storage: StorageProvider, private geolocation: Geolocation, public loadingCtrl: LoadingController, public app: App) {
    this.geolocation1 = Geolocation;
  }

  ionViewWillEnter() {
    //将PX转换为REM
    this.getRem();
    //获取首页轮播图
    this.getFocus();
    //获取最新资讯
    this.getNews();
    //获取最新公告
    this.getPublic();
    if (this.storage.get('token')) {
      this.token = this.storage.get('token');
      this.enSureLoginHome = true;
      // this.getHouseDefault();
      //获取默认房屋
      if (this.storage.get('roomId')) {
        this.defRoomId = this.storage.get('roomId')
        this.getroomId();
        this.getpayment(this.defRoomId);
      } else {
        this.getiof_def();
      }
    } else {
      this.enSureLoginHome = false;
    }

  }

  ionViewDidEnter() {
    this.storage.set('tabs', 'true');
    if (this.storage.get('token')) {
      this.token = this.storage.get('token');
      this.enSureLoginHome = true;
      // this.getHouseDefault();
      //获取默认房屋
      if (this.storage.get('roomId')) {
        this.defRoomId = this.storage.get('roomId')
        this.roomid = this.defRoomId;
        this.getpayment(this.defRoomId);
      } else {
        this.getiof_def();
      }
    } else {
      this.enSureLoginHome = false;
    }
    this.getPosition();
    $('.swiper-container').autoplay = 3000;
    $('.swiper-container').autoplayDisableOnInteraction = false;
  }

  getPosition() {
    var that = this;
    that.geolocation.getCurrentPosition().then((resp) => {
      var point = new BMap.Point(resp.coords.longitude,resp.coords.latitude);
      var gc = new BMap.Geocoder();
      gc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        that.storage.set("currentPlace", addComp.city);
        that.cityCodeList.forEach(function (val, index, arr) {
          if (addComp.city == arr[index].name) {
            that.storage.set("currentPlaceCode", arr[index].val);
          }
        })
      });
    });
  }

  getFocus() {
    var api = this.config.apiUrl + '/api/Index/banner?citycode=' + this.storage.get('currentPlaceCode');
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.focusList = data.list;
        console.log(this.focusList);
      } else {

      }
    })
  }
  //轮播图详情
  getInfo(url) {
    this.url = url.substring(0, 3);
    this.Id = url.substring(3, )
    if (url === "HRSHome") {
      //this.navCtrl.push(RentsalePage)
      this.app.getRootNav().push(TabsPage, {
        goto: "rent"
      });
    } else if (this.url === "gId") {
      this.navCtrl.push(ShopinfoPage, { sid: this.Id })
    } else if (this.url === "sId") {
      this.navCtrl.push(ShopinfoPage, { sid: this.Id })
    } else if (this.url === "rez") {
      this.navCtrl.push(RentsaleinfoPage, { houseId: this.Id, houseType: 2, quFen: 1 })
    } else if (this.url === "res") {
      this.navCtrl.push(RentsaleinfoPage, { houseId: this.Id, houseType: 1, quFen: 1 })
    }
  }

  getNews() {
    var j = 3;
    if (this.storage.get('token')) {
      this.token = this.storage.get('token');
    } else {
      this.token = '';
    }
    var api = this.config.apiUrl + '/api/Nwes/list?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyWord=&token=' + this.token + '&act=zx&type=1';
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.newsList = data.list;
      } else if (data.errcode === 40002) {
        j--;
        if (j > 0) {
          this.config.doDefLogin();
          this.getNews();
        }
      } else {
        alert("data.errmsg")
      }
    });
  }
  //获取公示公告

  getPublic() {
    var j = 3;
    if (this.storage.get('token')) {
      this.token = this.storage.get('token');
    } else {
      this.token = '';
    }
    var api = this.config.apiUrl + '/api/Nwes/list?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyWord=&token=' + this.token + '&act=gs&type=1';
    this.http.get(api).map(res => res.json()).subscribe(data => {
      this.storage.set('tabs', 'true');
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.publicget = data.list;
        console.log(this.publicget)
      } else if (data.errcode === 40002) {
        j--;
        if (j > 0) {
          this.config.doDefLogin();
          this.getPublic();
        }
      } else {
        alert("data.errmsg")
      }
    });

  }

  getNewInfo(nid) {
    alert(this.storage.get('tabs'))
    this.navCtrl.push(NewinfoPage, {
      id: nid
    });
  }
  getNewsList(act) {
    this.navCtrl.push(NewslistPage, {
      act: act
    })
  }
  //查询默认房屋
  getiof_def() {
    var j = 3
    var api = this.config.apiUrl + '/api/userroom/info_def?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        //this.iof_defList=data.model;
        this.defRoomId = data.model.House_Room_Id;
        this.roomid = this.defRoomId;
        this.storage.set('roomId', this.defRoomId)
        this.getpayment(data.model.House_Room_Id);
        this.getroomId();
      } else if (data.errcode === 4002) {
        j--;
        this.config.doDefLogin();
        this.getiof_def();
      } else {
        alert(data.errmsg)
      }
    })
  }
  //查询用户绑定的所有房屋
  getroomId() {
    var that = this;
    var j = 3;
    var api = this.config.apiUrl + '/api/vuserroom/dw?token=' + this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        that.roomidlist = data.list;
        console.log(that.roomidlist)
      } else if (data.errcode === 4002) {
        j--;
        this.config.doDefLogin();
        this.getroomId();
      } else {
        alert(data.errmsg)
      }
    })
  }
  //获取物业费用
  getpayment(roomid) {
    var that = this;
    var j = 3;
    var api = this.config.apiUrl + '/api/charge/list?roomId=' + roomid;   //获取到绑定的房屋
    this.http.get(api).map(res => res.json()).subscribe(data => {
      this.paymentList = data.json.totalNum.model;
    });
  }

  changeRoom(roomid) {
    if (this.roomid === "add") {
      this.navCtrl.push(BindroomPage);
    } else {
      this.storage.set('roomId', roomid)
      this.getpayment(roomid)
    }
  }


  getRem() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  //跳转页面
  goPayfee() {
    //确认登录状态
    if (this.storage.get('token')) {
      this.navCtrl.push(PayfeePage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goRepairadd(type) {
    //确认登录状态
    if (this.storage.get('token')) {
      this.navCtrl.push(RepairaddPage, { type: type });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goHouseinfolist() {
    //确认登录状态
    if (this.storage.get('token')) {
      this.navCtrl.push(HouseinfolistPage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goPayrefee() {
    //确认登录状态
    if (this.storage.get('token')) {
      this.navCtrl.push(PayprefeePage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goShoppinglist(id) {
    //确认登录状态
    if (this.storage.get('token')) {
      this.navCtrl.push(ShoppinglistPage, { id: id });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goRentsaleadd() {
    //确认登录状态
    if (this.storage.get('token')) {
      this.navCtrl.push(RentsaleaddPage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goNewslist(act) {
    if (this.storage.get('token')) {
      this.navCtrl.push(NewslistPage, { act: act });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  goOnlinepayment() {
    if (this.storage.get('token')) {
      this.navCtrl.push(OnlinepaymentPage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  //下拉刷新
  doRefresh(refresher) {
    console.log('刷新开始', refresher);
    setTimeout(() => {
      //获取最新资讯
      this.getNews();
      //获取最新公告
      this.getPublic();
      if (this.storage.get('token')) {
        this.token = this.storage.get('token');
        this.enSureLoginHome = true;
        // this.getHouseDefault();
        //获取默认房屋
        if (this.storage.get('roomId')) {
          this.defRoomId = this.storage.get('roomId')
          this.getroomId();
          this.getpayment(this.defRoomId);
        } else {
          this.getiof_def();
        }
      } else {
        this.enSureLoginHome = false;
      }
      refresher.complete();
    }, 2000);
  }
  // getcityCodeList(cityname){
  //   var that = this;
  //   that.cityCodeList.forEach(function(val, index, arr){
  //     if(cityname == arr[index].name){
  //       that.storage.set("currentPlaceCode",arr[index].val)
  //     }
  //   })
  // }
  cityCodeList = [
    { name: "鞍山市", val: "2103" },
    { name: "阿拉善盟", val: "1529" },
    { name: "安庆市", val: "3408" },
    { name: "安阳市", val: "4105" },
    { name: "阿里地区", val: "5425" },
    { name: "安康市", val: "6109" },
    { name: "安顺市", val: "5204" },
    { name: "阿坝藏族羌族自治州", val: "5132" },
    { name: "阿拉尔市", val: "659002" },
    { name: "阿克苏地区", val: "6529" },
    { name: "澳门特别行政区", val: "8201" },
    { name: "阿勒泰地区", val: "6543" },
    { name: "西安市", val: "6101" },

    { name: "白城市", val: "2208" },
    { name: "包头市", val: "1502" },
    { name: "巴彦淖尔市", val: "1508" },
    { name: "保定市", val: "1306" },
    { name: "本溪市", val: "2105" },
    { name: "白山市", val: "2206" },
    { name: "亳州市", val: "3416" },
    { name: "蚌埠市", val: "3403" },
    { name: "滨州市", val: "3716" },
    { name: "白银市", val: "6204" },
    { name: "宝鸡市", val: "6103" },
    { name: "保山市", val: "5305" },
    { name: "白沙黎族自治县", val: "469030" },
    { name: "清远市", val: "4418" },
    { name: "深圳市", val: "4403" },

    // <p data-id="451000">百色市</p>
    // <p data-id="522401">毕节市</p>
    // <p data-id="450500">北海市</p>
    // <p data-id="511900">巴中市</p>
    // <p data-id="469035">保亭黎族苗族自治县</p>
    // <p data-id="652800">巴音郭楞蒙古自治州</p>
    // <p data-id="652700">博尔塔拉蒙古自治州</p>
    // <p data-id="110100">北京市</p>
  ]

}
