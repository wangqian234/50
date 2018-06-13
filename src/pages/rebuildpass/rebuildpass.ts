import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import $ from 'jquery'
//引入UserPage
import { UserPage } from '../user/user';

@Component({
  selector: 'page-rebuildpass',
  templateUrl: 'rebuildpass.html',
})
export class RebuildpassPage {

  public UserPage = UserPage;

  // verifyCode: any;

  public tel='';  /*自己的电话变量*/
  public mphone = '';

  public code='';  /*验证码*/
  public isShowSend=true;   /*是否显示发送验证码的按钮*/
  public num=60 ;   /*倒计时的数量*/
  public modifyInfo = {
      'mobile':'',
      'pwd':'',
      'code':'',
    }

  constructor(public navCtrl: NavController, public navParams: NavParams , public httpService:HttpServicesProvider,
  public config:ConfigProvider,public http: Http, public storage: StorageProvider,) {
   
    this.tel=this.storage.get('userName');
    this.mphone = this.tel.substr(0, 3) + '****' + this.tel.substr(7);   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RebuildpassPage');
  }

  ionViewDidEnter(){
    //this.navCtrl.push(UserPage);
     this.storage.set('tabs','false');
  }

//显示倒计时间
  ownRegist() {
    this.num = 60;
    this.isShowSend = false;
    this.doTimer();  /*倒计时*/
    this.getCode(); /*为手机发送验证码*/
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
  getCode(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
   var data = {
     "mobile": this.tel
   }; 
    var api = this.config.apiUrl + '/api/vcode/register';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.num = 60;
        this.isShowSend = false;
        this.doTimer();  /*倒计时*/
      } else {
        alert(data.errmsg);
      }
    })
  }

  //   //验证验证码是否成功  
  //   goRegisterpasswordPage(){ //'/api/VCode/Register'
  //     var api='/api/User/Register';
  //     this.httpService.doPost(api,{"tel":this.tel,"code":this.code},(result)=>{
  //       console.log(result);  /*发送到手机的验证码返回方便我们验证*/
  //       if(result.success){
  //         console.log('pg1');
  //         //保存验证码
  //        // this.storage.set('reg_code',this.code);

  //         //跳转到下一个页面
  //        // this.navCtrl.push(RegisterpasswordPage);
  //       }else{
  //         alert('验证码输入错误');
  //       }
  //   })
  // }

  //修改密码(点击修改按钮时生效)
  modifyPwd(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var modifyInfo = {
      'mobile':this.tel,
      'pwd':this.modifyInfo.pwd,
      'code':this.modifyInfo.code,
    }
    var api = this.config.apiUrl + '/api/User/edit_Pwd';
    console.log(modifyInfo);
    this.http.post(api,modifyInfo).map(res => res.json()).subscribe(data =>{
      $(".spinnerbox").fadeOut(200);
      $(".spinner").fadeOut(200);
      if (data.errcode === 0 && data.errmsg === 'OK') {
      console.log("成功修改密码!");
      this.navCtrl.pop(UserPage);
      } else {
        console.log(data.errmsg);
      }
    });
  }

  backTo(){
    this.navCtrl.pop();
  }

//   //pg添加验证码方法
//   //验证码倒计时  
//     verifyCode: any = {  
//         verifyCodeTips: "获取验证码",  
//         countdown: 120,//总共时间  
//         disable: true  
//     }  
//  //倒计时  
//     settime() {  
//         if (this.verifyCode.countdown == 0) {  
//             debugger  
//             this.verifyCode.verifyCodeTips = "获取验证码";  
//             this.verifyCode.disable = true;  
//             return;  
//         } else {  
//             this.verifyCode.countdown--;  
//         }  
//         setTimeout(() => {  
//             this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";  
//                 this.settime();  
//         }, 1000);  
//     } 

}
