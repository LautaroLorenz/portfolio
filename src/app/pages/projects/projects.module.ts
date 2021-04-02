import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectComponent } from './components';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CatalogComponent } from './pages/catalog/catalog.component';

@NgModule({
	declarations: [
		ProjectsComponent,
		ProjectComponent,
		PortfolioComponent,
		CatalogComponent
	],
	imports: [CommonModule, ProjectsRoutingModule, SharedModule]
})
export class ProjectsModule {}
