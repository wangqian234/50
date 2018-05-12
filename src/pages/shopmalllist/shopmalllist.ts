import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
//商品详情页
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';
@Component({
  selector: 'page-shopmalllist',
  templateUrl: 'shopmalllist.html',
})
export class ShopmalllistPage {

  public list = [];
  public tuijList=[];
  public aa =this.config.apiUrl;
  //跳转页面
  public  ShopgoodsinfoPage = ShopgoodsinfoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public config: ConfigProvider) {
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    this.getRem();
    //关键字搜索商品
    this.reserchGoods();
    //推荐商品
    this.tuijGoods();
  }
  
  // 转换单位
  getRem(){
     var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
  //搜索商品接口
  reserchGoods(){
    //this.keywords = this.navParams.get("keyWords");
    var api = this.aa+'/api/goods/list?pageSize=10&pageIndex=1&keyWord='+ this.navParams.get("keyWords")+'&curCityCode=4403&shop_Id=1';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errcode === 0 && data.errmsg === 'OK'){
         this.list = data.list;
     } else {
        alert(data.errmsg);
     }
     })
  }
  //推荐商品搜索
    tuijGoods(){
      var api = this.aa +'/api/goods/list?curCityCode=4403';
      alert('safasfas')
      this.http.get(api).map(res => res.json()).subscribe(data =>{
        if(data.errcode === 0 && data.errmsg === 'OK'){
          this.tuijList= data.list;
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

}
