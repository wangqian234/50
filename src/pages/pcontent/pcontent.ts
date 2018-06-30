import { Component,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { StorageProvider } from '../../providers/storage/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import $ from "jquery";

/**
 * Generated class for the PcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pcontent',
  templateUrl: 'pcontent.html',
})
export class PcontentPage {



  @ViewChild('myattr') myattr:ElementRef;


  public tabs='plist';  /*商品列表选中*/

  public item=[];  /*商品列表*/
  public num=1;  /*商品数量*/

  public carts_num=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,
  public httpService:HttpServicesProvider,public storage:StorageProvider, public toastCtrl:ToastController,
  private iab: InAppBrowser) {
    

  }

  ionViewDidEnter(){
}



}
