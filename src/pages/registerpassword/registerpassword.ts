import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import $ from 'jquery'
import { HttpServicesProvider } from '../../providers/http-services/http-services';

@IonicPage()
@Component({
  selector: 'page-registerpassword',
  templateUrl: 'registerpassword.html',
})
export class RegisterpasswordPage {

  public num:number ;   /*倒计时的数量*/
  public isShowSend=true;   /*是否显示发送验证码的按钮*/
  public registerinfo = {
    userTel:'',
    userName:'',
    regist:'',
    rpassword:'',
    password:'',
    ckecked:false
  }
  public registerData ={
    mobile:'',
    userName:'',
    code:'',
    userPwd:'',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider,public storage:StorageProvider,
      public config:ConfigProvider,public http: Http) {
  }

  ionViewWillLoad() {
    this.getRem();
  }
  ionViewDidEnter(){
    this.storage.set('tabs','false');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpasswordPage');
  }

  agreeSheet(){
    document.getElementById('background').style.display = "block";  
  }

  closePopup(){
    document.getElementById('background').style.display = "none";
  }

  enSureStop(){
    this.registerinfo.ckecked = true;
    this.closePopup();
  }

  //注册信息发送
  doRegister(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
      if(this.registerinfo.password!=this.registerinfo.rpassword){
        alert('确认密码和密码不一样');
      }else if(this.registerinfo.password.length<6){
        alert('密码长度不能小于6位');
      }else if(this.registerinfo.ckecked == false) {
        alert('请阅读汇生活注册条款')
      }else{
        this.registerData.mobile=this.registerinfo.userTel;
        this.registerData.code=this.registerinfo.regist;
        this.registerData.userName=this.registerinfo.userName;
        this.registerData.userPwd=this.registerinfo.password;
        var api = this.config.apiUrl + '/api/user/register';
        this.http.post(api,this.registerData).map(res => res.json()).subscribe(data =>{
          $(".spinnerbox").fadeOut(200);
          $(".spinner").fadeOut(200);
          if (data.errcode === 0 && data.errmsg === 'OK') {
            this.storage.set('userName',data.model.loginname);
            this.storage.set('password',this.registerinfo.password);
            this.storage.set('token',data.model.token);
            this.storage.set('username1',data.model.username);
            this.navCtrl.popToRoot(); /*回到根页面*/
          } else {
            alert(data.errmsg);
          }
        })
      }
  }

  //发送验证码
  ownRegist(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.registerinfo.userTel))){
      alert('请输入正确的手机号码');
      return;
    }
    var tel = this.registerinfo.userTel
    var data= {
      "mobile": tel
    }
    console.log(JSON.stringify(data))
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

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

    backTo(){
    this.navCtrl.pop();
  }

}


