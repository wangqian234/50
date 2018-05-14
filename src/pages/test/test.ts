//whm
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
public list = [];
public alist = [];
  public aa =this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config: ConfigProvider,public storage:StorageProvider) {
  }
ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    var api = this.aa +'/api/goods/list?curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        this.list= data.list;
        console.log(data);
      }else{
        alert(data.errmsg);
      }
    })

  }
  ionViewDidLoad() {
   this.onload2();
  }
onload2 = function(){
    var Sos=document.getElementById('sos_tanc');
		var ShouYe=document.getElementById('yemnr');
		var SosYe=document.getElementById('shous_yem');
		var SosFanHui=document.getElementById('sous_fanh_sy');
		Sos.onclick=function()
		{
			ShouYe.style.display=('none');
			SosYe.style.display=('block');
		}
		SosFanHui.onclick=function()
		{
			ShouYe.style.display=('block');
			SosYe.style.display=('none');
		}
}



  //添加工单"servicescore":1,"timelyscore":1,"qualityscore":1,"listId":1,"scoreMemo":"评价"
  showPopup(){
    var that=this;
    var api = this.config.apiUrl+'/api/TradeGoods_Refund/info';
     this.http.post(api,{"servicescore":1,"timelyscore":1,"qualityscore":1,"listId":1,"scoreMemo":"评价"} 
     ).map(res => res.json()).subscribe(data =>{
       alert(1)
          if(data.errcode===0&&data.errmsg==='OK'){
            
            this.alist=data.list;//怎么知道那个是默认房屋
            console.log(this.alist)
          }else{
            alert(data.errmsg)
          }
     })
  }











}


