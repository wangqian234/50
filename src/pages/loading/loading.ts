import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider) {
  }

  backTo(){
    this.navCtrl.pop();
  }

    ionViewDidEnter(){
      this.storage.set('tabs','false');
  }


}
