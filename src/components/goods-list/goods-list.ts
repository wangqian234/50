import { Component } from '@angular/core';

/**
 * Generated class for the GoodsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'goods-list',
  templateUrl: 'goods-list.html'
})
export class GoodsListComponent {

  text: string;

  constructor() {
    console.log('Hello GoodsListComponent Component');
    this.text = 'Hello World';
  }

}
