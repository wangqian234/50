import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-payprefee',
  templateUrl: 'payprefee.html',
})
export class PayprefeePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayprefeePage');
  }

  backTo(){
    this.navCtrl.pop();
  }

  changeRoom(roomid){
    if(roomid === "add"){
      $('#selectOther').css('display','block');
    } else {
      $('#selectOther').css('display','none');
    }
  }
  

}
