import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
//引入账户设置页面
import { PersonalPage } from '../personal/personal';
//引入收货地址界面
import { AddressPage } from '../address/address';
//引入工单界面
import { RepairlistPage } from '../repairlist/repairlist';
//引入购物清单界面
import { ShoppinglistPage } from '../shoppinglist/shoppinglist';
//storag服务
import { StorageProvider } from '../../providers/storage/storage';
//我的房屋
import { HouseinfolistPage } from '../houseinfolist/houseinfolist';
//修改个人信息
import { EditorinfoPage } from '../editorinfo/editorinfo';
//重置登录密码
import { RebuildpassPage } from '../rebuildpass/rebuildpass';

import { TabsPage } from '../tabs/tabs';
//王慧敏
//团购订单
import { TradegoodsGroupbuyPage } from '../tradegoods-groupbuy/tradegoods-groupbuy';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  //页面跳转
  public userLoginName = ''
  public enSureLogin:boolean = false;


  public LoginPage=LoginPage;
  public PersonalPage=PersonalPage;
  public AddressPage = AddressPage;
  public RepairlistPage = RepairlistPage;
  public ShoppinglistPage = ShoppinglistPage;
  public EditorinfoPage = EditorinfoPage;
  public RebuildpassPage = RebuildpassPage;
  //王慧敏
  public TradegoodsGroupbuyPage=TradegoodsGroupbuyPage;
  public HouseinfolistPage = HouseinfolistPage

   //自定义的变量
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
      } else {
        this.navCtrl.push(LoginPage);
      }
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
      }

      outLogin(){//退出登录
        var r= confirm("确认退出登录吗？")
        if (r==true)
        {
          this.storage.remove("token");
          this.navCtrl.popToRoot(); /*回到根页面*/
          this.navCtrl.push(TabsPage);
        } else{
          return;
        }
      }

      gotoAddressPage(){
        if(this.storage.get('token') == undefined){
          this.navCtrl.push(LoginPage);
        } else {
          this.navCtrl.push(AddressPage);
        }
    }

    // ionViewDidEnter(){
    //    console.log("3.0 ionViewDidEnter 当进入页面时触发");
    // }
    // ionViewWillLeave(){
    //     console.log("4.0 ionViewWillLeave 当将要从页面离开时触发");
    // }
    // ionViewDidLeave(){
    //     console.log("5.0 ionViewDidLeave 离开页面时触发");
    // }
    // ionViewWillUnload(){
    //    console.log("6.0 ionViewWillUnload 当页面将要销毁同时页面上元素移除   时触发");
    // }
    // ionViewCanEnter(){
    //    console.log("ionViewCanEnter");
    // }
    // ionViewCanLeave(){
    //      console.log("ionViewCanLeave");
    // }

}
