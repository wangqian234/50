import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipeRelationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipeRelation',
})
export class PipeRelationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
   var isTrue="";
    if(value=="0"){
      isTrue="未审核";
    }else  if(value=='1'){
      isTrue="审核通过";
    }else if(value=='2'){
      isTrue="未通过审核";
    }

        return isTrue;
      }
}
