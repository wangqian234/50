
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
  public listTotal=[];
  public list1=[];
  public list2=[];
  public fenllist=[];
  public wdh=this.config.apiUrl;
  public rightCate=[];  /*右侧分类数据*/
  public title = '';
  public pid = 0;
  public scroll = 1;
  public TabsPage = TabsPage;
  public scrollconfig = {
    isEnd : false,
    isAjax : false
  }
  fanhui:boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public app: App,
  public httpService:HttpServicesProvider,public config:ConfigProvider,public loadingCtrl: LoadingController,public storage:StorageProvider) {
    this.storage.set('tabs','false');
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
this.openScroll()
  }
  ionViewDidEnter() {
        this.getLeftCateData();/*获取左侧分类*/
  }


//左侧分类的方法

  getLeftCateData(){
    var leftname;
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var api=this.wdh+'/api/goods_sort/list';
    
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if(data.errmsg == 'OK'){
        this.list = data.list;
        leftname = data.list[0].name;
        this.title=data.list[0].name;
        this.list1 = data.list[0];
        this.list2 = data.list.slice(1);
        //右侧内容的初始显示
        this.getRightCateData(21,0,this.title);
      } else {
        alert(data.errmsg);
      }
    })
  }


  getRightCateData(pid,i,name){
    console.log(name)
    this.title=name;
    this.pid = i;
    this.scroll = i+1;
    this.listTotal=[];
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
         var obj = {
           fenllist:'',
           name:''
         };
         obj.fenllist = data.list;
         obj.name = name;
         this.listTotal.push(obj);
         console.log(this.listTotal[0])
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

  //滚动加载时用的函数
  getRightCateData2(){
    this.scrollconfig.isEnd = false; /* 结束标志 */
		this.scrollconfig.isAjax = false; /* 防止滚动过快，服务端没来得及响应造成多次请求 */
    var i = this.scroll;
    var pid = this.list[i].id;
    $("#cate_left li").removeAttr("class");
    var span = "#cate_left li:nth-of-type(" + i +")"
    $(span).attr("class","activety");
    var api=this.wdh+'/api/goods/list?goods_Type='+pid+'&curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errmsg == 'OK'){
         var obj = {
           fenllist:'',
           name:''
         };
         obj.fenllist = data.list;
         obj.name = this.list[i].name

        this.listTotal.push(obj)
        this.scrollconfig.isEnd = true;
        this.scrollconfig.isAjax = true;
    } else {
      alert(data.errmsg);
    }
    })
  }

              openScroll() {
								/* 通过自动监听滚动事件加载更多,可选支持 */
                var that = this;
								$(".cate_right").scroll(function() {
                    var t = 0;
                    var p = 0;
										/* 滚动加载时如果已经没有更多的数据了、正在发生请求时，不能继续进行 */
										if (that.scrollconfig.isEnd == false || that.scrollconfig.isAjax == false) {
											return;
										}
										/* 判断向上滚动或向下滚动 */
										p = that.getScrollTop()
										if (t <= p) {
											t = p;
											/* 当滚动到底部时， 加载新内容 */
											if (that.getScrollHeight() - (t + that.getClientHeight()) < 50) {
                        alert("进入滚动")
												that.getRightCateData2();
											}
										}
									});
							}

							// 获取滚动条当前的位置
							getScrollTop() {
								var scroll = 0;
								// 判断哪个浏览器
								if (document.documentElement
										&& document.documentElement.scrollTop) {
									scroll = $(".yscroll").scrollTop();
								} else if (document.body) {
									scroll = $(".yscroll").scrollTop();
								}
								return scroll;
							}
							;
							// 获取当前可视范围的高度
							getClientHeight() {
								var clientHeight = 0;
								// 判断哪个浏览器
								if (document.body.clientHeight
										&& document.documentElement.clientHeight) {
									clientHeight = Math
											.min(
													document.body.clientHeight,
													document.documentElement.clientHeight);
								} else {
									clientHeight = Math
											.max(
													document.body.clientHeight,
													document.documentElement.clientHeight);
								}
								return clientHeight;
							}
							;

							// 获取文档完整的高度
							getScrollHeight() {
								var aaheight = $(".yscroll")[0].scrollHeight;
								return Math.max($(".yscroll")[0].scrollHeight,
										document.documentElement.scrollHeight);
							}

}
  



