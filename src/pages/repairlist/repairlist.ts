import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
//工单详情页
import { RepairdetailsPage } from '../repairdetails/repairdetails';
//增加工单页
import { RepairaddPage } from '../repairadd/repairadd';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import {Http,Jsonp}from '@angular/http';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-repairlist',
  templateUrl: 'repairlist.html',
})
export class RepairlistPage {
  public list =[];
  public repairlist=[];
  public type="-1";
  public keywords='';

  public cid='';/*获取分类id*/
  public page=1; /*分页*/

  public RepairdetailsPage=RepairdetailsPage;
  public RepairaddPage = RepairaddPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider
  ,public config:ConfigProvider,public storage:StorageProvider,public http:Http,public loadingCtrl: LoadingController) {
    
    if(this.navParams.get('cid')){
      this.cid=this.navParams.get('cid');
    }

  }
  ionViewWillLoad(){
    this.getRem();
    this.getProductList("");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairlistPage');
    
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
    this.list = [];
    this.page = 1;
    this.getProductList("")
  }

  onCancel(event){

  }

  repairTypeSub(){
    
  }
    getProductList(infiniteScroll){
      // let loading = this.loadingCtrl.create({
	    // showBackdrop: true,
      //  });
      // loading.present();
      $(".spinnerbox").fadeIn(200);
      $(".spinner").fadeIn(200);
      var j = 3;
        var api= this.config.apiUrl + '/api/list/list?tId='+this.type +'&keyWord='+this.keywords+'&pageIndex='+this.page+'&pageSize=10&token='+this.storage.get('token');
        this.http.get(api).map(res => res.json()).subscribe(data =>{
          // loading.dismiss();
          $(".spinnerbox").fadeOut(200);
          $(".spinner").fadeOut(200);
          if(data.errcode===0 && data.errmsg==="OK"){
          if(data.list.length<10){
           $('.nomore').css('display','block');
          }
          this.list=this.list.concat(data.list); /*数据拼接*/
          console.log(this.list)
          //console.log(this.page)
          if(infiniteScroll){
            //告诉ionic 请求数据完成
              this.page++;
            infiniteScroll.complete();
            if(data.list.length<10){  /*没有数据停止上拉更新*/
              infiniteScroll.enable(false);
              $('.nomore').css('display','block');
            }
          }
        }else if(data.errcode === 40002){
            j--;
            if(j>0){
            this.config.doDefLogin();
            this.getProductList(infiniteScroll);
          }
        }else{
          alert(data.errmsg)
        }
        console.log(data.list)
        })
      }

    getProduct(){
      this.list = [];
      this.page=1;
      this.getProductList("");
    }

  //加载更多
  doLoadMore(infiniteScroll){
    this.getProductList(infiniteScroll);
  }
    onSearchKeyUp(event){
    if("Enter"==event.key){
      this.list= [];
      this.page=1;
     this.getProductList("");
    }
  }

  repairDetails(id){
      this.navCtrl.push(RepairdetailsPage,{
      item:id
    })
  }

  backToRepair(){
    this.navCtrl.pop();
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

}
