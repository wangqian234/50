import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageProvider } from '../../providers/storage/storage';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  //api请求地址
  public apiUrl="http://test.api.gyhsh.cn";
  public enSureLogin:boolean = true;

  constructor(public http: Http,public storage:StorageProvider) {
    console.log('Hello ConfigProvider Provider');
    if(!this.storage.get('token')){
      this.enSureLogin = false;
    }
  }

  doDefLogin(){ //打开APP静默登录,正常流程应该首先检查token是否过期,考虑减少发送请求次数,静默登录
      if(this.storage.get('username') && this.storage.get('password')){
        var api= this.apiUrl + '/api/user/login?userName=' + this.storage.get('username') + 
                  '&userPwd=' + this.storage.get('password');
        this.http.get(api).map(res => res.json()).subscribe(data =>{
          if (data.errcode === 0 && data.errmsg === 'OK') {
            this.storage.set('token',data.model.token);
          }
        });
      }
  }


}
