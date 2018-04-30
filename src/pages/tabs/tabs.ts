import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RepairlistPage } from '../repairlist/repairlist';
import { ShoppingPage } from '../shopping/shopping';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RepairlistPage;
  tab3Root = ShoppingPage;
  tab4Root=UserPage;

  constructor() {

  }
}
