import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

@Component({
  selector: 'page-shopcar',
  templateUrl: 'shopcar.html',
})
export class ShopcarPage {

  public goumai:number= 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';


  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopcarPage');
    var num = this.goumai;
    $(".jia").click(function(){
    num++;
    var _this = this;
   this.goumai = num;
    console.log(this.goumai);
   });
   $(".jian").click(function(){
    num--;
    var _this = this;
    this.goumai = num;
    console.log(this.goumai);
   });
  }

   

// enNumber(){
//   var num = this.goumai;
//   $(".jian").click(function(){
//     num--;
//   });
//    $(".jia").click(function(){
//      alert("78")
//     num++;
//    });
//   console.log(num);
//    this.goumai = num;
//    console.log(this.goumai);
// }

}
