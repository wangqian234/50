import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  pageSize = 10;
  pageIndex = 1;

  public list=[{
    "checked":false,
    "product_title":"这是一瓶矿泉水",
    "product_price": 123,
    "product_count":1
  },{
    "checked":false,
    "product_title":"这是一瓶矿泉水",
    "product_price": 123,
    "product_count":1
  },{
    "checked":false,
    "product_title":"这是一瓶矿泉水",
    "product_price": 123,
    "product_count":1
  },{
    "checked":false,
    "product_title":"这是一瓶矿泉水",
    "product_price": 123,
    "product_count":1
  },{
    "checked":false,
    "product_title":"这是一瓶矿泉水",
    "product_price": 123,
    "product_count":1
  },{
    "checked":false,
    "product_title":"这是一瓶矿泉水",
    "product_price": 123,
    "product_count":1
  }];

  public allPrice=0;  /*总价*/

  public isChencked=false;  /*全选反选*/

  public isEdit=false;   /*是否编辑*/

  public hasData=true;   /*是否有数据*/

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public config:ConfigProvider,public storage:StorageProvider, public http: Http) {
  }

  ionViewWillEnter(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    this.getCartsData('');

  }
  
  ionViewDidLoad() {
    
  }

  getCartsData(infiniteScroll){
    var j = 3;  //确定递归次数，避免死循环
    var api = this.config.apiUrl + '/api/usercart/list?pageSize=' + this.pageSize + '&pageIndex=' + this.pageIndex + '&token=' +this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.list=this.list.concat(data.result);  /*数据拼接*/
        this.hasData=true;
        if(infiniteScroll){
          //告诉ionic 请求数据完成
          infiniteScroll.complete();

          if(data.result.length<10){  /*没有数据停止上拉更新*/
            infiniteScroll.enable(false);
          }
      };
        this.pageIndex++
      } else if(data.errcode === 40002) {
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.getCartsData(infiniteScroll);
          }
      } else {
        alert(data.errmsg);
      }
    });
  }

  //删除选中商品
  delCartsData(){
    var j = 3;  //确定递归次数，避免死循环
    var api = this.config.apiUrl + '/api/usercart/list?pageSize=' + this.pageSize + '&pageIndex=' + this.pageIndex + '&token=' +this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.list=this.list.concat(data.result);  /*数据拼接*/
        this.hasData=true;
        this.pageIndex++
      } else if(data.errcode === 40002) {
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.delCartsData();
          }
      } else {
        alert(data.errmsg);
      }
    });
  }

  changeCarts(){
    if(this.getChenckNum()==this.list.length){
      this.isChencked=true;
    }else{
      this.isChencked=false;
    }
    this.sumPrice();  
  }

   //获取选中的数量
   getChenckNum(){
      let sum=0;
      for(let i=0;i<this.list.length;i++){          
          if(this.list[i].checked==true){
            sum+=1;
          }
      }
      return sum;
   }

   /*计算总价*/
  sumPrice(){
      var tempAllPrice=0;
      for(let i=0;i<this.list.length;i++){
        if(this.list[i].checked==true){
          tempAllPrice+=this.list[i].product_count*this.list[i].product_price;
        }
      }
      this.allPrice=tempAllPrice;
  }


  //全选反选
  //ionChange  事件只要checkbox改变就会触发
  checkAll(){ 
      if(this.isChencked){ /*选中*/
         for(let i=0;i<this.list.length;i++){
            this.list[i].checked=false;   
         }
         this.isChencked=false;
      }else{
         for(let i=0;i<this.list.length;i++){          
            this.list[i].checked=true;              
         }
         this.isChencked=true; 
      }
      this.sumPrice();
   }

  incCount(item){    
    ++item.product_count;
    this.sumPrice();  
  }

  //数量变化  双向数据绑定
  decCount(item){
    // console.log(item);
    if(item.product_count>1){
      --item.product_count;
    }
    this.sumPrice();  
  }

  //加载更多
  doLoadMore(infiniteScroll){
    this.getCartsData(infiniteScroll);
  }
   

}
