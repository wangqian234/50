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










gettext(){
    var token = 'F1EFC0D90871A10EA4C4F54A3A452E8AB8930B0AA8D1209D41C60F268393129497703AD3FEECF810CC4F5065012555DD30DDDB91E79AA7988D1E59DCEAF71A036BD4AEF81AD6D3AD2DA6399252B5AC2C4A71E4BC1447F18B3E7EB225F8A1B0FD1C32999F3F5722C8F4DDED6617BD3076720643DC72218EFE689C58520E19E4DFE07F0990CD27CDCC0D8483CEBA825C6A780777DACA8BE4E26F30B2C9633DD1E7FAA890C620123E159964FA8EE3CA4D16'



    var api = this.aa +'/ api/user/address/list';
    this.http.get(api,{"roomId":1,"token":token,"management":10,"water":10,"electricity":110,"parking":300,"rubbish":15}
    ).map(res => res.json()).subscribe(data =>{
      alert(1)
      if(data.errcode === 0 && data.errmsg === 'OK'){
        this.list= data.list;
        alert("gaohaile")
        console.log(data)
      }else{
        console.log(data)
        alert(data.errmsg);
      }
    })

}


















}


