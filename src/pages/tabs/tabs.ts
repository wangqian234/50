import { Component } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';

import { HomePage } from '../home/home';
import { RepairlistPage } from '../repairlist/repairlist';
//import { ShoppingPage } from '../shopping/shopping';
import { ShopmalllistPage } from '../shopmalllist/shopmalllist';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RepairlistPage;
  tab3Root = ShopmalllistPage;
  tab4Root=UserPage;

  constructor(public config:ConfigProvider,public http: Http,public storage:StorageProvider) {
    this.config.doDefLogin();
  }
}
