//zq

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipeMultiplePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipeMultiple',
})
export class PipeMultiplePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: boolean, ...args) {
var isTrue="";
//alert(value);
if(value==true){
isTrue="推荐";
}else  if(value==false){
  isTrue="不推荐";
}else{
   isTrue="没有";
}

    return isTrue;
  }

}
