import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Project } from 'src/app/models/projects';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
	@Input() public project: Project | null = null;
}
