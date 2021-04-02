import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/projects';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent {
	public projects$: Observable<Project[]>;

	constructor(
		private readonly router: Router,
		private readonly projectsSvc: ProjectService
	) {
		this.projects$ = this.projectsSvc.getProjects();
	}

	public open(project: Project): void {
		void this.router.navigate(['projects/'.concat(project.link)]);
	}
}
