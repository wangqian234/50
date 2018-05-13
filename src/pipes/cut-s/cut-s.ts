import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CutSPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'cutSPipe',
})
export class CutSPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var content = "";
		
		if (value != "") {
		if(value.length < 12 )
			{
			content = value;
			}
		else{
				var shortInput = value.substr(0, 12);
			content = shortInput + "…";
			}
		}

		return content;
  }
}
