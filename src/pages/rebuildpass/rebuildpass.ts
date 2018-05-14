import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the RebuildpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rebuildpass',
  templateUrl: 'rebuildpass.html',
})
export class RebuildpassPage {

  public code='';  /*验证码*/
  public isShowSend=true;   /*是否显示发送验证码的按钮*/
  public num=5 ;   /*倒计时的数量*/
  public tel='';
  public tel2='';

  constructor(public navCtrl: NavController, public navParams: NavParams , public httpService:HttpServicesProvider,
  public config:ConfigProvider,public http: Http,public storage:StorageProvider) {
    this.tel = this.storage.get("userName")
    this.tel2 = this.tel.substr(0,3)+"****"+this.tel.substr(7);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RebuildpassPage');
  }

  ownRegist() {
    this.num = 5;
    this.isShowSend = false;
    this.doTimer();  /*倒计时*/
  }

    goRegisterpasswordPage(){

    //验证验证码是否成功
    var api='api/validateCode';
    this.httpService.doPost(api,{"tel":this.tel,"code":this.code},(result)=>{
        console.log(result);  /*发送到手机的验证码返回方便我们验证*/
        if(result.success){
          //保存验证码
         // this.storage.set('reg_code',this.code);

          //跳转到下一个页面
         // this.navCtrl.push(RegisterpasswordPage);
        }else{
          alert('验证码输入错误');
        }
    })

  }
  //倒计时的方法
  doTimer(){
    var timer=setInterval(()=>{
          --this.num; 
          if(this.num==0){
              clearInterval(timer);
              this.isShowSend=true;
          }

    },1000)

  }
  //发送验证码
  sendCode(){

    var api='api/sendCode';
    this.httpService.doPost(api,{"tel":this.tel},(result)=>{
        console.log(result);  /*发送到手机的验证码返回方便我们验证*/
        if(result.success){
         
          this.num=10;  /*设置倒计时*/
          this.doTimer();  /*倒计时*/
          this.isShowSend=false;  /*显示倒计时按钮*/  
        }else{
          alert('发送验证码失败');
        }
    })

  }

    //修改密码(点击修改按钮时生效)
  modifyPwd(){
    var data = {
      'mobile':'',
      'pwd':'',
    }
    var api = this.config.apiUrl + '/api/User/edit_Pwd';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
      console.log("成功修改密码!");
      } else {
        console.log(data.errmsg);
      }
    });
  }

  backTo(){
    this.navCtrl.pop();
  }

}
