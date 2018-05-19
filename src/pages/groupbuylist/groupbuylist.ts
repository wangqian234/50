//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';

//团购详情界面
import { GroupdetailPage } from '../groupdetail/groupdetail';
/**
 * Generated class for the GroupbuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupbuylist',
  templateUrl: 'groupbuylist.html',
})
export class GroupbuylistPage {
  public GroupdetailPage=GroupdetailPage;
  
  public list = [];
  public wdh=this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config:ConfigProvider,public loadingCtrl: LoadingController) {
   
   
   
  }

 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    let loading = this.loadingCtrl.create({
	    showBackdrop: true,
    });
    loading.present();  
    
     var api = this.wdh+'/api/goods/group_list?pageSize=10&pageIndex=1&curCityCode=4403';
     loading.dismiss();
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

    backTo(){
    this.navCtrl.pop();
  }


}
