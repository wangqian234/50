import { Component } from '@angular/core';

/**
 * Generated class for the LunboComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lunbo',
  templateUrl: 'lunbo.html'
})
export class LunboComponent {

  text: string;

  constructor() {
    console.log('Hello LunboComponent Component');
    this.text = 'Hello World';
  }

}
