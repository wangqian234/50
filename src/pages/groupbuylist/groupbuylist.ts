//wdh
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
import $ from 'jquery';//实现列表缓存
//商品购买页面
import { ShopbuyPage } from '../shopbuy/shopbuy';

//团购详情界面
import { GroupdetailPage } from '../groupdetail/groupdetail';
//返回首页
import { TabsPage } from '../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-groupbuylist',
  templateUrl: 'groupbuylist.html',
})
export class GroupbuylistPage {
  public GroupdetailPage=GroupdetailPage;
  public pageSize = 10;
  public pageIndex = 1;
  public hasData=true;   /*是否有数据*/
  public list = [];
  public wdh=this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config:ConfigProvider,public loadingCtrl: LoadingController,public app: App) {
   
   
   
  }

 ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
    this.getGroupList('');
    
  }

  getGroupList(infiniteScroll)
  {
     let loading = this.loadingCtrl.create({
	    showBackdrop: true,
       });
    loading.present();
     var j = 3;  //确定递归次数，避免死循环
     var api = this.wdh+'/api/goods/group_list?pageSize=' + this.pageSize 
     + '&pageIndex=' + this.pageIndex + '&curCityCode=4403';
     loading.dismiss();
     this.http.get(api).map(res => res.json()).subscribe(data =>{
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
            this.getGroupList(infiniteScroll);
          }
      } else {
        alert(data.errmsg);
      }
    }); 
   

  }

  ionViewDidLoad() {
   
  }

    backTo(){
    this.navCtrl.pop();
  }
    //加载更多
  doLoadMore(infiniteScroll){
    this.getGroupList(infiniteScroll);
  }

  backToHome(){
    this.app.getRootNav().push(TabsPage);    
  }

}
