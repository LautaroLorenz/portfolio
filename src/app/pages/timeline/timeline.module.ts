import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';
import { MzdTimelineModule } from 'ngx-rend-timeline';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [TimelineComponent],
	imports: [
		CommonModule,
		TimelineRoutingModule,
		SharedModule,
		MzdTimelineModule
	]
})
export class TimelineModule {}
