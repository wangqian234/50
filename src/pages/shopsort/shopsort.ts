
//wdh
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import $ from 'jquery';
import { LoadingController } from 'ionic-angular';
//商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';


@Component({
  selector: 'page-shopsort',
  templateUrl: 'shopsort.html',
})
export class ShopsortPage {

  public ShopgoodsinfoPage=ShopgoodsinfoPage;
  public leftCate=[];  /*左侧分类数据*/
  public list=[];
  public fenllist=[];
  public wdh=this.config.apiUrl;
  public rightCate=[];  /*右侧分类数据*/

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, 
  public httpService:HttpServicesProvider,public config:ConfigProvider,public loadingCtrl: LoadingController) {
    this.getLeftCateData();/*获取左侧分类*/
  }
ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
  //$('#cate_left li:nth-of-type(1)').attr("class","active");
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';}
 ionViewDidLoad() {
       
    }


//左侧分类的方法

  getLeftCateData(){

       var api=this.wdh+'/api/goods_sort/list';
      
        this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
        //  alert(JSON.stringify(this.list));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })

      // this.httpService.requestData(api,(data)=>{
      //     console.log(data);
      //     this.leftCate=data.result;

      //  右侧内容的初始显示
           this.getRightCateData(21,0);        
      // })
  }


  getRightCateData(pid,i){
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();
     $("#cate_left li").removeAttr("class");
    var span = "#cate_left li:nth-of-type(" + ++i +")"
    $(span).attr("class","activety");
    //alert(pid);
    var api=this.wdh+'/api/goods/list?goods_Type='+pid+'&curCityCode=4403';
    loading.dismiss();
         this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.fenllist = data.list;
         //alert(JSON.stringify(this.fenllist));
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
  }


  backTo(){
    this.navCtrl.pop();
  }
  

}


  // getRightCateData(pid){
  //   var api='api/pcate?pid='+pid;
  //   this.httpService.requestData(api,(data)=>{
  //     console.log(data);
  //     this.rightCate=data.result;
      
  //   })
  // }
  



