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
  }

  doDefLogin(){ //打开APP静默登录,正常流程应该首先检查token是否过期,考虑减少发送请求次数,静默登录
      if(this.storage.get('userName') && this.storage.get('password') && this.storage.get('token')){
        var api= this.apiUrl + '/api/user/login?userName=' + this.storage.get('userName') + 
                  '&userPwd=' + this.storage.get('password');
        this.http.get(api).map(res => res.json()).subscribe(data =>{
          if (data.errcode === 0 && data.errmsg === 'OK') {
            this.storage.set('token',data.model.token);
          }
        });
      }
  }
}