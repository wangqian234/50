import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

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

  constructor(public navCtrl: NavController, public navParams: NavParams , public httpService:HttpServicesProvider) {
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

}
