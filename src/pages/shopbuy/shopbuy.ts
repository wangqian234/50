//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//请求数据
import { Http, Jsonp, Headers, RequestOptions } from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//收货地址页面
import { ChangeaddrPage } from '../changeaddr/changeaddr';
@IonicPage()
@Component({
  selector: 'page-shopbuy',
  templateUrl: 'shopbuy.html',
})
export class ShopbuyPage {

  public ChangeaddrPage = ChangeaddrPage;

  public wid;//商品ID
  public sizeId;//规格id
  public gnum=1;//商品数量
  public fee=0;
  public sid='';
  public list = [];
  public dtlist = [];
  public goodSlist = [];
  public addlist = [];

  public shoplist = [];
  public carriagelist = [];
  public creditslist = [];
  public totalPrice = 0;
  public wtotalPrice = 0;  /*总价*/
  public addListList;

  public jfen;
  checked =false;
  public goodSize;
  public addID;
  public trade_Memo = "";
  public addBuylist = {
    buyNum: 1,
    c_UserAddress_Id: 0,
    trade_Memo: "",
    isUseIntegral: false,
    gbId: 0,
    token: "",
  }
  

  //定义congfig中公共链接的变量aa
  public wdh = this.config.apiUrl;
  //定义token
  public token = this.storage.get('token');

  constructor(public storage: StorageProvider, public navCtrl: NavController, public navParams: NavParams, public http: Http, public jsonp: Jsonp,
    public httpService: HttpServicesProvider,/*引用服务*/public config: ConfigProvider,public loadingCtrl: LoadingController) {
    this.wid = navParams.get('wid');
    this.sizeId =navParams.get('sid');
    this.gnum = navParams.get('gnum');
    console.log(this.navParams.get('wid'))
    console.log(this.sizeId)
    //alert("商品id"+this.gnum);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopbuyPage');
  }
  ionViewWillLoad() {
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
      loading.present();
    //商品内容
    var that = this;
    var j = 3;
    var api = this.wdh + '/api/goods/buy_list?caId=1&token=' + this.token;
    this.http.get(api).map(res => res.json()).subscribe(data => {
     
      console.log(data);
      that.dtlist = data.json.dt.model;
       
      that.jfen=data.json.dt.model.useintegralpricemax;//获得积分抵扣额度
      
      that.totalPrice=data.json.dt.model.totalprice;
      this.wtotalPrice=data.json.dt.model.totalprice;
      //购买数量限制goodslimitnum、库存数量goodsnum、积分、价格totalprice
      // alert(JSON.stringify(that.dtlist));
      console.log(that.dtlist);
      that.addlist=data.json.address_List.list[0];//（默认）收获地址相关
      that.addListList = data.json.address_List.list;
      //alert(JSON.stringify(that.addlist));
      that.addID = data.json.address_List.list[0].dddress_id;
      console.log(that.addlist);
      that.goodSlist = data.json.dt_GoodsSize.list;//多商品列表
      //商品内容（名称title、图片img、购买数量buynum）
      //alert(JSON.stringify(that.goodSlist));
      
      that.goodSize = data.json.dt_GoodsSize.list[0].id;//获得商品id
      this.gnum = data.json.dt_GoodsSize.list[0].buynum;
      //this.test=that.goodSlist[0].buynum;

      //this.te = data.json.dt.model.totalprice;
      //alert(this.test);
      //this.totalPrice = this.test * this.te;
//获取showList内容
// //店铺信息
//  for(var i=0;i< that.goodSlist.length;i++){
    
// //       that.showList.goodImg.push(data.json.dt_GoodsSize.list[i].img);
      
//       this.sid = that.goodSlist[i].shop_id;
//       //alert(this.sid);
//       var api2 = this.wdh + '/api/shop/info?sId='+this.sid;
//       this.http.get(api2).map(res => res.json()).subscribe(data2 => {

//       console.log(data2);
//       // that.shoplist = data2.model;
//       // alert(that.shoplist);
//       //that.goodSlist[i]["shopname"] = data2.model.name;

//       // console.log(data2);
//     })
// //      numGroup.push(this.list[i].num);
// //   //console.log(this.list[i].num)
    
// //   }
// // 
//  }
//  if (data.errcode === 0 && data.errmsg === 'OK') {
//     } else if (data.errcode === 40002) {
//       j--;
//         if (j > 0) {
//       this.config.doDefLogin();
     
//         }
//       }
//       else { 
//       alert(data.errmsg);
//       }
    })
      //运费postage
     var api3=this.wdh+'/api/trade/info?addressId=1&gId=1&gsId=1&goodsNum=1&token='+this.token;
            this.http.get(api3).map(res => res.json()).subscribe(data3 =>{
            console.log(data3);
            
      that.carriagelist = data3.model;
      console.log(data3);
       })
    

    //积分抵扣pricemax,没用！
    var api4 = this.wdh + '/api/userintegral/info?preDecimal=111&token=' + this.token;
    loading.dismiss();
    this.http.get(api4).map(res => res.json()).subscribe(data4 => {
      console.log(data4);
      that.creditslist = data4.model;
      console.log(data4);
    }) 
  }

  //修改收货地址
  changeAdd(){
    this.navCtrl.push(ChangeaddrPage, {
        callback: this.myCallbackFunction,
        addListList : this.addListList
    });
    this.postFee();
  }
//根据地址获得运费
postFee(){
  //运费postage
  var j = 3;
    var api3 = this.wdh + '/api/trade/info?addressId='+this.addID+'&gId='+this.wid+'&gsId='+this.sizeId+'&goodsNum='+this.gnum+'&token=' + this.token;
    this.http.get(api3).map(res => res.json()).subscribe(data3 => {
      if (data3.errcode === 0 && data3.errmsg === 'OK') {
      //alert("运费改变！");
       //alert(this.addID+'&gId='+this.wid+'&gsId='+this.sizeId+'&goodsNum='+this.gnum+'&token=' + this.token);
      console.log(data3);
      this.carriagelist = data3.model;
      this.fee=data3.model.postage;
      //alert(JSON.stringify(this.carriagelist));
      console.log(data3);
      } else if (data3.errcode === 40002) {
        j--;
          if (j > 0) {
          this.config.doDefLogin();
          this.postFee();
          }
        }
        else { 
        alert(data3.errmsg);
          }
    })
}
  myCallbackFunction  =(params) => {
    var that = this;
     return new Promise((resolve, reject) => {
      if(typeof(params)!='undefined'){
          resolve('ok');
          console.log(params)
          that.addlist = params;
      }else{
          reject(Error('error'))
      }
            
   });
 }

//积分抵扣&运费
discount(){
  
  var t=this.totalPrice;
  if(this.checked==true){  
      this.totalPrice=parseInt(t.toString())-parseFloat(this.jfen.toString())+this.fee;
    
  }
  else if(this.checked==false){ 
  this.totalPrice=this.wtotalPrice+this.fee;}
  
}

  //提交订单
  addBuy() {
    var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    //  headers.append('Accept-Charset', 'utf-8');
    // let options = new RequestOptions(JSON.stringify({ headers: headers }));
    this.addBuylist.gbId = this.goodSize;
    this.addBuylist.c_UserAddress_Id = this.addID;
    this.addBuylist.token = this.token;
    this.addBuylist.trade_Memo = this.trade_Memo;
    this.addBuylist.isUseIntegral= this.checked
    this.addBuylist.buyNum =this.gnum;

    var j = 3;
    console.log(this.token)
    var date = this.addBuylist;
    console.log(date);
    var api =this.wdh + '/api/trade/add  ';
    this.http.post(api, date).map(res => res.json()).subscribe(data => {
//alert(JSON.stringify(date));
      if (data.errcode === 0 && data.errmsg === 'OK') {
        alert("成功!");
      } else if (data.errcode === 40002) {
        j--;
        if (j > 0) {
          this.config.doDefLogin();
          this.addBuy();
        }
      }
      else {       
        alert(data.errmsg);
      }
    });
  }


  backTo() {
    this.navCtrl.pop();
  }

  // incCount() {
  //   ++this.buynum;
  // }

  //数量变化  双向数据绑定
  // decCount() {
  //   if (this.buynum > 1) {
  //     --this.buynum;
  //   }
  // }

  //计算总价
  //  sumPrice(){
  //        var tempAllPrice=0;
  //var test=0;
  //alert(test);
  //test=this.dtlist['totalprice'];

  //       for(let i=0;i<this.list.length;i++){
  //         if(this.list[i].checked==true){
  //           tempAllPrice=parseInt(this.goodSlist['buynum'])*parseInt(this.dtlist['totalprice']);
  //还需加运费
  //         }
  //       }
  //     this.totalPrice=tempAllPrice;
  //  }

}
