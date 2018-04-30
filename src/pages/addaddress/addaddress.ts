import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 //工具的服务
import { ToolsProvider } from '../../providers/tools/tools';

//请求数据
import { HttpServicesProvider } from '../../providers/http-services/http-services';



@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {


  public addressList={
    name:'',
    phone:'',
    address:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public tools:ToolsProvider,public httpService:HttpServicesProvider) {

  }

  ionViewWillEnter(){
    if(this.navParams.get('item')){
      this.addressList=this.navParams.get('item');
      console.log("wang456"+this.addressList);
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddaddressPage');
  }
  
  addAddress(){

    if(this.addressList.name!=''||this.addressList.phone!=''||this.addressList.address!=''){
        //获取表单的内容
        let unserinfo=this.tools.getUserInfo();

        let json={
          uid:unserinfo._id,
          salt:unserinfo.salt,
          name:this.addressList.name,
          phone:this.addressList.phone,
          address:this.addressList.address
        }

        let sign=this.tools.sign(json); /*生成签名*/

        var  api='api/addAddress';
        this.httpService.doPost(api,{
          uid:unserinfo._id,
          sign:sign,
          name:this.addressList.name,
          phone:this.addressList.phone,
          address:this.addressList.address
        },(data)=>{
          // console.log(data); 
          if(data.success){/*增加成功 返回到地址列表*/
              this.navCtrl.pop();
          }else{
            alert(data.message)
          }
        })

    }else{      
         alert('收货地址不对');
    }
      

  }


  
}
