import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressinfoPage } from './addressinfo';

@NgModule({
  declarations: [
    AddressinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressinfoPage),
  ],
})
export class AddressinfoPageModule {}
