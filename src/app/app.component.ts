import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, Keyboard, IonicApp, App , NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';
import $ from 'jquery';
//极光推送
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';
//引入商品详情界面
import { ShopgoodsinfoPage } from '../pages/shopgoodsinfo/shopgoodsinfo';


import { HomePage } from '../pages/home/home';
import { RentsalePage } from '../pages/rentsale/rentsale';
import { ShoppingPage } from '../pages/shopping/shopping';
import { ShopsortPage } from '../pages/shopsort/shopsort';
import { ShoppinglistPage } from '../pages/shoppinglist/shoppinglist';
import { UserPage } from '../pages/user/user';
import { CartPage } from '../pages/cart/cart';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage: any = TabsPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  devicePlatform: string;
  registrationId: string;
  sequence: number = 0;
  @ViewChild('myNav') nav: Nav;

  tagResultHandler = function(result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
  };

  aliasResultHandler = function(result) {
    var sequence: number = result.sequence;
    var alias: string = result.alias;
  };

  errorHandler = function(err) {
    var sequence: number = err.sequence;
    var code = err.code;
  };

  constructor(private app: App, public platform: Platform, statusBar: StatusBar, public storage: StorageProvider, public jpush: JPush,
   public device : Device,public splashScreen: SplashScreen, public keyBoard: Keyboard,
   public toastCtrl: ToastController, public ionicApp: IonicApp, private network: Network, ) {
    this.app.viewDidLoad.subscribe(() => {
      this.getNetWork();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.   
      // Here you can do any higher level native things you might need.  
      statusBar.styleDefault();
      splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
    });
    
    //极光推送

    this.getAllTags();
    this.devicePlatform = device.platform;

    document.addEventListener('jpush.receiveNotification', (event: any) => {
      var content;
      if (this.devicePlatform == 'Android') {
        content = event.alert;
      } else {
        content = event.aps.alert;
      }
    }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      var content;
      if (this.devicePlatform == 'Android') {
        content = event.alert;
      } else {  // iOS
        if (event.aps == undefined) { // 本地通知
          content = event.content;
        } else {  // APNS
          content = event.aps.alert;
        }
      }
      alert("我进入了components")
      alert(event.extras)
      if(event.extras.type != undefined && event.extras.type == "shop"){
        if(event.extras.id != undefined){
          var id = event.extras.id;
          this.app.getRootNav().push(ShopgoodsinfoPage, {
            id: id
          });
        }
      }
    }, false);

    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
      var content;
      if (this.devicePlatform == 'Android') {
      } else {
        content = event.content;
      }
    }, false);

  }
  //返回按键处理  
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上   
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()  
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      //let activeNav = tabs.getSelected();
      //return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
      if (this.storage.get('tabs') == "true") {
        //如果是根目则按照需求1处理
        this.showExit();
      } else if (this.storage.get('tabs') == "false") {
        //非根目录返回上一级页面
        this.app.goBack();
      } else if (this.storage.get('tabs') == "333") {
        this.app.getRootNav().push(TabsPage, {
          tabs: true
        });
      } else if (this.storage.get('tabs') == "444") {
        this.app.getRootNav().push(TabsPage);
      } else {
        this.app.goBack();
      }
    }, 1);
  }

  //双击退出提示框  

  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP  
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: "再按一次退出汇生活APP",
        duration: 2000,
        position: 'middle',
        cssClass: 'toastcss1' //修改样式（根据需要添加）
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false 
    }
  }

  getNetWork() {
    let disconnectSubscription = this.network.onDisconnect();
    let connectSubscription = this.network.onConnect();
    if (this.network.type == 'none') {
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      this.presentToast();
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: '当前无网络，请检查网络连接',
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

//极光推送
    getRegistrationID() {
    this.jpush.getRegistrationID()
      .then(rId => {
        this.registrationId = rId;
      });
  }

  setTags() {
    this.jpush.setTags({ sequence: this.sequence++, tags: ['Tag1', 'Tag2']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  addTags() {
    this.jpush.addTags({ sequence: this.sequence++, tags: ['Tag3', 'Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  checkTagBindState() {
    this.jpush.checkTagBindState({ sequence: this.sequence++, tag: 'Tag1' })
      .then(result => {
        var sequence = result.sequence;
        var tag = result.tag;
        var isBind = result.isBind;
        alert('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
      }).catch(this.errorHandler);
  }

  deleteTags() {
    this.jpush.deleteTags({ sequence: this.sequence++, tags: ['Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  getAllTags() {
    this.jpush.getAllTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  cleanTags() {
    this.jpush.cleanTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  setAlias() {
    this.jpush.setAlias({ sequence: this.sequence++, alias: 'TestAlias' })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  getAlias() {
    this.jpush.getAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  deleteAlias() {
    this.jpush.deleteAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  addLocalNotification() { //添加本地消息
    if (this.devicePlatform == 'Android') {
      this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    } else {
      this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    }
  }

}

