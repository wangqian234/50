import { NgModule } from '@angular/core';
import { PipeMultiplePipe } from './pipe-multiple/pipe-multiple';
import { CutPipe } from './cut/cut';
import { CutSPipe } from './cut-s/cut-s';
import { PipeTimePipe } from './pipe-time/pipe-time';
import { PipeMoneyPipe } from './pipe-money/pipe-money';

@NgModule({
	declarations: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeMoneyPipe],
	imports: [],
	exports: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeTimePipe,
    PipeMoneyPipe,]
})
export class PipesModule {
	
}

