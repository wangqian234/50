import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  //跳转页面
  public ShopbuyPage=ShopbuyPage;
  pageSize = 10;
  pageIndex = 1;
  checked =false;
  public list=[];

  public allPrice=0;  /*总价*/

  public isChencked=false;  /*全选反选*/

  public isEdit=false;   /*是否编辑*/

  public hasData=true;   /*是否有数据*/
  //修改商品数量
  public updateList = {
    gsId:'',
    goodsNum:'',
    token:''
  }
  //删除选中商品
  public deleatcartList ={
    gsId:'',
    token:'',
  }
  //结算
  public blist={
    gidGroup:'',
    gsIdGroup:'',
    numGroup:'',
    token:'',
  }

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
        if(data.list.length == 0){
          this.hasData = false;
        }
        this.list=this.list.concat(data.list);  /*数据拼接*/
        console.log(this.list);
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
  delCartsData(item){
    this.deleatcartList.gsId=item.size_id;
    this.deleatcartList.token=this.storage.get('token');
    var data = this.deleatcartList;
    var j = 3;  //确定递归次数，避免死循环
    var api = this.config.apiUrl + '/api/usercart/delete?';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.pageIndex = 1;
        this.list = [];
        this.hasData = true;
        this.getCartsData('');
      } else if(data.errcode === 40002) {
          j--;
          if(j>0){
            this.config.doDefLogin();
            this.delCartsData(item);
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
          tempAllPrice+=this.list[i].num*this.list[i].price;
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
    ++item.num;
    this.sumPrice();  
    this.updatenum(item);
  }

  //数量变化  双向数据绑定
  decCount(item){
    // console.log(item);
    if(item.num>1){
      --item.num;
    }
    this.sumPrice();  
    this.updatenum(item);
  }
  //修改购物车数量
  updatenum(item){
    this.updateList.gsId=item.size_id;
    this.updateList.goodsNum=item.num;
    this.updateList.token=this.storage.get('token');
    var data = this.updateList;
    console.log(this.updateList.token)
    var that = this;
    var api = this.config.apiUrl+'/api/usercart/update';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if(data.errcode ===0&&data.errmsg==='OK'){
        console.log("修改成功")
      }else{
        alert(data.errmsg)
      }
    })
  }
//结算
buy(){
  var gidGroup = [];
  var gsIdGroup = [];
  var numGroup = [];
  this.blist.token=this.storage.get('token');
  for(var i=0;i<this.list.length;i++){
    if(this.list[i].checked == true){
      gidGroup.push(this.list[i].good_id);
     gsIdGroup.push(this.list[i].size_id);
     numGroup.push(this.list[i].num);
  //console.log(this.list[i].num)
    }
  }
  this.blist.gidGroup = gidGroup.join(",");  
  this.blist.gsIdGroup = gsIdGroup.join(",");
  this.blist.numGroup=numGroup.join(",");
  console.log(this.blist);
  //接口
  var j=3;
   var date = this.blist;
     //alert(JSON.stringify(date));
    var api = this.config.apiUrl+'/api/usercart/add_settlement'
     this.http.post(api,date).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        // alert("post成功!");
         //跳转前验证
      var api=this.config.apiUrl+'/api/goods/buy_list?caId=1&token='+this.blist.token;
            this.http.get(api).map(res => res.json()).subscribe(data =>{
               //if(data.errcode === 0 && data.errmsg === 'OK'){
                  //alert("可以购买!");
       this.navCtrl.push(ShopbuyPage);
      // }else{
      //   alert(data.errmsg);
      // }
            })
      }else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.buy();
          }
      }
      else{
        alert(data.errmsg);
      }
     });
}
  //加载更多
  doLoadMore(infiniteScroll){
    this.getCartsData(infiniteScroll);
  }
   

}
