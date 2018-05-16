import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipeMoneyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipeMoney',
})
export class PipeMoneyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var isTrue;
    isTrue = parseInt(value)/10000
    return isTrue;
  }
}
