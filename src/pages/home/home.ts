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
            alert(addComp.city)
            alert(arr[index].val)
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
{name:"鞍山市",val:"2103"},
{name:"阿拉善盟",val:"1529"},
{name:"安庆市",val:"3408"},
{name:"安阳市",val:"4105"},
{name:"阿里地区",val:"5425"},
{name:"安康市",val:"6109"},
{name:"安顺市",val:"5204"},
{name:"阿坝藏族羌族自治州",val:"5132"},
{name:"阿拉尔市",val:"659002"},
{name:"阿克苏地区",val:"6529"},
{name:"澳门特别行政区",val:"8201"},
{name:"阿勒泰地区",val:"6543"},

{name:"白城市",val:"2208"},
{name:"包头市",val:"1502"},
{name:"巴彦淖尔市",val:"1508"},
{name:"保定市",val:"1306"},
{name:"本溪市",val:"2105"},
{name:"白山市",val:"2206"},
{name:"亳州市",val:"3416"},
{name:"蚌埠市",val:"3403"},
{name:"滨州市",val:"3716"},
{name:"白银市",val:"6204"},
{name:"宝鸡市",val:"6103"},
{name:"保山市",val:"5305"},
{name:"白沙黎族自治县",val:"469030"},
{name:"百色市",val:"469030"},
{name:"毕节市",val:"522401"},
{name:"北海市",val:"4505"},
{name:"巴中市",val:"5119"},
{name:"保亭黎族苗族自治县",val:"469035"},
{name:"巴音郭楞蒙古自治州",val:"6528"},
{name:"博尔塔拉蒙古自治州",val:"6527"},
{name:"北京市",val:"1101"},

{name:"长治市",val:"1404"},
{name:"沧州市",val:"1309"},
{name:"常州市",val:"3204"},
{name:"慈溪市",val:"330282"},
{name:"常熟市",val:"320581"},
{name:"承德市",val:"1308"},
{name:"赤峰市",val:"1504"},
{name:"长春市",val:"2201"},
{name:"郴州市",val:"4310"},
{name:"长沙市",val:"4301"},
{name:"滁州市",val:"3411"},
{name:"常德市",val:"4307"},
{name:"巢湖市",val:"3414"},
{name:"池州市",val:"3417"},
{name:"澄迈县",val:"469027"},
{name:"崇左市",val:"4514"},
{name:"昌江黎族自治县",val:"469031"},
{name:"楚雄彝族自治州",val:"5323"},
{name:"潮州市",val:"4451"},
{name:"重庆市",val:"5001"},
{name:"成都市",val:"5101"},
{name:"昌都地区",val:"5421"},
{name:"昌吉回族自治州",val:"6523"},

{name:"大兴安岭地区",val:"2327"},
{name:"大同市",val:"1402"},
{name:"大庆市",val:"2306"},
{name:"丹阳市",val:"321181"},
{name:"大连市",val:"2102"},
{name:"丹东市",val:"2106"},
{name:"东营市",val:"3705"},
{name:"德州市",val:"3714"},
{name:"达州市",val:"5117"},
{name:"大理白族自治州",val:"5329"},
{name:"儋州市",val:"469003"},
{name:"定安县",val:"469025"},
{name:"迪庆藏族自治州",val:"5334"},
{name:"德阳市",val:"5106"},
{name:"东方市",val:"469007"},
{name:"德宏傣族景颇族自治州",val:"5331"},
{name:"东莞市",val:"4419"},
{name:"定西市",val:"6211"},

{name:"鄂尔多斯市",val:"1506"},
{name:"鄂州市",val:"4207"},
{name:"恩施土家族苗族自治州",val:"4228"},

{name:"阜新市",val:"2109"},
{name:"抚顺市",val:"2104"},
{name:"福清市",val:"350181"},
{name:"阜阳市",val:"3412"},
{name:"肥城市",val:"370983"},
{name:"抚州市",val:"3610"},
{name:"福州市",val:"3501"},
{name:"佛山市",val:"4406"},
{name:"防城港市",val:"4506"},

{name:"广州市",val:"4401"},
{name:"赣州市",val:"3607"},
{name:"广元市",val:"5108"},
{name:"广安市",val:"5116"},
{name:"桂林市",val:"4503"},
{name:"贵港市",val:"4508"},
{name:"贵阳市",val:"5201"},
{name:"甘孜藏族自治州",val:"5133"},
{name:"甘南藏族自治州",val:"6230"},
{name:"固原市",val:"6404"},
{name:"果洛藏族自治州",val:"6326"},

{name:"黑河市",val:"2311"},
{name:"葫芦岛市",val:"2114"},
{name:"海宁市",val:"330481"},
{name:"淮安市",val:"3208"},
{name:"衡水市",val:"1311"},
{name:"呼和浩特市",val:"1501"},
{name:"湖州市",val:"3305"},
{name:"鹤岗市",val:"2304"},
{name:"呼伦贝尔市",val:"1507"},
{name:"哈尔滨市",val:"2301"},
{name:"邯郸市",val:"1304"},
{name:"杭州市",val:"3301"},
{name:"鹤壁市",val:"4106"},
{name:"菏泽市",val:"3717"},
{name:"黄石市",val:"4202"},
{name:"怀化市",val:"4312"},
{name:"淮北市",val:"3406"},
{name:"黄冈市",val:"4211"},
{name:"衡阳市",val:"4304"},
{name:"合肥市",val:"3401"},
{name:"淮南市",val:"3404"},
{name:"黄山市",val:"3410"},
{name:"河池市",val:"4512"},
{name:"海口市",val:"4601"},
{name:"河源市",val:"4416"},
{name:"红河哈尼族彝族自治州",val:"5325"},
{name:"惠州市",val:"4413"},
{name:"汉中市",val:"6107"},
{name:"贺州市",val:"4511"},
{name:"海西蒙古族藏族自治州",val:"6328"},
{name:"海东市",val:"6321"},
{name:"黄南藏族自治州",val:"6323"},
{name:"哈密地区",val:"6522"},
{name:"海北藏族自治州",val:"6322"},
{name:"和田地区",val:"6532"},
{name:"海南藏族自治州",val:"6325"},

{name:"锦州市",val:"2107"},
{name:"金华市",val:"3307"},
{name:"晋中市",val:"1407"},
{name:"江阴市",val:"320281"},
{name:"吉林市",val:"2202"},
{name:"佳木斯市",val:"2308"},
{name:"鸡西市",val:"2303"},
{name:"嘉兴市",val:"3304"},
{name:"晋城市",val:"1405"},
{name:"晋江市",val:"350582"},
{name:"即墨市",val:"370282"},
{name:"吉安市",val:"3608"},
{name:"济南市",val:"3701"},
{name:"荆门市",val:"4208"},
{name:"焦作市",val:"4108"},
{name:"济宁市",val:"3708"},
{name:"济源市",val:"410881"},
{name:"荆州市",val:"421000"},
{name:"九江市",val:"3604"},
{name:"景德镇市",val:"3602"},
{name:"揭阳市",val:"4452"},
{name:"金昌市",val:"6203"},
{name:"江门市",val:"4407"},
{name:"嘉峪关市",val:"6202"},
{name:"酒泉市",val:"6209"},

{name:"昆山市",val:"320583"},
{name:"开封市",val:"4102"},
{name:"昆明市",val:"5301"},
{name:"克拉玛依市",val:"6502"},
{name:"克孜勒苏柯尔克孜自治州",val:"6530"},
{name:"喀什地区",val:"6531"},

{name:"临汾市",val:"1410"},
{name:"廊坊市",val:"1310"},
{name:"辽阳市",val:"2110"},
{name:"辽源市",val:"2204"},
{name:"吕梁市",val:"1411"},
{name:"连云港市",val:"3207"},
{name:"莱芜市",val:"3712"},
{name:"漯河市",val:"4111"},
{name:"丽水市",val:"3311"},
{name:"六安市",val:"3415"},
{name:"娄底市",val:"4313"},
{name:"龙岩市",val:"3508"},
{name:"龙口市",val:"370681"},
{name:"临沂市",val:"3713"},
{name:"洛阳市",val:"4103"},
{name:"聊城市",val:"3715"},
{name:"丽江市",val:"5307"},
{name:"来宾市",val:"4513"},
{name:"泸州市",val:"5105"},
{name:"临沧市",val:"5309"},
{name:"乐东黎族自治县",val:"469033"},
{name:"乐山市",val:"5111"},
{name:"兰州市",val:"6201"},
{name:"柳州市",val:"4502"},
{name:"凉山彝族自治州",val:"5134"},
{name:"陵水黎族自治县",val:"469034"},
{name:"林芝地区",val:"5426"},
{name:"临高县",val:"469028"},
{name:"拉萨市",val:"5401"},
{name:"六盘水市",val:"5202"},
{name:"陇南市",val:"6212"},
{name:"临夏回族自治州",val:"6229"},

{name:"牡丹江市",val:"2310"},
{name:"马鞍山市",val:"3405"},
{name:"绵阳市",val:"5107"},
{name:"眉山市",val:"5114"},
{name:"茂名市",val:"4409"},
{name:"梅州市",val:"4414"},

{name:"南京市",val:"3201"},
{name:"宁波市",val:"3302"},
{name:"南通市",val:"3206"},
{name:"南昌市",val:"3601"},
{name:"南阳市",val:"4113"},
{name:"南平市",val:"3507"},
{name:"宁德市",val:"3509"},
{name:"南安市",val:"350583"},
{name:"那曲地区",val:"5424"},
{name:"南宁市",val:"4501"},
{name:"南充市",val:"5113"},
{name:"内江市",val:"5110"},
{name:"怒江傈僳族自治州",val:"5333"},

{name:"盘锦市",val:"2111"},
{name:"萍乡市",val:"3603"},
{name:"平顶山市",val:"4104"},
{name:"濮阳市",val:"4109"},
{name:"莆田市",val:"3503"},
{name:"攀枝花市",val:"5104"},
{name:"普洱市",val:"5308"},
{name:"平凉市",val:"6208"},

{name:"秦皇岛市",val:"1303"},
{name:"齐齐哈尔市",val:"2302"},
{name:"七台河市",val:"2309"},
{name:"泉州市",val:"3505"},
{name:"潜江市",val:"429005"},
{name:"青岛市",val:"3702"},
{name:"衢州市",val:"3308"},
{name:"清远市",val:"4418"},
{name:"黔南布依族苗族自治州",val:"5227"},
{name:"钦州市",val:"4507"},
{name:"曲靖市",val:"5303"},
{name:"黔西南布依族苗族自治州",val:"5223"},
{name:"庆阳市",val:"6210"},
{name:"黔东南苗族侗族自治州",val:"5226"},
{name:"琼海市",val:"469002"},
{name:"琼中黎族苗族自治县",val:"469036"},

{name:"如皋市",val:"320682"},
{name:"荣成市",val:"371082"},
{name:"日照市",val:"3711"},
{name:"日喀则市",val:"542301"},

{name:"四平市",val:"2203"},
{name:"绥化市",val:"2312"},
{name:"松原市",val:"2207"},
{name:"苏州市",val:"3205"},
{name:"上海市",val:"3101"},
{name:"宿迁市",val:"3213"},
{name:"绍兴市",val:"3306"},
{name:"朔州市",val:"1406"},
{name:"双鸭山市",val:"2305"},
{name:"沈阳市",val:"2101"},
{name:"上虞市",val:"330682"},
{name:"石家庄市",val:"1301"},
{name:"汕头市",val:"4405"},
{name:"三明市",val:"3504"},
{name:"神农架林区",val:"429021"},
{name:"上饶市",val:"3611"},
{name:"商丘市",val:"4114"},
{name:"随州市",val:"4213"},
{name:"宿州市",val:"3413"},
{name:"三门峡市",val:"4112"},
{name:"十堰市",val:"4203"},
{name:"深圳市",val:"4403"},
{name:"邵阳市",val:"4305"},
{name:"韶关市",val:"4402"},
{name:"汕尾市",val:"4415"},
{name:"遂宁市",val:"5109"},
{name:"商洛市",val:"6110"},
{name:"山南地区",val:"5422"},
{name:"三亚市",val:"4602"},
{name:"石嘴山市",val:"6402"},
{name:"石河子市",val:"659001"},

{name:"太原市",val:"1401"},
{name:"铁岭市",val:"2112"},
{name:"通化市",val:"2205"},
{name:"唐山市",val:"1302"},
{name:"太仓市",val:"320585"},
{name:"天津市",val:"1201"},
{name:"泰州市",val:"3212"},
{name:"通辽市",val:"1505"},
{name:"台州市",val:"3310"},
{name:"泰安市",val:"3709"},
{name:"天门市",val:"429006"},
{name:"铜陵市",val:"3407"},
{name:"铜仁市",val:"522201"},
{name:"屯昌县",val:"469026"},
{name:"铜川市",val:"6102"},
{name:"天水市",val:"6205"},
{name:"塔城地区",val:"6542"},
{name:"图木舒克市",val:"659003"},
{name:"吐鲁番地区",val:"6521"},
{name:"台湾",val:"7101"},

{name:"温州市",val:"3303"},
{name:"无锡市",val:"3202"},
{name:"乌兰察布市",val:"1509"},
{name:"乌海市",val:"1503"},
{name:"芜湖市",val:"3402"},
{name:"武汉市",val:"4201"},
{name:"潍坊市",val:"3707"},
{name:"威海市",val:"3710"},
{name:"万宁市",val:"469006"},
{name:"渭南市",val:"6105"},
{name:"文昌市",val:"469005"},
{name:"五指山市",val:"469001"},
{name:"武威市",val:"6206"},
{name:"梧州市",val:"4504"},
{name:"文山壮族苗族自治州",val:"5326"},
{name:"五家渠市",val:"659004"},
{name:"吴忠市",val:"6403"},
{name:"乌鲁木齐市",val:"6501"},

{name:"忻州市",val:"1409"},
{name:"锡林郭勒盟",val:"1525"},
{name:"邢台市",val:"1305"},
{name:"兴安盟",val:"1522"},
{name:"徐州市",val:"3203"},
{name:"新乡市",val:"4107"},
{name:"襄阳市",val:"4206"},
{name:"新余市",val:"3605"},
{name:"信阳市",val:"4115"},
{name:"仙桃市",val:"429004"},
{name:"许昌市",val:"4110"},
{name:"湘潭市",val:"4303"},
{name:"厦门市",val:"3502"},
{name:"宣城市",val:"3418"},
{name:"孝感市",val:"4209"},
{name:"咸宁市",val:"4212"},
{name:"湘西土家族苗族自治州",val:"4331"},
{name:"西安市",val:"6101"},
{name:"咸阳市",val:"6104"},
{name:"西双版纳傣族自治州",val:"5328"},
{name:"西宁市",val:"6301"},
{name:"香港特别行政区",val:"8101"},

{name:"宜兴市",val:"320282"},
{name:"延边朝鲜族自治州",val:"2224"},
{name:"扬州市",val:"3210"},
{name:"运城市",val:"1408"},
{name:"盐城市",val:"3209"},
{name:"阳泉市",val:"1403"},
{name:"余姚市",val:"330281"},
{name:"伊春市",val:"2307"},
{name:"营口市",val:"2108"},
{name:"烟台市",val:"3706"},
{name:"宜昌市",val:"4205"},
{name:"岳阳市",val:"4306"},
{name:"宜春市",val:"3609"},
{name:"益阳市",val:"4309"},
{name:"义乌市",val:"330782"},
{name:"鹰潭市",val:"3606"},
{name:"永州市",val:"4311"},
{name:"玉林市",val:"4509"},
{name:"雅安市",val:"5118"},
{name:"玉溪市",val:"5304"},
{name:"阳江市",val:"4417"},
{name:"榆林市",val:"6108"},
{name:"宜宾市",val:"5115"},
{name:"云浮市",val:"4453"},
{name:"延安市",val:"6106"},
{name:"伊犁哈萨克自治州",val:"6540"},
{name:"银川市",val:"6401"},
{name:"玉树藏族自治州",val:"6327"},

{name:"张家口市",val:"1307"},
{name:"诸暨市",val:"330681"},
{name:"镇江市",val:"3211"},
{name:"张家港市",val:"320582"},
{name:"朝阳市",val:"2113"},
{name:"张家界市",val:"4308"},
{name:"郑州市",val:"4101"},
{name:"枣庄市",val:"3704"},
{name:"舟山市",val:"3309"},
{name:"增城市",val:"440183"},
{name:"珠海市",val:"4404"},
{name:"周口市",val:"4116"},
{name:"淄博市",val:"3703"},
{name:"株洲市",val:"4302"},
{name:"漳州市",val:"3506"},
{name:"驻马店市",val:"4117"},
{name:"湛江市",val:"4408"},
{name:"遵义市",val:"5203"},
{name:"自贡市",val:"5103"},
{name:"昭通市",val:"5306"},
{name:"肇庆市",val:"4412"},
{name:"中山市",val:"4420"},
{name:"张掖市",val:"6207"},
{name:"资阳市",val:"5120"},
{name:"中卫市",val:"6405"},


  ]

}
