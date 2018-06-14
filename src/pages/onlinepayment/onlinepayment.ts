import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import $ from 'jquery';
//绑定房屋
import { BindroomPage } from '../bindroom/bindroom';
//登录页面
import { LoginPage } from '../login/login';
import {PaymentPage} from '../payment/payment'
@Component({
  selector: 'page-onlinepayment',
  templateUrl: 'onlinepayment.html',
})
export class OnlinepaymentPage {
  public model=[];
  public cip;
  public saveRoomId;
  public isChencked=false;
  public allprice = 0.0 ;
  //接收数据list
  public list =[];
  public roomidlist=[];
  public iof_defList=[];
  public defRoomId='';
  public roomid;
  public LoginPage = LoginPage;
  dest = [];
  checkNum = 0;
  pay={
    roomId:'',
    idG:'',
    token:'', 
    tags:'android',
    createip:'',
    act:'House',
  };
  onlinepaymentList={
    roomId:''
  }
  public outTradeNo;
  public tongtong;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
    
    //   if(this.navParams.get('item')){
    //   this.defRoomId=this.navParams.get('item');
    //   this.roomid=this.defRoomId;
    //   this.getroomId();
    //   this.getPayList();
    // }else {
    //   if(this.storage.get('roomId')){
    //   this.defRoomId=this.storage.get('roomId');
    //   this.roomid=this.defRoomId;
    //   this.getroomId();
    //   this.getPayList();
    // }
    // }
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
    //确认登录状态
    if(this.storage.get('token')){

    } else {
    this.navCtrl.push(LoginPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlinepaymentPage');
  }

  ionViewDidEnter() {
    if(this.navParams.get('item')){
      this.defRoomId=this.navParams.get('item');
      this.roomid=this.defRoomId;
      this.getroomId();
      this.getPayList();
    }else {
      if(this.storage.get('roomId')){
      this.defRoomId=this.storage.get('roomId');
      this.roomid=this.defRoomId;
      this.getroomId();
      this.getPayList();
    }
    }
    this.storage.set('tabs','false');
    this.getTotal();
  }

ionViewWillEnter(){
    //this.appearSome();
}
  backTo(){
    this.navCtrl.pop();
  }
   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  changeRoom(){
    if(this.roomid==="add"){
      this.navCtrl.push(BindroomPage);
    }else{
      this.getPayList();
    }
  }
   //查询用户绑定的所有房屋
  getroomId(){   
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeOut(200);
       $(".spinner").fadeOut(200);
          if(data.errcode===0&&data.errmsg==='OK'){
            that.roomidlist=data.list;  
          }else if (data.errcode===4002){
            j--;
            this.config.doDefLogin();
            this.getroomId();
          } else{
            alert(data.errmsg)
          }
     })
  }
  //获取房屋费用收取表
  getPayList(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    var that=this;
    var api = this.config.apiUrl+'/api/Charge/list_Table?roomId='+this.roomid;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeOut(200);
       $(".spinner").fadeOut(200);
          if(data.errcode===0&&data.errmsg==='OK'){
            that.list= data.list;

            var map = {};
            that.dest = [];
            for(var i = 0; i < that.list.length; i++){
                var ai = that.list[i];
                if(!map[ai.date]){
                    that.dest.push({
                        date: ai.date,
                        data: [ai]
                    });
                    map[ai.date] = ai;
                }else{
                    for(var j = 0; j < that.dest.length; j++){
                        var dj = that.dest[j];
                        if(dj.date == ai.date){
                            dj.data.push(ai);
                            break;
                        }
                    }
                }
            }
            
            for(var j = 0; j < that.dest.length; j++){
              var total = 0;
              for(var k = 0; k < that.dest[j].data.length; k++){
                total = total + that.dest[j].data[k].price;
              }
              that.dest[j].totalNum = total.toFixed(2);
            }
            console.log(that.dest)
          }else{
            alert(data.errmsg);
          }
     })
  }
  appearSome(){
    // $(".user_titlediv").click(function(){
    //   if($(this).next('div').css("display") == "none"){
    //     $(this).find("img").css("transform","rotate(0deg)");
    //     $(this).next('div').css("display","block");
    //   } else {
    //     $(this).next('div').css("display","none");
    //     $(this).find("img").css("transform","rotate(270deg)")
    //   }
    // })

      if($(".otherUser_content_con").css("display") == "none"){
        $(".little_img").css("transform","rotate(0deg)");
        $(".otherUser_content_con").css("display","block");
      } else {
        $(".otherUser_content_con").css("display","none");
        $(".little_img").css("transform","rotate(270deg)")
      }

  }

  //结算账单
  gopay(){
    $(".spinnerbox").fadeIn(200);
    $(".spinner").fadeIn(200);
    this.pay.createip=this.cip;
    this.pay.roomId=this.roomid;
    this.pay.token=this.storage.get('token');
    var payMouth = []
    for(let i=0;i<this.dest.length;i++){
      if(this.dest[i].checked==true){
          for(let j=0;j<this.dest[i].data.length;j++){
            var a =  this.dest[i].data[j].Sort.toString();
            var bb =  this.dest[i].data[j].id.toString();
            var aa = a+bb;
            payMouth.push(aa);
          }

      }
    }
    this.pay.idG=payMouth.join(",")
    console.log(this.pay)
    var api = this.config.apiUrl+'/api/charge/payment?';
     this.http.post(api,this.pay).map(res => res.json()).subscribe(data =>{
       $(".spinnerbox").fadeOut(200);
       $(".spinner").fadeOut(200);
          if(data.errcode===0 ){
            this.outTradeNo = data.errmsg;
            this.model = data.model.mweb_url;
            console.log(data)
           this.goWeixiPay();
          }else{
            alert(data.errmsg+"支付失败")
          }
     })
  }

    //跳转到微信支付页面
  goWeixiPay(){
    //console.log(this.payMentModel.mweb_url)
    this.tongtong = this.model + "&referer="+"gyhsh.cn"
    window.location.assign(this.tongtong)
   // location.href = this.payMentModel.mweb_url;
  }
  //跳转支付页面
  gopayMent(outTradeNo,model,allprice,roomid){
    this.navCtrl.push(PaymentPage,{outTradeNo:outTradeNo,model:model,allprice:allprice,roomid:roomid})
  }



//   webview.setWebViewClient(new WebViewClient() {
//     public boolean shouldOverrideUrlLoading(WebView view, String url) {
//         if (url.startsWith("weixin://wap/pay?")) {
//             Intent intent = new Intent();
//             intent.setAction(Intent.ACTION_VIEW);
//             intent.setData(Uri.parse(url));
//             startActivity(intent);
//             return true;
//         }else if (url.startsWith("tel:")) {//H5打开电话
//             Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
//             WebActivity.this.startActivity(intent);
//         } else {
//             //H5微信支付要用，不然说"商家参数格式有误"
//             Map<String, String> extraHeaders = new HashMap<String, String>();
//             extraHeaders.put("Referer", "");//商户申请H5时提交的授权域名
//             view.loadUrl(url, extraHeaders);
//         }
//         return true;
//     }
// });

     //微信查询接口
   checkPayment(){
     var api = this.config.apiUrl + '/api/weixinpay/queryorder?out_trade_no='+this.outTradeNo;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       if(data.errmsg === 'OK'){
          alert("支付成功")
       }else{
         alert(data.errmsg)
       }
     })
   }
    clickmeToOut(){
      if(this.allprice == 0){
        alert("请选择缴费选项")
        return;
      }
      $("#enSureMon").fadeIn(200)
    }
    clickmeToIn(){
      $("#enSureMon").css("display","none")
    }
        clickme(){
          var that = this;
          $.ajax({
              url: 'http://freegeoip.net/json/',
              success: function(data){
                alert(data.ip)
                that.cip = data.ip;
                that.gopay();
              },
              type: 'get',
              dataType: 'JSON'
          });
      }

  getTotal(){
    var that = this;
    $("input:checkbox").change(function() {
        if ($(this).is(':checked')) {
          that.checkNum++;
        } else {
          that.checkNum--;
        }

        if(that.checkNum == that.dest.length){
          that.isChencked=true;
        }else{
          that.isChencked=false;
        }
        that.sumPrice();
    });
  }

  //通过全选按钮进行全选、全消
  checkAll(){
    if(this.isChencked){
      for(let i=0; i<this.dest.length;i++){
        this.dest[i].checked=false;
      }
      this.isChencked=false;
    }else{
      for(let i=0;i<this.dest.length;i++){
        this.dest[i].checked=true;
      }
      this.isChencked=true;
    }
    this.sumPrice();
  }
  //计算选中的总共多少钱
  sumPrice(){
    var totalprice = 0;
    for(let i=0;i<this.dest.length;i++){
      if(this.dest[i].checked==true){
        totalprice = totalprice + parseFloat(this.dest[i].totalNum);
      }
    }
      this.allprice = parseFloat(totalprice.toFixed(2));
  }
  // //获取ip
  // getClientIp(){
  //   $cip = "unknown";
  //   if($_SERVER['REMOTE_ADDR']){
  //     $cip = $_SERVER['REMOTE_ADDR'];
  //   }else if(getenv("REMOTE_ADDR")){
  //     $cip = getenv("REMOTE_ADDR")
  //   }
  //     return $ip
  // }

  //下拉刷新
 doRefresh(refresher) {
    console.log('刷新开始', refresher);
      setTimeout(() => { 
        this.getPayList();
      //   this.items = [];
      //   for (var i = 0; i < 30; i++) {
      //    this.items.push( this.items.length );
      //  }
       console.log('刷新结束');
       refresher.complete();
     }, 2000);
 }

}
