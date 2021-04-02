import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
	let component: CatalogComponent;
	let fixture: ComponentFixture<CatalogComponent>;

	const projectServiceMock: Partial<ProjectService> = {
		getProjects: () => of([])
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CatalogComponent],
			imports: [RouterTestingModule],
			providers: [
				{
					provide: ProjectService,
					useValue: projectServiceMock
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CatalogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
