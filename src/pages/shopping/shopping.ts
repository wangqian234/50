import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
//商品分类页
import { ShopsortPage } from '../shopsort/shopsort';
ShopsortPage

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  public ShopsortPage = ShopsortPage;
  public lunboList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getLunbo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
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
