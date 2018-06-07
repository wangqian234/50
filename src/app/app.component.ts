import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController,Nav, Keyboard,IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {

rootPage: any = TabsPage;
backButtonPressed: boolean = false;  //用于判断返回键是否触发 

@ViewChild('myNav') nav: Nav;

constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public keyBoard: Keyboard,public toastCtrl: ToastController,public ionicApp: IonicApp) {
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
    return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
    }, 1);
  }

  //双击退出提示框  
      
  showExit() {  
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP  
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({  
      message: "再按一次退出应用",  
      duration: 2000,  
      position: 'bottom',
      cssClass: 'toastcss1' //修改样式（根据需要添加）
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false 
    }
  }



}
