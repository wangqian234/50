import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-shopmalllist',
  templateUrl: 'shopmalllist.html',
})
export class ShopmalllistPage {

  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }

  ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';

    var api = 'http://test.api.gyhsh.cn/api/goods/group_list?pageSize=10&pageIndex=1&curCityCode=4403'
     //var api = '';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg == 'OK'){
         this.list = data.list;
         console.log(data);
     } else {
        alert(data.errmsg);
     }
     })
  }

  ionViewDidLoad(){
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
