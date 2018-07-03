import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import $ from 'jquery';
import { Http }from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
import {RentsaleinfoPage} from '../rentsaleinfo/rentsaleinfo'

@Component({
  selector: 'page-rentsalemy',
  templateUrl: 'rentsalemy.html',
})
export class RentsalemyPage {

  isChencked:boolean;
  checked:false;
  pageSize = 10;
  pageIndex = 1;
  type;
  mylist = [];
  blocksome = false;
  public del ={
    token:'',
    ids:'',
  }
  public currentPlaceCode;
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider ,
  public storage :StorageProvider,public http:Http,public loadingCtrl: LoadingController, public toastCtrl:ToastController,) {
    
  }

  ionViewDidLoad() {
   // this.currentPlaceCode = this.storage.get('currentPlaceCode')
   this.currentPlaceCode = 4403;
    this.clickCSS();
    this.myPublish(1);
    this.getDelete();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  getDelete(){
    var that = this;
    $("#delete").click(function(){
      $("#delete").css("display","none");
      $("#over").css("display","block");
      $(".ioncheck").css("display","block");
      $("#deletebutton").css("display","block");
      that.blocksome = true;
    });
    $("#over").click(function(){
      $("#delete").css("display","block");
      $("#over").css("display","none");
      $(".ioncheck").css("display","none");
      $("#deletebutton").css("display","none");
      that.blocksome = false;
    })
  }

  myPublish(type){
    this.pageIndex = 1;
    this.type = type;
    var api = this.config.apiUrl + "/api/rental/mylist?pageSize=" + this.pageSize + "&pageIndex=" + this.pageIndex +
     "&curCityCode=" + this.currentPlaceCode + "&type=" + this.type + "&token=" + this.storage.get("token");
     console.log(api)
      this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.mylist = data.list;
        console.log(data)
        if(data.list.length == 0){
          $('.nomore').css("display","block")
        }
      } else {
        alert(data.errmsg)
      }
    });
      $("#delete").css("display","block");
      $("#over").css("display","none");
      $("#deletebutton").css("display","none");
  }

  myPublishList(infiniteScroll){
    var api = this.config.apiUrl + "/api/rental/mylist?pageSize=" + this.pageSize + "&pageIndex=" + this.pageIndex +
     "&curCityCode=" +this.currentPlaceCode+ "&type=" + this.type + "&token=" + this.storage.get("token");
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode === 0 && data.errmsg === 'OK') {
          this.mylist = this.mylist.concat(data.list);
          if(infiniteScroll) {
              //告诉ionic 请求数据完成
              this.pageIndex++;
              infiniteScroll.complete();
            if(data.list.length<11){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
      } else {
        alert(data.errmsg)
      }
    });
          
  }
  //跳转到详情
  goRentsaleInfo(id,type){
    this.navCtrl.push(RentsaleinfoPage,{
      houseId:id,
      houseType:type,
      quFen:0,
    })
  }
  //批量删除
  delMyPublish(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var myId=[];
    for(var i=0;i<this.mylist.length;i++){
      if(this.mylist[i].checked==true){
        var aa = this.mylist[i].id
        myId.push(aa);
      }
    }
    this.del.ids=myId.join(',');
    this.del.token = this.storage.get('token')
    var api = this.config.apiUrl +　'/api/rental/del';
    this.http.post(api,this.del).map(res => res.json()).subscribe(data => {
      $(".spinnerbox").fadeOut(200);
    $(".spinner").fadeOut(200);
      if(data.errcode === 0 && data.errmsg === 'OK'){
        alert("删除成功")
        let toast = this.toastCtrl.create({
          message: '批量删除成功',
          duration: 2000,
          position: 'bottom'
        });
          toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });
      toast.present();
      this.myPublish(this.type);
      $("#delete").css("display","block");
      $("#over").css("display","none");
      $(".ioncheck").css("display","none");
      $("#deletebutton").css("display","none");
      }else{
        alert("删除失败")
      }
    })
  }

  doLoadMore(infiniteScroll){
    this.myPublishList(infiniteScroll);  
  }

  clickCSS(){
    var that = this;
    $("#test li").click(function(){
      $("#test li").each(function(){
        $(this).attr("class","type");
      })
      $(this).attr("class","type current");
    })
  }

  backTo(){
    this.navCtrl.pop();
  }
  //选中
  changeChecked(){
    if(this.checkNum()==this.mylist.length){
      this.isChencked = true;
    }else{
      this.isChencked = false;
    }
  }
  //选择的数量
  checkNum(){
    let num=0;
    for(var i=0;i<this.mylist.length;i++){
      if(this.mylist[i].checked==true){
        num+=1;
      }
    }
    return num;
  }
  //全选按钮进行反选
  checkAll(){
    if(this.isChencked){
      for(var i=0;i<this.mylist.length;i++){
        this.mylist[i].checked = false;
    }
    this.isChencked = false;
   }else{
    for(var i=0;i<this.mylist.length;i++){
      this.mylist[i].checked = true;
    }
     this.isChencked = true;
  }
}
   //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
        this.myPublish(this.type);
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }
}
