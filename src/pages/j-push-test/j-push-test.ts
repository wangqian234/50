import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//极光推送
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';
//引入商品详情界面
import { ShopgoodsinfoPage } from '../shopgoodsinfo/shopgoodsinfo';

@Component({
  selector: 'page-j-push-test',
  templateUrl: 'j-push-test.html',
})
export class JPushTestPage {

  //极光推送
  public registrationId: string;

  devicePlatform: string;
  sequence: number = 0;

  ShopgoodsinfoPage = ShopgoodsinfoPage;

  tagResultHandler = function(result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
  };

  aliasResultHandler = function(result) {
    var sequence: number = result.sequence;
    var alias: string = result.alias;
  };

  errorHandler = function(err) {
    var sequence: number = err.sequence;
    var code = err.code;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public jpush: JPush, device: Device) {
    this.devicePlatform = device.platform;

    document.addEventListener('jpush.receiveNotification', (event: any) => {
      var content;
      if (this.devicePlatform == 'Android') {
        content = event.alert;
      } else {
        content = event.aps.alert;
      }
    }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      var content;
      if (this.devicePlatform == 'Android') {
        content = event.alert;
      } else {  // iOS
        if (event.aps == undefined) { // 本地通知
          content = event.content;
        } else {  // APNS
          content = event.aps.alert;
        }
      }
      alert(event.extras.type)
      alert(event.extras.id)
      if(event.extras.type != undefined && event.extras.type == "shop"){
        if(event.extras.id != undefined){
          var id = event.extras.id;
          this.navCtrl.push(ShopgoodsinfoPage, {
            id: id
          })
        }
      }
    }, false);

    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
      var content;
      if (this.devicePlatform == 'Android') {
      } else {
        content = event.content;
      }
    }, false);
  }

  getRegistrationID() {
    this.jpush.getRegistrationID()
      .then(rId => {
        this.registrationId = rId;
      });
  }

  setTags() {
    this.jpush.setTags({ sequence: this.sequence++, tags: ['Tag1', 'Tag2']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  addTags() {
    this.jpush.addTags({ sequence: this.sequence++, tags: ['Tag3', 'Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  checkTagBindState() {
    this.jpush.checkTagBindState({ sequence: this.sequence++, tag: 'Tag1' })
      .then(result => {
        var sequence = result.sequence;
        var tag = result.tag;
        var isBind = result.isBind;
        alert('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
      }).catch(this.errorHandler);
  }

  deleteTags() {
    this.jpush.deleteTags({ sequence: this.sequence++, tags: ['Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  getAllTags() {
    this.jpush.getAllTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  cleanTags() {
    this.jpush.cleanTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  setAlias() {
    this.jpush.setAlias({ sequence: this.sequence++, alias: 'TestAlias' })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  getAlias() {
    this.jpush.getAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  deleteAlias() {
    this.jpush.deleteAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  addLocalNotification() { //添加本地消息
    if (this.devicePlatform == 'Android') {
      this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    } else {
      this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JPushTestPage');
  }

}
