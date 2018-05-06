import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';

//引入账户设置页面
import { PersonalPage } from '../personal/personal';
//引入收货地址界面
import { AddressPage } from '../address/address';
//引入工单界面
import { RepairlistPage } from '../repairlist/repairlist';
//引入购物清单界面
import { ShoppinglistPage } from '../shoppinglist/shoppinglist';
import { TabsPage } from '../tabs/tabs';





@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public enSureLogin:boolean = false;

  public LoginPage=LoginPage;

  public PersonalPage=PersonalPage;

  public AddressPage = AddressPage;

  public  RepairlistPage = RepairlistPage;

  public ShoppinglistPage = ShoppinglistPage;

    public userinfo='';

    constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider) {
      console.log('constructor');
    }
    ionViewDidLoad(){
         console.log("1.0 ionViewDidLoad 当页面加载的时候触发，仅在页面创建的  时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发");
    }
    ionViewWillEnter(){
      console.log(this.storage.get('token'))
      //确认登录状态
      if(this.storage.get('token')){
        this.enSureLogin = true;
      }
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
      }

      outLogin(){
        this.storage.remove("token");
        this.navCtrl.popToRoot(); /*回到根页面*/
        this.navCtrl.push(TabsPage);
      }
}
