import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

//费用预存页面
import { PayprefeePage } from '../payprefee/payprefee';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';
//在线缴费
import { OnlinepaymentPage } from '../onlinepayment/onlinepayment';

@Component({
  selector: 'page-payfee',
  templateUrl: 'payfee.html',
})
export class PayfeePage {

  
  public PayprefeePage = PayprefeePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad(){
    this.getRem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayfeePage');
  }

  appearPayFee(){
    if($('#payFee').css('display') == 'block'){
      $('#payFee').css('display','none');
      $('#payFeeimg').css('transform', 'rotate(180deg)')
    } else {
      $('#payFee').css('display','block');
      $('#payFeeimg').css('transform', 'rotate(270deg)')
    }
  }

  appearPreDetail(){
    if($('#preDetail').css('display') == 'block'){
      $('#preDetail').css('display','none');
      $('#preDetailimg').css('transform', 'rotate(180deg)')
    } else {
      $('#preDetail').css('display','block');
      $('#preDetailimg').css('transform', 'rotate(270deg)')
    }
  }

  appearFeeList(){
    if($('#feeList').css('display') == 'block'){
      $('#feeList').css('display','none');
      $('#feeListimg').css('transform', 'rotate(180deg)')
    } else {
      $('#feeList').css('display','block');
      $('#feeListimg').css('transform', 'rotate(270deg)')
    }
  }

  backTo(){
    this.navCtrl.pop();
  }

  goOnlinePayfee(){
     this.navCtrl.push(OnlinepaymentPage,{
      //item: this.room;
    })
  }
  
  goPrefee(){
    this.navCtrl.push(PayprefeePage,{
      //item: this.room;
    })
  }

    changeRoom(roomid){
    if(roomid === "add"){
      this.navCtrl.push(BindroomPage);
    }
  }


  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }

}
