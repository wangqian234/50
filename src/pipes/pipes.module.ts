import { NgModule } from '@angular/core';
import { PipeMultiplePipe } from './pipe-multiple/pipe-multiple';
import { PipeTimePipe } from './pipe-time/pipe-time';
@NgModule({
	declarations: [PipeMultiplePipe,
    PipeTimePipe],
	imports: [],
	exports: [PipeMultiplePipe,
    PipeTimePipe]
})
export class PipesModule {
	
}

