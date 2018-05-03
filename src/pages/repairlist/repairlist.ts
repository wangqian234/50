import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
//工单详情页
import { RepairdetailsPage } from '../repairdetails/repairdetails';

@Component({
  selector: 'page-repairlist',
  templateUrl: 'repairlist.html',
})
export class RepairlistPage {

  public list=[{title:"123",price:"123"},{title:"123",price:"123"},{title:"123",price:"123"},
   {title:"123",price:"123"},{title:"123",price:"123"},{title:"123",price:"123"},{title:"123",price:"123"},
   {title:"123",price:"123"},{title:"123",price:"123"},{title:"123",price:"123"}];

  public cid='';/*获取分类id*/

  public page=1; /*分页*/

  public RepairdetailsPage=RepairdetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider) {

    this.cid=this.navParams.get('cid');

    this.getProductList('');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairlistPage');
  }

  onCancel(event){

  }

getProductList(infiniteScroll){
    var api='api/plist?cid='+this.cid+'&page='+this.page;
    this.httpService.requestData(api,(data)=>{
      // console.log(data);
      this.list=this.list.concat(data.result);  /*数据拼接*/
      if(infiniteScroll){
        //告诉ionic 请求数据完成
        infiniteScroll.complete();

        if(data.result.length<10){  /*没有数据停止上拉更新*/
          infiniteScroll.enable(false);
        }
      };
      this.page++;

    })

  }
  //加载更多
  doLoadMore(infiniteScroll){
    this.getProductList(infiniteScroll);
  }

  repairDetails(item){
      this.navCtrl.push(RepairdetailsPage,{
      item:item
    })
  }

}
