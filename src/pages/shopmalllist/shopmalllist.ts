import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
//商品详情页
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
import { LoadingController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
//返回首页
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-shopmalllist',
  templateUrl: 'shopmalllist.html',
})
export class ShopmalllistPage {
  public currentPlaceCode;
  public page=1;
  public list = [];
  public tuijList=[];
  public aa =this.config.apiUrl;
  //跳转页面
  public  ShopgoodsinfoPage = ShopgoodsinfoPage;
  public TabsPage = TabsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,
  public http: Http,public config: ConfigProvider,public loadingCtrl: LoadingController,public storage:StorageProvider,) {
    
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    //关键字搜索商品
    this.reserchGoods('');
    //推荐商品
    this.tuijGoods();
  }
  ionViewDidEnter(){
    this.currentPlaceCode = this.storage.get('currentPlaceCode');
    this.storage.set('tabs','false');
    this.list = [];
    this.page = 1;
    this.reserchGoods("")
  }

  
  // 转换单位
  getRem(){
     var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
  //搜索商品接口
  reserchGoods(infiniteScroll){
      var api = this.aa+'/api/goods/list?pageSize=10&pageIndex='+ this.page+'&keyWord='+ this.navParams.get('keywords')+'&curCityCode='+this.currentPlaceCode+'&shop_Id=0';
      this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 && data.errmsg === 'OK'){
         if(data.list.length<10){
           $('.nomore').css('display','block');
          }
        this.list = this.list.concat(data.list) ;
        if(infiniteScroll){
          infiniteScroll.complete();
          this.page++;
          if(data.list.length<10){
             infiniteScroll.enable(false);
           $('.nomore').css('display','block');
          }
       }
     } else {
        alert(data.errmsg);
     }
     })
  }
  //推荐商品搜索
    tuijGoods(){
      var api = this.aa +'/api/goods/list?curCityCode='+this.currentPlaceCode;
      this.http.get(api).map(res => res.json()).subscribe(data =>{
        if(data.errcode === 0 && data.errmsg === 'OK'){
          this.tuijList= data.list;
          console.log(this.tuijList)
        }else{
          alert(data.errmsg);
        }
      })
    }
  //跳转到商品详情页面
  goGoodsInfo(id){
     this.navCtrl.push(ShopgoodsinfoPage,{id:id});
  }

  ionViewCanEnter():boolean{
        return true;
  }
  ionViewDidLoad(){
   this.onload2();
  }
  onload2 = function(){
    var Sos=document.getElementById('sos_tanc');
		var ShouYe=document.getElementById('yemnr');
		var SosYe=document.getElementById('shous_yem');
		var SosFanHui=document.getElementById('sous_fanh_sy');
		Sos.onclick=function()
		{
			ShouYe.style.display=('none');
			SosYe.style.display=('block');
		}
		SosFanHui.onclick=function()
		{
			ShouYe.style.display=('block');
			SosYe.style.display=('none');
		}
  }

  backTo(){
    this.navCtrl.pop();
  }
      //加载更多
  doLoadMore(infiniteScroll){
    this.reserchGoods(infiniteScroll);
  }

    backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }

}
