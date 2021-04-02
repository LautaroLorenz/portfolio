import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { Components } from './components';

@NgModule({
	declarations: [Components],
	imports: [MaterialModule],
	exports: [MaterialModule, Components],
	providers: [],
	bootstrap: []
})
export class SharedModule {}
