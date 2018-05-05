import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import {Http,Jsonp}from '@angular/http';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ) {
    this.getLunbo();
  }
  //请求数据连接接口
  geto(){
    //alert("ssss");

    var url ="http://test/api/gyhsh/cn/crm/srq/list/list";
    this.http.get(url).subscribe(function(data){
      console.log(data);
      

    },function(erro){
      console.log(erro);
      alert(erro);
    })
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
