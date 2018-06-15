import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import { Http,Jsonp }from '@angular/http';


@Component({
  selector: 'page-editorinfo',
  templateUrl: 'editorinfo.html',
})
export class EditorinfoPage {

  //定义congfig中公共链接的变量
  public pg = this.config.apiUrl;
  //定义token
  public token=this.storage.get('token');
  //定义个人信息
  public personInfo={
        "token":"",
        "name":"",
        "birthday":"",
        "cardno" : '',
        "cardtype" : '',
        "education" : '',
        "industryinfo" : '',
        "maritalstatus" : '',
        "monthlyincome" : '',
        "sex" : false,
  };

  //定义用户基本信息
  public data = {
        "token":"",
        "name":"",
        "birthday":"",
        "cardno" : '',
        "cardtype" : '',
        "education" : '',
        "industryinfo" : '',
        "maritalstatus" : '',
        "monthlyincome" : '',
        "sex" : false,
  }
  //定义用户
  user = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,
   public http:Http, public storage:StorageProvider) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditorinfoPage');
    this.getUserInfo();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  getBaseInfo(){
    $(".zhuc_qieh div:nth-of-type(1)").attr("class","zhuc");
    $(".zhuc_qieh div:nth-of-type(2)").removeAttr("class","zhuc")
    $("#base").css("display","block");
    $("#more").css("display","none");
  }

  getMoreInfo(){
    $(".zhuc_qieh div:nth-of-type(2)").attr("class","zhuc");
    $(".zhuc_qieh div:nth-of-type(1)").removeAttr("class","zhuc")
    $("#base").css("display","none");
    $("#more").css("display","block");
  }

    //获取用户信息(pg goes everywhere)
    getUserInfo(){
      $(".spinnerbox").fadeIn(200);
      $(".spinner").fadeIn(200);
      var j = 3;
      var api = this.config.apiUrl + '/api/User/info?token=' +  this.storage.get('token');
      this.http.get(api).map(res => res.json()).subscribe(data =>{
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
        if (data.errcode === 0 && data.errmsg === 'OK') {
          if(data.model.birthday){
          data.model.birthday = data.model.birthday.substring(0,10);
          this.personInfo = data.model
            console.log(JSON.stringify(data.model));
        } else if(data.errcode === 40002){
          j--;
          if(j<0){
            this.config.doDefLogin();
            this.getUserInfo();
          } else {

          }
        }
        }
      });
    }

    //修改用户基本信息，点击提交时生效
    editBasicInfo(){
      $(".spinnerbox").fadeIn(200);
      $(".spinner").fadeIn(200);
      var j = 3;
      var data = {
        "token": this.storage.get('token'),
        "name": this.personInfo.name,
        "birthday":this.personInfo.birthday,
        "sex":this.personInfo.sex,
      }
      var now = new Date().getTime();
      var birth = new Date(data.birthday).getTime();
      if(birth - now >0){
        alert("出生日期不能大于当前时间");
        return;
      }
      console.log(data)
      if(this.personInfo.birthday&&this.personInfo.name){
      var api = this.config.apiUrl + '/api/User/edit_Basic';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
       if (data.errcode === 0 && data.errmsg === 'OK') {
        console.log("修改成功！");
        this.storage.set('username1',this.personInfo.name)
        this.editMoreInfo();
      } else if(data.errcode === 40002) {
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.editBasicInfo();
        }
      } else {
          console.log(data.errmsg);
        }       
    });
      }else{
        alert("姓名，出生日期，不能为空")
      }


  }

    //修改用户更多信息，点击提交时生效
    editMoreInfo(){
      $(".spinnerbox").fadeIn(200);
      $(".spinner").fadeIn(200);
      var j =3;
      var data = {
        "token":this.storage.get('token'),
        "education":this.personInfo.education,
        "cardType":this.personInfo.cardtype,
        "cardNo":this.personInfo.cardno,
        "monthlyIncome":this.personInfo.monthlyincome,
        "maritalStatus":this.personInfo.maritalstatus,
        "industryInfo":this.personInfo.industryinfo,
      }
      if(!data.cardNo || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(data.cardNo)
        || !/(P\d{7})|(G\d{8})/.test(data.cardNo)){
        alert("请输入正确的证件格式");
        return;
      }
      console.log(JSON.stringify(data))
      var api = this.config.apiUrl + '/api/User/edit_More';
      this.http.post(api,data).map(res => res.json()).subscribe(data =>{
        $(".spinnerbox").fadeOut(200);
        $(".spinner").fadeOut(200);
        if (data.errcode === 0 && data.errmsg === 'OK') {
          console.log("修改成功!");
          this.navCtrl.pop();
      } else if(data.errcode === 40002){
        j--;
        if(j>0){
          this.config.doDefLogin();
          this.editMoreInfo();
        }
      } else {
        console.log(data.errmsg);
      }
    });
  }


  backTo(){
    this.navCtrl.pop();
  }

}
