import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule, JsonpModule } from '@angular/http';


import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { UserPage } from '../pages/user/user';
//登录
import { LoginPage } from '../pages/login/login';
//注册
import { RegisterpasswordPage } from '../pages/registerpassword/registerpassword';

//商品列表
import { ProductlistPage } from '../pages/productlist/productlist';

//商品详情
import { PcontentPage } from '../pages/pcontent/pcontent';

//账户管理

import { PersonalPage } from '../pages/personal/personal';

//收货地址列表
import { AddressPage } from '../pages/address/address';

//增加、修改收货地址
import { AddaddressPage } from '../pages/addaddress/addaddress';

//增加报修
import { RepairaddPage } from '../pages/repairadd/repairadd';

//我的工单
import { RepairlistPage } from '../pages/repairlist/repairlist';

//工单详情页
import { RepairdetailsPage } from '../pages/repairdetails/repairdetails';

//商城首页
import { ShoppingPage } from '../pages/shopping/shopping';

//商品分类页
import { ShopsortPage } from '../pages/shopsort/shopsort';

//绑定房屋
import { BindroomPage } from '../pages/bindroom/bindroom';

//商品购物列表
import { ShoppinglistPage } from '../pages/shoppinglist/shoppinglist';

//重置密码页
import { RebuildpassPage } from '../pages/rebuildpass/rebuildpass';

//商品详情页
import { ShoppingdetailPage } from '../pages/shoppingdetail/shoppingdetail';

//购物车
import { ShopcarPage } from '../pages/shopcar/shopcar';

//全部商品页
import { ShopmalllistPage } from '../pages/shopmalllist/shopmalllist';


import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';

import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';

@NgModule({
  declarations: [
    MyApp,
    CartPage,
    UserPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterpasswordPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    AddressPage,
    AddaddressPage,
    RepairaddPage,
    RepairlistPage,
    RepairdetailsPage,
    ShoppingPage,
    ShopsortPage,
    BindroomPage,
    ShoppinglistPage,
    RebuildpassPage,
    ShoppingdetailPage,
    ShopcarPage,
    ShopmalllistPage,
  ],
  imports: [
    BrowserModule,
    HttpModule, JsonpModule,
    // IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '' /*配置返回按钮*/
    })        
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    UserPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterpasswordPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    AddressPage,
    AddaddressPage,
    RepairaddPage,
    RepairlistPage,
    RepairdetailsPage,
    ShoppingPage,
    ShopsortPage,
    BindroomPage,
    ShoppinglistPage,
    RebuildpassPage,
    ShoppingdetailPage,
    ShopcarPage,
    ShopmalllistPage,
  ],
  providers: [  /*引入了自定义的服务*/
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServicesProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule {}




