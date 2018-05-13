import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CutPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'cutPipe',
})
export class CutPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    
    var content = "";
		
		if (value != "") {
		if(value.length < 8 )
			{
			content = value;
			}
		else{
				var shortInput = value.substr(0, 8);
			content = shortInput + "…";
			}
		}

		return content;

  }
}
