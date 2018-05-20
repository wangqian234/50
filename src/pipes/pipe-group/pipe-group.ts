import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipeGroupPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipeGroup',
})
export class PipeGroupPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var isTrue="";
    
    if (value=='0'){
      isTrue="待开团";
    } else if (value=='1'){
      isTrue="进行中";
    } else if (value=='2'){
      isTrue="组团成功";
    } else if (value=='3'){
      isTrue="组团失败";
    }

    return isTrue;
  }
}
