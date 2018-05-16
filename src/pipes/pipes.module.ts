import { NgModule } from '@angular/core';
import { PipeMultiplePipe } from './pipe-multiple/pipe-multiple';
import { CutPipe } from './cut/cut';
import { CutSPipe } from './cut-s/cut-s';
import { PipeTimePipe } from './pipe-time/pipe-time';

@NgModule({
	declarations: [PipeMultiplePipe,
    CutPipe,
    CutSPipe],
	imports: [],
	exports: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeTimePipe,]
})
export class PipesModule {
	
}

