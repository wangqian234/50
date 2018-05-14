import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onlinepayment',
  templateUrl: 'onlinepayment.html',
})
export class OnlinepaymentPage {
  public checked = false;
  public isChencked=false;
  public allprice=0;
  //接收数据list
  public list =[];
  public roomidlist=[];
  pay={
    roomId:'',
    idG:'',
    token:'',   
  };
  onlinepaymentList={
    roomId:''
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider) {
  }

  //主页面加载函数 
  ionViewWillLoad(){
    this.getRem();
    this.getroomId();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlinepaymentPage');
  }

  backTo(){
    this.navCtrl.pop();
  }
   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
  }
  //查询用户绑定的所有房屋
  getroomId(){
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;//怎么知道那个是默认房屋,得到前台显示的房屋
            console.log(this.roomidlist)
          } else if(data.errcode === 40002){
              j--;
              if(j>0){
                this.config.doDefLogin();
                this.getroomId();
          }
      }else{
            alert(data.errmsg)
          }
     })
  }
  //获取房屋费用收取表
  changeRoom(roomid){
    var that=this;
    var api = this.config.apiUrl+'/api/Charge/list_Table?roomId='+roomid;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
       alert(1)
          if(data.errcode===0&&data.errmsg==='OK'){
            this.list= data.list;
          }else{
            alert(data.errmsg);
          }
     })
  }


  
  //结算账单
  gopay(allprice){
    var that=this;
    var api = this.config.apiUrl+'/api/charge/edit_Save?';
     this.http.post(api,this.pay).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            this.roomidlist=data.list;//怎么知道那个是默认房屋
            console.log(this.roomidlist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  //获取选中的数量
  getcheckNum(){
    let sum=0;
    for(let i=0;i<this.list.length;i++){
      if(this.list[i].checked==true){
        sum++;
      }
    }
    return sum;
  }
  //当全选中时，全选按钮也被选中
  changePays(){
    if(this.getcheckNum()==this.list.length){
      this.isChencked=true;
    }else{
      this.isChencked=false;
    }
    this.sumPrice();
  }
  //通过全选按钮进行全选、全消
  checkAll(){
    if(this.isChencked){
      for(let i=0; i<this.list.length;i++){
        this.list[i].checked=false;
      }
    }else{
      for(let i=0;i<this.list.length;i++){
        this.list[i].checked=true;
      }
    }
    this.sumPrice();
  }
  //计算选中的总共多少钱
  sumPrice(){
    var totalprice =0;
    for(let i=0;i<this.list.length;i++){
        if(this.list[i].checked==true){
            totalprice+=this.list[i].price;
        }
    }
    this.allprice=totalprice;
  }

}
