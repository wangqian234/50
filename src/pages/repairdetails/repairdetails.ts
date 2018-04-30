import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

@Component({
  selector: 'page-repairdetails',
  templateUrl: 'repairdetails.html',
})
export class RepairdetailsPage {

  public repairDetial = {};

  public btn:any;  
  public div :any;  
  public close :any;  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    if(this.navParams.get('item')){
      this.repairDetial=this.navParams.get('item');
     //这里需要对工单状态的判断来修改CSS if(repairDetial.报修状态 == )
    }
    console.log($(".arrow-past .arrow-next"));
    $(".arrow-past .arrow-next").css({'border-top': '15px solid #00a2ca', 'border-bottom': '15px solid #00a2ca'});
    $(".arrow-current .arrow-pre").css('border-left', '15px solid #00a2ca');
    $(".step-container li.step-current").css('background-color', '#00a2ca');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairdetailsPage');
      this.btn = document.getElementById('open_btn');  
      this.div = document.getElementById('background');
      this.close = document.getElementById('close-button'); 
  }

 showPopup(){
     this.div.style.display = "block";  
 }
  

  

 

}
