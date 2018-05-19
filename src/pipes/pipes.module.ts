import { NgModule } from '@angular/core';
import { PipeMultiplePipe } from './pipe-multiple/pipe-multiple';
import { CutPipe } from './cut/cut';
import { CutSPipe } from './cut-s/cut-s';
import { PipeTimePipe } from './pipe-time/pipe-time';
import { PipeMoneyPipe } from './pipe-money/pipe-money';
import {TypePipe}from './type/type';
import { PipeGroupPipe } from './pipe-group/pipe-group';
@NgModule({
	declarations: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeMoneyPipe,
    TypePipe,
    PipeGroupPipe ],
	imports: [],
	exports: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeTimePipe,
    PipeMoneyPipe,
    TypePipe,
    PipeGroupPipe, ]
})
export class PipesModule {
	
}

