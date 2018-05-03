import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { StorageProvider } from '../../providers/storage/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//找回密码页
import { RebuildpassPage } from '../rebuildpass/rebuildpass'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public RebuildpassPage = RebuildpassPage;

  //定义数据
  public code='';  /*验证码*/
  public isShowSend=true;   /*是否显示发送验证码的按钮*/
  public num=5 ;   /*倒计时的数量*/
  public tel='';

public history='';

  public userinfo={
    username:'',
    password:''
  }

  public loginNum : boolean;

  constructor(public navCtrl: NavController, public navParams:NavParams ,public httpService:HttpServicesProvider,public storage:StorageProvider) {

      this.history=this.navParams.get('history');
      this.loginNum = true;
  }

  doLogin(){
    //1.this.userinfo 表单信息

    //2.请求接口 完成登录功能

    // console.log(this.userinfo);   //{username: "3214324", password: "324"}

    if(this.userinfo.username.length<6){
      alert('用户名不合法');
    }else{

        var api='api/doLogin';

        this.httpService.doPost(api,this.userinfo,(data)=>{

          // console.log(data);

          if(data.success){//登录成功
              this.storage.set('userinfo',data.userinfo[0]);

              if(this.history=='order'){
             
                this.navCtrl.pop();  /*返回上一个页面*/
              }else{
                this.navCtrl.popToRoot(); /*回到根页面*/
                
              }
            
          }else{
            alert(data.message);
          }

        })
     }
  }

  getLoginNum(){
    this.loginNum = !this.loginNum;
    console.log(this.loginNum)
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
          this.storage.set('reg_code',this.code);

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
