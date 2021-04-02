import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Achievement } from 'src/app/models/timeline';

@Component({
	selector: 'app-achievement',
	templateUrl: './achievement.component.html',
	styleUrls: ['./achievement.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AchievementComponent {
	@Input() public achievement: Achievement | null = null;
}
