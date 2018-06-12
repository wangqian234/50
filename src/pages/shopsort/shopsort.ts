
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

@Component({
  selector: 'page-shopsort',
  templateUrl: 'shopsort.html',
})
export class ShopsortPage {

  public ShopgoodsinfoPage=ShopgoodsinfoPage;
  public ShoppingPage = ShoppingPage;
  public leftCate=[];  /*左侧分类数据*/
  public list=[];
  public fenllist=[];
  public wdh=this.config.apiUrl;
  public rightCate=[];  /*右侧分类数据*/
  public title = '';
  pid = 0;
  public TabsPage = TabsPage;
  fanhui:boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public app: App,
  public httpService:HttpServicesProvider,public config:ConfigProvider,public loadingCtrl: LoadingController,public storage:StorageProvider) {
    
    if(this.navParams.get('type')){
      this.fanhui = true;
    }
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
    $(".ios .tabs .tabbar").css("display","none");
  }
  ionViewDidLoad(){
        this.getLeftCateData();/*获取左侧分类*/
  }
  ionViewDidEnter() {
    this.storage.set('tabs','false');
    var aa = this.pid+1;
    $('.cate_left ul li:nth-of-type(' + aa +')').attr("class","activety");
  }


//左侧分类的方法

  getLeftCateData(){
    $(".spinnerbox").fadeIn(200);
        $(".spinner").fadeIn(200);
    var api=this.wdh+'/api/goods_sort/list';
    
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
      if(data.errmsg == 'OK'){
        this.list = data.list;
        this.title=data.list[0].name;
      } else {
        alert(data.errmsg);
      }
    })
    //  右侧内容的初始显示
    this.getRightCateData(21,0,this.title);
    $('.cate_left ul li:nth-of-type(1)').attr("class","activety");
  }


  getRightCateData(pid,i,name){
    console.log(name)
    this.title=name;
    this.pid = i;
    //  let loading = this.loadingCtrl.create({
	  //   showBackdrop: true,
    // });
    // loading.present();
    $(".spinnerbox").fadeIn(200);
        $(".spinner").fadeIn(200);
     $("#cate_left li").removeAttr("class");
    var span = "#cate_left li:nth-of-type(" + ++i +")"
    $(span).attr("class","activety");
    var api=this.wdh+'/api/goods/list?goods_Type='+pid+'&curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      //  loading.dismiss();
      $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
       if(data.errmsg == 'OK'){
         this.fenllist = data.list;
     } else {
        alert(data.errmsg);
     }
     })
  }


  backTo(){
    this.app.getRootNav().push(TabsPage,{
      tabs:true
    });
  }

  backToHome(){
     this.app.getRootNav().push(TabsPage);    
  }

}
  



