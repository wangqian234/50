import { NgModule } from '@angular/core';
import { PipeMultiplePipe } from './pipe-multiple/pipe-multiple';
import { CutPipe } from './cut/cut';
import { CutSPipe } from './cut-s/cut-s';
import { PipeTimePipe } from './pipe-time/pipe-time';
import { PipeMoneyPipe } from './pipe-money/pipe-money';
import {TypePipe}from './type/type';
import { PipeGroupPipe } from './pipe-group/pipe-group';
import { PipeRelationPipe } from './pipe-relation/pipe-relation';
@NgModule({
	declarations: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeMoneyPipe,
    TypePipe,
    PipeGroupPipe,
    PipeRelationPipe ],
	imports: [],
	exports: [PipeMultiplePipe,
    CutPipe,
    CutSPipe,
    PipeTimePipe,
    PipeMoneyPipe,
    TypePipe,
    PipeGroupPipe,
    PipeRelationPipe, ]
})
export class PipesModule {
	
}

