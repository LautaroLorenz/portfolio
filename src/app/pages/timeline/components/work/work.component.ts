import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Work } from 'src/app/models/timeline';

@Component({
	selector: 'app-work',
	templateUrl: './work.component.html',
	styleUrls: ['./work.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkComponent {
	@Input() public work: Work | null = null;
}
