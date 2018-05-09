//whm
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
public list = [];
  public aa =this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config: ConfigProvider) {
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

}


