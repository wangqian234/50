import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//三级联动
//import {MultiPickerModule} from 'ion-multi-picker';
//请求数据
import { HttpModule, JsonpModule } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';//zqditu

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

//工单评价页面
import {RepairevaluatePage} from '../pages/repairevaluate/repairevaluate'
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

//全部商品页
import { ShopmalllistPage } from '../pages/shopmalllist/shopmalllist';

//商品评价列表界面
import {ShoppingevaluatePage}from '../pages/shoppingevaluate/shoppingevaluate';

//支付

//新建测试界面
import{TestPage} from '../pages/test/test';
//新建限时抢购
import {SalePage}from '../pages/sale/sale';
//新建热销
import {BigsalePage}from '../pages/bigsale/bigsale';
   
//店铺信息
import {ShopinfoPage}from '../pages/shopinfo/shopinfo';

//商品详情页面
import {ShopgoodsinfoPage} from '../pages/shopgoodsinfo/shopgoodsinfo'
//物业缴费
import{PaymentPage} from '../pages/payment/payment'
//新建团购
import {GroupbuylistPage}from '../pages/groupbuylist/groupbuylist';
import { GroupdetailPage } from '../pages/groupdetail/groupdetail';
//商品购买页面
import { ShopbuyPage } from '../pages/shopbuy/shopbuy';
//选择收货地址
import { ChangeaddrPage } from '../pages/changeaddr/changeaddr';


//王慧敏
//添加、修改商品退款申请
import {TradegoodsReapPage}from '../pages/tradegoods-reap/tradegoods-reap';
//商品退款详情
import {TradegoodsRefundPage}from '../pages/tradegoods-refund/tradegoods-refund';
//商品订单详情
import {GoodsoderdetailPage}from '../pages/goodsoderdetail/goodsoderdetail';
//商品评价列表界面
import {GoodsoderevaluatePage}from '../pages/goodsoderevaluate/goodsoderevaluate';
//评价详情
import {TradegoodsEvaluatedetailPage}from '../pages/tradegoods-evaluatedetail/tradegoods-evaluatedetail';
//团购列表界面
import {TradegoodsGroupbuyPage}from '../pages/tradegoods-groupbuy/tradegoods-groupbuy';
//团购订单详情
import { TradegoodsGroupbuydetailPage } from '../pages/tradegoods-groupbuydetail/tradegoods-groupbuydetail';
//团购-订单界面
import { TradegoodsGroupbuyingPage } from '../pages/tradegoods-groupbuying/tradegoods-groupbuying';
//房屋基本信息
import {HouseinfoPage}from '../pages/houseinfo/houseinfo'

//新闻详情页面
import { NewinfoPage }from '../pages/newinfo/newinfo';

//新闻列表
import {NewslistPage} from '../pages/newslist/newslist';

//物业缴费页面
import { PayfeePage }from '../pages/payfee/payfee';

//费用预存页面
import { PayprefeePage }from '../pages/payprefee/payprefee';

//在线缴费页面
import { OnlinepaymentPage }from '../pages/onlinepayment/onlinepayment';

//我的房屋页面
import { HouseinfolistPage }from '../pages/houseinfolist/houseinfolist';

//个人信息修改
import { EditorinfoPage }from '../pages/editorinfo/editorinfo';

//添加房屋租售信息
import { RentsaleaddPage }from '../pages/rentsaleadd/rentsaleadd';

//房屋租售首页
import { RentsalePage }from '../pages/rentsale/rentsale';

//房屋租售详细信息
import { RentsaleinfoPage }from '../pages/rentsaleinfo/rentsaleinfo';

//敬请期待页面
import { LoadingPage }from '../pages/loading/loading';
import { AddressinfoPage }from '../pages/addressinfo/addressinfo';
//我的房屋租售信息
import { RentsalemyPage }from '../pages/rentsalemy/rentsalemy';

//房屋租售列表
import { RentsalelistPage  }from '../pages/rentsalelist/rentsalelist';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';
import { PipeMultiplePipe } from '../pipes/pipe-multiple/pipe-multiple';
import { PipeTimePipe } from '../pipes/pipe-time/pipe-time';
import { CityDataProvider } from '../providers/city-data/city-data';
import { CutPipe } from '../pipes/cut/cut';
import { CutSPipe } from '../pipes/cut-s/cut-s';
import { PipeMoneyPipe } from '../pipes/pipe-money/pipe-money';
import { PipeGroupPipe } from '../pipes/pipe-group/pipe-group';

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
    ShopmalllistPage,
    TestPage,
    SalePage,
    BigsalePage,  
    PipeMultiplePipe,
    ShopgoodsinfoPage,
    GroupbuylistPage,
    PipeTimePipe,
    PipeMoneyPipe,
    GroupdetailPage,
    ShopbuyPage,
    CutPipe,
    CutSPipe,
    PipeGroupPipe,
    PaymentPage,
    ChangeaddrPage,
    ShopinfoPage,

    //王慧敏
    TradegoodsReapPage,
    TradegoodsRefundPage,
    GoodsoderdetailPage,
    GoodsoderevaluatePage,
    TradegoodsEvaluatedetailPage,
    TradegoodsGroupbuyPage,
    TradegoodsGroupbuyingPage,
    TradegoodsGroupbuydetailPage,

    HouseinfoPage,
    NewinfoPage,
    PayfeePage,
    PayprefeePage,
    OnlinepaymentPage,
    RepairevaluatePage,
    NewslistPage,
    HouseinfolistPage,
    EditorinfoPage,
    RentsalePage,
    RentsaleinfoPage,
    LoadingPage,
    RentsaleaddPage,
    RentsalemyPage,
    RentsalelistPage,
    AddressinfoPage,
  ],
  imports: [
    BrowserModule,
    HttpModule, JsonpModule,
  //  MultiPickerModule,//三级联动
    // IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '', /*配置返回按钮*/
      iconMode: 'ios', 
      mode: 'ios',
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
    ShopmalllistPage,
    SalePage,
    BigsalePage,
    GroupbuylistPage,
    TestPage,
    ShopgoodsinfoPage,
    GroupdetailPage,
    ShopbuyPage,
    PaymentPage,
    ChangeaddrPage,
    ShopinfoPage,

    //王慧敏
    TradegoodsReapPage,
    TradegoodsRefundPage,
    GoodsoderdetailPage,   
    GoodsoderevaluatePage,
    TradegoodsEvaluatedetailPage,
    TradegoodsGroupbuyPage,
    TradegoodsGroupbuyingPage,
    TradegoodsGroupbuydetailPage,
    
    HouseinfoPage,
    NewinfoPage,
    PayfeePage,
    PayprefeePage,
    OnlinepaymentPage,
    RepairevaluatePage,
    NewslistPage,
    HouseinfolistPage,
    EditorinfoPage,
    RentsalePage,
    RentsaleinfoPage,
    LoadingPage,
    RentsaleaddPage,
    RentsalemyPage,
    RentsalelistPage,
    AddressinfoPage,
  ],
  providers: [  /*引入了自定义的服务*/
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServicesProvider,
    StorageProvider,
    ToolsProvider,
    CityDataProvider
  ]
})
export class AppModule {}




