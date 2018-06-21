
//wdh
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';
//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
//返回首页
import { TabsPage } from '../tabs/tabs';
//返回商城首页
import { ShoppingPage } from '../shopping/shopping';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-shopsort',
  templateUrl: 'shopsort.html',
})
export class ShopsortPage {

  public ShopgoodsinfoPage = ShopgoodsinfoPage;
  public ShoppingPage = ShoppingPage;
  public leftCate = [];  /*左侧分类数据*/
  public list = [];
  public listTotal = [];
  public list1 = [];
  public list2 = [];
  public fenllist = [];
  public wdh = this.config.apiUrl;
  public rightCate = [];  /*右侧分类数据*/
  public title = '';
  public pid = 0;
  public scroll = 1;
  public TabsPage = TabsPage;
  public LoginPage = LoginPage;
  public scrollconfig = {
    isEnd: false,
    isAjax: false
  }

  fanhui: boolean = false;
  public currentPlaceCode;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public app: App,
    public httpService: HttpServicesProvider, public config: ConfigProvider, public loadingCtrl: LoadingController, public storage: StorageProvider) {

    if (this.navParams.get('type')) {
      this.fanhui = true;
    }
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
    //$(".ios .tabs .tabbar").css("display","none");
  }

  ionViewDidLoad() {
    this.openScroll();
  }
  ionViewDidEnter() {
    var aa = this.pid + 1;
    $('.cate_left ul li:nth-of-type(' + aa + ')').attr("class", "activety");
    this.storage.set('tabs', '333');
    this.getLeftCateData();/*获取左侧分类*/
  }


  //左侧分类的方法

  getLeftCateData() {
    var leftname;
    var api = this.wdh + '/api/goods_sort/list';

    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errmsg == 'OK') {

        this.list = data.list;
        leftname = data.list[0].name;
        this.title = data.list[0].name;
        this.list1 = data.list[0];
        this.list2 = data.list.slice(1);
        //右侧内容的初始显示
        this.getRightCateData(21, 0, this.title);
      } else {
        alert(data.errmsg);
      }
    })
  }


  getRightCateData(pid, i, name) {
    this.title = name;
    this.pid = i;
    this.order = i;
    this.listTotal = [];
    $("#cate_left li").removeAttr("class");
    var span = "#cate_left li:nth-of-type(" + ++i + ")"
    $(span).attr("class", "activety");
    var api = this.wdh + '/api/goods/list?goods_Type=' + pid + '&curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errmsg == 'OK') {
        var obj = {
          fenllist: '',
          name: '',
          pid: pid
        };
        obj.fenllist = data.list;
        obj.name = name;
        this.listTotal.push(obj);
        this.fenllist = data.list;
      } else {
        alert(data.errmsg);
      }
    })
  }

  order = 0;
  doLoadMore(infiniteScroll) {
    this.order++;
    if (this.order > this.list.length - 1) {
      infiniteScroll.enable(false);
      return;
    }
    this.getRightCateData2(this.list[this.order].id, this.order, this.list[this.order].name, infiniteScroll)
  }

  doRefresh(infiniteScroll) {
    this.order--;
    if(this.order < 0){
      infiniteScroll.enable(false);
      return;
    }
    this.getRightCateData2(this.list[this.order].id, this.order, this.list[this.order].name, infiniteScroll)
  }

  getRightCateData2(pid, i, name, infiniteScroll) {
    this.title = name;
    this.pid = i;
    var api = this.wdh + '/api/goods/list?goods_Type=' + pid + '&curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (data.errmsg == 'OK') {
        var obj = {
          fenllist: '',
          name: '',
          pid: pid
        };
        obj.fenllist = data.list;
        obj.name = name;
        //this.listTotal = [];//新增
        //$(".scroll").scrollTop("0.98rem");//新增
        this.listTotal.push(obj);
        $("#cate_left li").removeAttr("class");
        var span = "#cate_left li:nth-of-type(" + ++i + ")"
        $(span).attr("class", "activety");
      } else {
        alert(data.errmsg);
      }
    })
  }

  gotoGood(id) {
    if (this.storage.get('token')) {
      this.navCtrl.push(ShopgoodsinfoPage, {
        id: id
      });
    } else {
      this.navCtrl.push(LoginPage);
      return;
    }
  }

  goback = false;
  backTo() {
    this.goback = true;
    this.navCtrl.pop();
  }

  ionViewDidLeave() {
    if (this.goback) {
      $(".mytabs").css("display", "none");
      $(".mytabs2").css("display", "block");
    }
  }

  backToHome() {
    this.app.getRootNav().push(TabsPage);
  }

  scrollTopCur = 0;
  openScroll() {
    var that = this;
    $(".scroll-content").scroll(function () {
      var windowH = $(window).height()
      var scrollTop = $(this).scrollTop();
      if(scrollTop > that.scrollTopCur){
        var scrollTop = $(this).scrollTop() + windowH;
      } else {
        var scrollTop = $(this).scrollTop();
      }
      that.scrollTopCur = $(this).scrollTop();
      //var scrollTop = $(this).scrollTop() + windowH;
      var heightList = [];
      var height = 0;
      for (var i = 0; i < that.list.length; i++){
        if($("#" + that.list[i].id).height()){
          heightList.push($("#" + that.list[i].id).height())
        } else {
          heightList.push(0);
        }
      }
      if(heightList[0] > scrollTop) {
        console.log(that.list[0].name);
        ($("#cate_left li:nth-of-type(1)")).attr("class", "activety").siblings().removeClass('activety');;
        return;
      }
      for(var j=0;j<heightList.length-1;j++){
        height = height + heightList[j];
        if(height < scrollTop && scrollTop + windowH < height+heightList[j+1]){
          var aa = j + 2;
          ($("#cate_left li:nth-of-type(" + aa  +")")).attr("class", "activety").siblings().removeClass('activety');
          break;
        }
      }
    })
  }

}




