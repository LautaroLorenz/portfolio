import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';
import { MzdTimelineModule } from 'ngx-rend-timeline';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkComponent, AchievementComponent } from './components';

@NgModule({
	declarations: [TimelineComponent, WorkComponent, AchievementComponent],
	imports: [
		CommonModule,
		TimelineRoutingModule,
		SharedModule,
		MzdTimelineModule
	]
})
export class TimelineModule {}
