import { Component } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';

import { HomePage } from '../home/home';
import { RepairlistPage } from '../repairlist/repairlist';
import { ShoppingPage } from '../shopping/shopping';


import { ShopmalllistPage } from '../shopmalllist/shopmalllist';


import { UserPage } from '../user/user';

import{ PayfeePage } from '../payfee/payfee';

import {TestPage}from '../test/test'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = TestPage;
 // tab1Root = HomePage;
  tab2Root = RepairlistPage;
  tab3Root = ShoppingPage;
  tab4Root=UserPage;

  constructor(public config:ConfigProvider,public http: Http,public storage:StorageProvider) {

  }
}