import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController,Nav, Keyboard,IonicApp,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';
import $ from 'jquery';

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

@ViewChild('myNav') nav: Nav;

constructor(private app: App,public platform: Platform, statusBar: StatusBar, public storage: StorageProvider,
 splashScreen: SplashScreen, public keyBoard: Keyboard,public toastCtrl: ToastController,public ionicApp: IonicApp,private network: Network) {

  this.app.viewDidLoad.subscribe(() => {
      this.getNetWork();
	});

    platform.ready().then(() => { 
    // Okay, so the platform is ready and our plugins are available.   
    // Here you can do any higher level native things you might need.  
    statusBar.styleDefault();  
    splashScreen.hide(); 
    this.registerBackButtonAction();//注册返回按键事件  
    });}
    //返回按键处理  
    registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
    //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上   
    // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()  
    let activePortal = this.ionicApp._modalPortal.getActive();
    if (activePortal) { 
      activePortal.dismiss().catch(() => {});
      activePortal.onDidDismiss(() => {});
      return;
    }
    let activeVC = this.nav.getActive(); 
    let tabs = activeVC.instance.tabs;
    let activeNav = tabs.getSelected();
    //return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
    if (this.storage.get('tabs') == "true") {
      //如果是根目则按照需求1处理
      this.showExit();
    } else {
      //非根目录返回上一级页面
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

     getNetWork(){
      let disconnectSubscription = this.network.onDisconnect();
      let connectSubscription = this.network.onConnect();
      if(this.network.type == 'none'){
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

}
