import { NgModule } from '@angular/core';
import { GoodsListComponent } from './goods-list/goods-list';
import { RevaluateComponent } from './revaluate/revaluate';
@NgModule({
	declarations: [GoodsListComponent,
    RevaluateComponent],
	imports: [],
	exports: [GoodsListComponent,
    RevaluateComponent]
})
export class ComponentsModule {}
