import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';//实现列表缓存
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ChangeDetectorRef } from '@angular/core'; //更新页面

//config.ts
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';

//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';
//加载圈
import { LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,public config:ConfigProvider, public navParams: NavParams,public http: Http,
  public storage:StorageProvider,public loadingCtrl: LoadingController) {
        
  }

  ionViewWillEnter(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
     this.getCartsData('');

  }
  
  ionViewDidLoad() {
    
  }

  getCartsData(infiniteScroll){
        let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
    
    var j = 3;  //确定递归次数，避免死循环
    var api = this.config.apiUrl + '/api/usercart/list?pageSize=' + this.pageSize + '&pageIndex=' + this.pageIndex + '&token=' +this.storage.get('token');
    this.http.get(api).map(res => res.json()).subscribe(data =>{
        loading.dismiss();
        if(data.errcode===0 && data.errmsg==="OK"){
        if(data.list.length == 0){
          this.hasData = false;
        }
        this.list=this.list.concat(data.list);  /*数据拼接*/
        console.log(this.list); 
        if(data.list.length<10){
          $('ion-infinite-scroll').css('display','none')
        }else{
            this.pageIndex++;
        }
        if(infiniteScroll){
          
          infiniteScroll.complete();        //告诉ionic 请求数据完成
          if(data.list.length<10){  /*没有数据停止上拉更新*/
            infiniteScroll.enable(false);
            $('.nomore').css('display','block');
          }
        }
      }
 else if(data.errcode === 40002) {
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
          tempAllPrice= tempAllPrice + this.list[i].num*this.list[i].preprice;
        }
      }
      this.allPrice=parseFloat(tempAllPrice.toFixed(2));
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
     numGroup.push(parseInt(this.list[i].num));
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
       this.navCtrl.push(ShopbuyPage,{
          wid: this.list[0].good_id,
          sid: this.list[0].size_id,
          gnum:this.list[0].num,

  });
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
