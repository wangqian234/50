//whm
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
//StorageProvider
import { StorageProvider } from '../../providers/storage/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  public gaohaile;
public list = [];
public alist = [];
  public aa =this.config.apiUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public config: ConfigProvider,public storage:StorageProvider,private device: Device, 
  private camera: Camera, private transfer: FileTransfer,
    private file: File) {
  }
ionViewWillLoad() {//钩子函数，将要进入页面的时候触发
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 120) + 'px';
    var api = this.aa +'/api/goods/list?curCityCode=4403';
    this.http.get(api).map(res => res.json()).subscribe(data =>{
      if(data.errcode === 0 && data.errmsg === 'OK'){
        this.list= data.list;
        console.log(data);
      }else{
        alert(data.errmsg);
      }
    })

  }
  ionViewDidLoad() {
  
  }

  // // zq  paizhao
  // doCameraUpload() {
  //   alert(1)
  //   const options: CameraOptions = {
  //     quality: 100, //图片质量
  //     destinationType: this.camera.DestinationType.FILE_URI, /*返回的类型*/
  //     encodingType: this.camera.EncodingType.JPEG,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     // mediaType: this.camera.MediaType.PICTURE,
  //     allowEdit: true,
  //     targetWidth: 300, /*宽度高度要设置*/
  //     targetHeight: 300
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.gaohaile=imageData;
  //     alert(imageData);
  //     // 返回拍照的地址
  //     this.doUpload(imageData);
  //   }, (err) => {
  //     // Handle error
  //   });
  // }


  // doUpload(src) {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //     fileKey: 'file',
  //     fileName: 'name.jpg',
  //     mimeType: 'image/jpeg',
  //     httpMethod: "POST",
  //     params: {
  //       File_Guid: "633b40a1-0c5d-4053-86dc-4edbfe60def9",
  //       Tabs: 1
  //     } /*附带的一些信息*/
  //     // headers: {}
  //   }
  //   var api='http://39.108.159.135/imgupload' ;

  //   // var api = 'http://test.api.gyhsh.cn/api/files/Upload_SRQ 


  //   fileTransfer.upload(src, encodeURI(api), options)
  //     .then((data) => {
  //       alert("success");
  //       alert(JSON.stringify(data));
  //     }, (err) => {
  //       // error
  //       alert('err');
  //       alert(JSON.stringify(err));
  //     })
  // }




}


