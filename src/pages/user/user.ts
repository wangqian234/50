import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
//更多精彩敬请期待
import { LoadingPage } from '../loading/loading';

import { TabsPage } from '../tabs/tabs';
//费用明细
import { PayfeePage } from '../payfee/payfee';
//王慧敏
//团购订单
import { TradegoodsGroupbuyPage } from '../tradegoods-groupbuy/tradegoods-groupbuy';
//团购-界面
import { TradegoodsGroupbuyingPage } from '../tradegoods-groupbuying/tradegoods-groupbuying';
//房屋租赁发布信息
import { RentsalemyPage } from '../rentsalemy/rentsalemy';
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
  public LoadingPage = LoadingPage;
  public PayfeePage = PayfeePage;
  //王慧敏
  public TradegoodsGroupbuyPage=TradegoodsGroupbuyPage;
  public TradegoodsGroupbuyingPage=TradegoodsGroupbuyingPage;

  public RentsalemyPage = RentsalemyPage;
  public HouseinfolistPage = HouseinfolistPage

   //自定义的变量
    public userinfo='';
    constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,private alertCtrl: AlertController) { 

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
        let alert1 = this.alertCtrl.create({
          title: '',
          message: '确认登录吗?',
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                return;
              }
            },
            {
              text: '确认',
              handler: () => {
                this.storage.remove("token");
                this.navCtrl.popToRoot(); /*回到根页面*/
                this.navCtrl.push(TabsPage);
              }
            }
          ]
        });
        alert1.present();
      }

      gotoAddressPage(){
        if(this.storage.get('token') == undefined){
          this.navCtrl.push(LoginPage);
        } else {
          this.navCtrl.push(AddressPage);
        }
    }

    ionViewDidEnter(){
        this.storage.set('tabs','true');
    }

}
