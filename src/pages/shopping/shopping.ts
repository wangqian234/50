import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//商品分类页
import { ShopsortPage } from '../shopsort/shopsort';
//商品详情页
import { ShoppingdetailPage } from '../shoppingdetail/shoppingdetail';
//商品详情页
import { ShopcarPage } from '../shopcar/shopcar';

//热卖界面
import { BigsalePage } from '../bigsale/bigsale';
//限时促销
import { SalePage } from '../sale/sale';
//团购界面
import { GroupbuyPage } from '../groupbuy/groupbuy';

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  public ShopsortPage = ShopsortPage;
  public ShoppingdetailPage = ShoppingdetailPage;
  public ShopcarPage = ShopcarPage;

  public BigsalePage = BigsalePage;
 public SalePage = SalePage;
 public GroupbuyPage = GroupbuyPage;

  public lunboList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider) {
    this.getLunbo();
  }

  ionViewWillEnter(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 18) + 'px';
    this.getShopIndexPage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
  }
  //进入商城首页发送请求
  getShopIndexPage(){
    // var api='http://api.gyhsh.vss/api/index/list'
    var api = 'www.baidu.com'
      this.httpService.requestData(api,(data)=>{
          console.log(data);
      })
  }
/**轮播图 */
getLunbo(){
   var that=this;  
      that.lunboList=[
        '../assets/imgs/hua.jpg',
        '../assets/imgs/jiaju.jpg',
        '../assets/imgs/hongjiu.jpg',       
      ];   
}

  clickEvent(){
    var index = $(event.target).attr("index");
    console.log(index);
    var rem = index * 7.5 + 'rem';
    console.log(rem)
    $('.jiantou_button').css("left",rem)
  }
}
