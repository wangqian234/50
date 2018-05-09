import { Component } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';

//import { HomePage } from '../home/home';
import { RepairlistPage } from '../repairlist/repairlist';
import { ShoppingPage } from '../shopping/shopping';
import { UserPage } from '../user/user';

import { CartPage } from '../cart/cart';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CartPage;
  tab2Root = RepairlistPage;
  tab3Root = ShoppingPage;
  tab4Root = UserPage;

  constructor(public config:ConfigProvider,public http: Http,public storage:StorageProvider) {
  }
}