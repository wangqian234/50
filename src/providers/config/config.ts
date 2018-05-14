import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageProvider } from '../../providers/storage/storage';

@Injectable()
export class ConfigProvider {

  //api请求地址
  public apiUrl="http://test.api.gyhsh.cn";

  constructor(public http: Http,public storage:StorageProvider) {
    console.log('Hello ConfigProvider Provider');
    this.storage.set("token","262A029E320BF294558636701C9D3123E7FEEBF0C635FFB2D1F5ADF804CAFCFA498443683769575C1555BF7F8D1D0823E530923710D32DC44FF3B1A7AADE6E1DE287C8F3A0CA52F9E273A83453172C4FA7B5643EAE6B25203898A2705D40DAC6405879E367C38BD827B2E944B00DB2C4623DBEF40635D6F2F96BA94086293850B4DC2F2BEC194069DE5943AFD9571A6A7D8B531DCD1017938F061D12B6B93C6ACB09B3170D499199631B3F76C376BCC9")
  }

  doDefLogin(){ //打开APP静默登录,正常流程应该首先检查token是否过期,考虑减少发送请求次数,静默登录
    //   if(this.storage.get('userName') && this.storage.get('password') && this.storage.get('token')){
    //     var api= this.apiUrl + '/api/user/login?userName=' + this.storage.get('userName') + 
    //               '&userPwd=' + this.storage.get('password');
    //     this.http.get(api).map(res => res.json()).subscribe(data =>{
    //       if (data.errcode === 0 && data.errmsg === 'OK') {
    //         this.storage.set('token',data.model.token);
    //       }
    //     });
    //   }
  }
}