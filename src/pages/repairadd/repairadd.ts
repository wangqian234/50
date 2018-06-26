import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,ActionSheetController } from 'ionic-angular';
import { RepairlistPage } from '../repairlist/repairlist';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
//config.ts
import { ConfigProvider } from '../../providers/config/config';
import {Http,Jsonp}from '@angular/http';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import $ from 'jquery';
import{BindroomPage}from '../bindroom/bindroom'
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
//登录页面
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-repairadd',
  templateUrl: 'repairadd.html',
})
export class RepairaddPage {
  public fileUrl;
  public tempName = '';
  public fileName = '';
  public imgList = [];
  public guid;
  public selecttype='';
  public defRoomId;    /**默认房屋id */
  public iof_defList=[];  /*默认房屋列表 */
  public repairLimit:any = [];
  public roomidlist=[];
  public projectlist=[];
  public stypelist=[];
  public repairlist=[];
  public addlist={
    type:'55',
    category:'55',
    roomId:'',
    projectId:'',
    memo:'',
    mediaIds:'',
    token:'',
    guid:'',
  }
  public guidFile;
  //public roomid;
  public roomId
  public LoginPage = LoginPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public jsonp:Jsonp ,
  public httpService:HttpServicesProvider ,/*引用服务*/public config:ConfigProvider ,public storage :StorageProvider,
  public loadingCtrl: LoadingController,public toastCtrl:ToastController,public camera: Camera, public imagePicker: ImagePicker, 
  public actionSheetCtrl: ActionSheetController, private base64: Base64,private file:File) {
      if(this.storage.get('roomId')){
        this.defRoomId=this.storage.get('roomId')
        this.roomId= this.defRoomId;
        this.getroomId();
      }
  }

  ionViewDidLoad(){
    if(this.navParams.get("type")){
      this.addlist.type=this.navParams.get("type")
      this.changeType();
    }
      //确认登录状态
      if(this.storage.get('token')){

      } else {
        this.navCtrl.push(LoginPage);
      }
    this.getRem();
  }

  ionViewDidEnter(){
    this.newGUID();
    this.storage.set('tabs','false');
  }

  httptest(){
    console.log(this.repairLimit.sort1);
    console.log(this.repairLimit.sort2);
    console.log(this.repairLimit.add);
    this.navCtrl.push(RepairlistPage);
  }
  backToList(){
    this.navCtrl.pop();
  }
  //查询用户绑定的所有房屋
  getroomId(){   
    var that=this;
    var j=3;
    var api = this.config.apiUrl+'/api/vuserroom/dw?token='+this.storage.get('token');
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.roomidlist=data.list; 
            console.log(that.roomidlist) 
          }else if (data.errcode===4002){
            j--;
            this.config.doDefLogin();
            this.getroomId();
          } else{
            alert(data.errmsg)
          }
     })
  }
  //查询所有小区
  getproject(){
    var that=this;
    var api = this.config.apiUrl+'/api/project/dw';
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.projectlist=data.list;
            console.log(this.projectlist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  changeRoom(roomid){
    if(roomid === "add"){
         this.navCtrl.push(BindroomPage);
    } 
  }
  changeType(){
   if(this.addlist.type == "4"){
        $('#aa').css('display','block');
       this.getproject();
    }else{
        $('#aa').css('display','none');
    }
    this.getcategory();
  }
  //根据工单类型查询类别
  getcategory(){
    var that=this;
    var api = this.config.apiUrl+'/api/category/dw?type='+this.addlist.type;
     this.http.get(api).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){
            that.stypelist=data.list;
            console.log(this.stypelist)
          }else{
            alert(data.errmsg)
          }
     })
  }
  //添加工单
  showPopup(){
    if(this.addlist.type==="4"){
      this.addlist.roomId="0"
    }else{
      this.addlist.projectId="0"  
      this.addlist.roomId=this.roomId;    
    }
    this.addlist.token=this.storage.get('token');
    this.addlist.guid = this.guid;
    this.addlist.mediaIds = this.fileName+'〢'+this.tempName;
    var api = this.config.apiUrl+'/api/list/add?';
     this.http.post(api,this.addlist).map(res => res.json()).subscribe(data =>{
          if(data.errcode===0&&data.errmsg==='OK'){ 
            let toast = this.toastCtrl.create({
            message: '添加工单成功',
            duration: 2000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
           console.log('Dismissed toast');
          });
        toast.present();
              console.log(data)
              this.navCtrl.pop();
          }else{
            alert("添加工单失败")
          }
     })
  }

   getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }

  //从相册中选择
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: 0,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,  //媒体类型，默认PICTURE->照片，还有VIDEO等可以选
      sourceType: 0,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetWidth: 300,
      targetHeight: 300
    }
    this.camera.getPicture(options).then((results) => {
        var that = this;
        this.imgList.push('data:image/png;base64,'+results);
        $.ajax({
        type: "post",
        url: "http://test.api.gyhsh.cn/api/files/upload_base64_temp",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: { "file": results, "file_guid": that.guid, "file_name": "QQ图片20180403181140.jpg" },
        success: function (data) {
         //this.imgList.push("http://mp.gyhsh.cn" + data.model.file_url);
         if(that.fileName.length==0){
           that.fileName = data.model.file_name;
         }else{
            that.fileName +="〡"+ data.model.file_name;
         }    
        
         that.fileUrl= data.model.file_url;
         var bb = that.fileUrl.split('/');
         if(that.tempName.length == 0){
           that.tempName = bb[4];
         }else{
             that.tempName += '〡'+ bb[4];
         }
        },
        error: function (result) {
          alert("上传照片失败" + result);
        }
      });   
        }, (err) => {
          alert("拍照失败")
        });



    // this.imagePicker.getPictures(options).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     alert(results[i]);
    //     var myReader: FileReader = new FileReader();
    //     var img = document.createElement('img');
    //     img.src = results[i];
    //     img.onload = function () {
    //       var canvas = document.createElement("canvas");
    //       canvas.width = img.width;
    //       canvas.height = img.height;
    //       alert("进来了");
    //       var ctx = canvas.getContext("2d");
    //       ctx.drawImage(img, 0, 0, img.width, img.height);

    //       var dataURL = canvas.toDataURL("image/png");
    //       alert(dataURL);
    //     }

    //     // alert(results[i]);
    //     this.base64.encodeFile(results[i]).then((base64File: string) => {
    //       alert("进来了");
    //       alert(base64File);
    //     }, (err) => {
    //       alert(err);
    //     });
    //     //界面展示

    //     this.imgList.push('data:image/png;base64,' + results[i]);
    //   }
    // }, (err) => { });
  }


  getBase64Image(img) {
    alert(img);
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    alert("进来了");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL
    // return dataURL.replace("data:image/png;base64,", "");
  }

  //手机拍照
  photos() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: 0,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,  //媒体类型，默认PICTURE->照片，还有VIDEO等可以选
      sourceType: 1,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetWidth: 300,
      targetHeight: 300,
    }

    this.camera.getPicture(options).then((imageData) => {
      var that = this;
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      //测试1
      this.imgList.push('data:image/png;base64,' + imageData);
      $.ajax({
        type: "post",
        url: "http://test.api.gyhsh.cn/api/files/upload_base64_temp",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: { "file": imageData, "file_guid": that.guid, "file_name": "QQ图片20180403181140.jpg" },
        success: function (data) {
         //this.imgList.push("http://mp.gyhsh.cn" + data.model.file_url);
         if(that.fileName.length==0){
           that.fileName = data.model.file_name;
         }else{
            that.fileName +="〡"+ data.model.file_name;
         }    
         that.fileUrl= data.model.file_url;
         var bb = that.fileUrl.split('/');
         if(that.tempName.length == 0){
           that.tempName = bb[4];
         }else{
             that.tempName += '〡'+ bb[4];
         }
        },
        error: function (result) {
          alert("上传照片失败" + result);
        }
      });

    }, (err) => {
      alert("拍照失败");
      // Handle error
    });
  }

    //显示选择框
  showPicActionSheet() {
    this.useASComponent();
  }

  // 使用ionic中的ActionSheet组件
  private useASComponent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.photos();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

        //生成guid
      date = new Date();
      newGUID () {
      this.date = new Date();
      var guidStr = '';
      var aa = this.getGUIDDate();
      var bb = this.getGUIDTime();
      var sexadecimalDate = this.hexadecimal(aa, 16);
      var sexadecimalTime = this.hexadecimal(bb, 16);
      for (var i = 0; i < 9; i++) {
      guidStr += Math.floor(Math.random() * 16).toString(16);
      }
      guidStr += sexadecimalDate;
      guidStr += sexadecimalTime;
      while (guidStr.length < 32) {
      guidStr += Math.floor(Math.random() * 16).toString(16);
      }
      return this.formatGUID(guidStr);
      }
      getGUIDDate() {
      return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
      }
      getGUIDTime () {
      return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(this.date.getMilliseconds()/10);
      }
      addZero (num) {
      if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
      return '0' + Math.floor(num);
      } else {
      return num.toString();
      }
      }
      hexadecimal(num, x) {
      return parseInt(num.toString()).toString(x);
      }
      formatGUID(guidStr) {
      var str1 = guidStr.slice(0, 8) + '-',
      str2 = guidStr.slice(8, 12) + '-',
      str3 = guidStr.slice(12, 16) + '-',
      str4 = guidStr.slice(16, 20) + '-',
      str5 = guidStr.slice(20);
      this.guid = str1 + str2 + str3 + str4 + str5;
      console.log(this.guid);
      return str1 + str2 + str3 + str4 + str5;
      }

}
