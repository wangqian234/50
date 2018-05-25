import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { LoadingController, Loading } from 'ionic-angular';

//找回密码页
import { RebuildpassPage } from '../rebuildpass/rebuildpass'
//注册页
import { RegisterpasswordPage } from '../registerpassword/registerpassword'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public RebuildpassPage = RebuildpassPage;
  public RegisterpasswordPage = RegisterpasswordPage;
  //定义数据
  public code='';  /*验证码*/
  public isShowSend=true;   /*是否显示发送验证码的按钮*/
  public num=5 ;   /*倒计时的数量*/
  public tel='';

public history='';

  public userinfo={
    userName:'',
    userPwd:''
  }

  public loginNum : boolean;

  constructor(public httpService:HttpServicesProvider,public navCtrl: NavController, public navParams:NavParams ,
  public config:ConfigProvider,public http: Http,public storage:StorageProvider,public loadingCtrl: LoadingController) {
      this.getRem();
      this.history=this.navParams.get('history');
      this.loginNum = true;
  }
//登录触发的函数
  doLogin(){
    console.log(this.userinfo.userName)
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.userinfo.userName))){
      alert('请输入正确的手机号码');
      return;
    }
    if(this.userinfo.userPwd === ""){
      alert('密码不能为空');
      return;
    }
    let loading = this.loadingCtrl.create({
      content: '请稍等...',
	    showBackdrop: true,
    });
    loading.present();
      var api= this.config.apiUrl + '/api/user/login?userName=' + this.userinfo.userName + '&userPwd=' + this.userinfo.userPwd;
      this.http.get(api).map(res => res.json()).subscribe(data =>{
        loading.dismiss();
        if (data.errcode === 0 && data.errmsg === 'OK') {  
          this.storage.set('userName',this.userinfo.userName);
          this.storage.set('password',this.userinfo.userPwd);
          this.storage.set('token',data.model.token);
          this.storage.set('username1',data.model.username);
          console.log(data.model);
          this.navCtrl.pop(); /*回到根页面*/
        } else {
          alert(data.errmsg);
        }
      });
  }

  getLoginNum(){
    this.loginNum = !this.loginNum;
    console.log(this.loginNum)
  }

  goRegisterpasswordPage(){
    // //验证验证码是否成功
    // var api='api/validateCode';
    // this.httpService.doPost(api,{"tel":this.tel,"code":this.code},(result)=>{
    //     console.log(result);  /*发送到手机的验证码返回方便我们验证*/
    //     if(result.success){
    //       //保存验证码
    //       this.storage.set('reg_code',this.code);

    //       //跳转到下一个页面
    //      // this.navCtrl.push(RegisterpasswordPage);
    //     }else{
    //       alert('验证码输入错误');
    //     }
    // })

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
  ownRegist(){
    alert("123")
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.userinfo.userName))){
      alert('请输入正确的手机号码');
      return;
    }
    var tel = this.userinfo.userName
    var data= {
      "mobile": tel
    }
    console.log(JSON.stringify(data))
    var api = this.config.apiUrl + '/api/vcode/register';
    this.http.post(api,data).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.num = 60;
        this.isShowSend = false;
        this.doTimer();  /*倒计时*/
      } else {
        alert(data.errmsg);
      }
    })
  }
//转换大小的单位
  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  backTo(){
    this.navCtrl.pop();
  }

}
