import { Component } from '@angular/core';

/**
 * Generated class for the RevaluateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'revaluate',
  templateUrl: 'revaluate.html'
})
export class RevaluateComponent {

  text: string;

  constructor() {
    console.log('Hello RevaluateComponent Component');
    this.text = 'Hello World';
  }

}
