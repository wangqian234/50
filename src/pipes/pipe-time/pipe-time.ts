import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipeTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipeTime',
})
export class PipeTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.replace("T", " ");
  }
}
