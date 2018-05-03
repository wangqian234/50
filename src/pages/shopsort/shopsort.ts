import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

@Component({
  selector: 'page-shopsort',
  templateUrl: 'shopsort.html',
})
export class ShopsortPage {

  public leftCate=["第一个分类","第二个分类","第三个分类","第四个分类","第五个分类",
  "第六个分类","第七个分类","第八个分类"];  /*左侧分类数据*/

  public rightCate=["第一个分类","第二个分类","第三个分类","第四个分类","第五个分类",
  "第六个分类","第七个分类","第八个分类"];  /*右侧分类数据*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService:HttpServicesProvider) {
    this.getLeftCateData();/*获取左侧分类*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopsortPage');
  }

//左侧分类的方法

  getLeftCateData(){
   this.leftCate=["第一个分类","第二个分类","第三个分类","第四个分类","第五个分类",
  "第六个分类","第七个分类","第八个分类"];
      // var api='api/pcate'
      // this.httpService.requestData(api,(data)=>{
      //     console.log(data);
      //     this.leftCate=data.result;

      //     //调用右侧分类
      //     this.getRightCateData(this.leftCate[0]['_id']);        
      // })
  }

  // getRightCateData(pid){
  //   var api='api/pcate?pid='+pid;
  //   this.httpService.requestData(api,(data)=>{
  //     console.log(data);
  //     this.rightCate=data.result;
      
  //   })
  // }
  
}
