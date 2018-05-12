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

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public userLoginName = ''

  public enSureLogin:boolean = false;

  public LoginPage=LoginPage;

  public PersonalPage=PersonalPage;

  public AddressPage = AddressPage;

  public  RepairlistPage = RepairlistPage;

  public ShoppinglistPage = ShoppinglistPage;

    public userinfo='';

    constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider) {
      
    }
    ionViewDidLoad(){
         
    }
    ionViewWillEnter(){
      //确认登录状态
      if(this.storage.get('token')){
        this.enSureLogin = true;
        this.userLoginName = this.storage.get('username1')
      }
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
      }

      outLogin(){//退出登录
        this.storage.remove("token");
        this.navCtrl.popToRoot(); /*回到根页面*/
        this.navCtrl.push(TabsPage);
      }

      gotoAddressPage(){
        if(this.storage.get('token') == undefined){
          this.navCtrl.push(LoginPage);
        } else {
          this.navCtrl.push(AddressPage);
        }
      }
}
