//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//请求数据
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//团购详情界面
import { GroupdetailPage } from '../groupdetail/groupdetail';

/**
 * Generated class for the BigsalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bigsale',
  templateUrl: 'bigsale.html',
})
export class BigsalePage {
  public GroupdetailPage=GroupdetailPage;
  public dataGlist=[];
  public goodMlist=[];
  public dataSlist=[];
  public list = [];
  public wdh=this.config.apiUrl;
  public token=this.storage.get('token');

  constructor(public storage:StorageProvider,public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider) {


  }

 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

    
    var api = this.wdh+ '/api/goods/list?pageSize=10&pageIndex=1&curCityCode=4403';
     
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
  }
  ionViewDidLoad() {
   
  }


//测试传递
  getDetailData(pid){
   //alert(pid);
    var that=this;
    var api=this.wdh+'/api/goods/info?goods_Id='+pid+'&token='+this.token;
        this.http.get(api).map(res => res.json()).subscribe(data =>{
     
              
       that.dataGlist = data.json['data_group'].list;//list为空
             // console.log(that.dataGlist);
      that.goodMlist=data.json['good_Model'].model;
     // alert(JSON.stringify(that.goodMlist));
      console.log(that.goodMlist);

      that.dataSlist=data.json['data_Sizes'].list;
      // alert(JSON.stringify(that.dataGlist));
      // alert(JSON.stringify(that.dataSlist));
      console.log(that.dataSlist);
       
      
     
     })
  }

  backTo(){
    this.navCtrl.pop();
  }



}