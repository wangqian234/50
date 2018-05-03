import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RepairlistPage } from '../repairlist/repairlist';

@Component({
  selector: 'page-repairadd',
  templateUrl: 'repairadd.html',
})
export class RepairaddPage {

  public repairLimit:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  httptest(){
  //     let json={
  //   uid:this.repairLimit.sort1,
  //   salt:this.repairLimit.sort1,
  // }
    console.log(this.repairLimit.sort1);
    console.log(this.repairLimit.sort2);
    console.log(this.repairLimit.add);
    this.navCtrl.push(RepairlistPage);

  }

}
