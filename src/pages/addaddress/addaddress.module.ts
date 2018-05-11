import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddaddressPage } from './addaddress';
//import {MultiPickerModule} from 'ion-multi-picker';

@NgModule({
  declarations: [
    AddaddressPage,
    
  ],
  imports: [
    //MultiPickerModule,
    IonicPageModule.forChild(AddaddressPage),
  ],
})
export class AddaddressPageModule {}
