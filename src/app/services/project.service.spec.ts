import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
	let service: ProjectService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule]
		});
		service = TestBed.inject(ProjectService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
